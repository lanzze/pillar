<template>
  <div :id="options.id" class="component manageunit flex flex-col flex-1 w-full h-full">
    <slot class="mt-5" name="search" :condition="condition" :query="doSearch" :reset="onConditionReset" v-if="!!options.search"></slot>
    <slot name="menu" v-if="menu">
      <div class="menu mt-5">
        <template v-for="(menu,i) in menu.items">
          <el-button :key="i"
                     :icon="menu.icon"
                     :type="menu.color"
                     size="small"
                     :disabled="isDisable(menu)"
                     @click="onAction(menu,menu.model)">
            {{menu.label}}
          </el-button>
        </template>
      </div>
    </slot>
    <slot name="content" v-if="content">
      <div class="content flex-1 mt-5" :class="contentClass">
        <table class="w-full common-table">
          <thead>
          <tr>
            <th class="check" v-if="content.selection">
              <el-checkbox :value="selections.length===source.length&&source.length>0"
                           :indeterminate="selections.length>0&&selections.length<source.length"
                           :disabled="source.length===0"
                           @change="onCheck($event,null)"></el-checkbox>
            </th>
            <th class="index" v-if="content.index">序号</th>
            <template v-for="(col,i) in content.dimensions">
              <th :key="i" :style="{width:col.width}">{{col.label}}</th>
            </template>
            <th :style="{width:content.action.width}" v-if="content.action">{{content.action.label||"操作"}}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(row,i) in source">
            <tr :key="i">
              <slot name="row" :row="row" :index="i" :dimensions="content.dimensions">
                <td class="text-center" v-if="content.selection">
                  <el-checkbox :value="selections.indexOf(row)>=0" @change="onCheck($event,row)"></el-checkbox>
                </td>
                <td class="text-center" v-if="content.index">{{(pagination.current - 1) * pagination.size + i + 1}}</td>
                <template v-for="(col,j) in content.dimensions">
                  <td :key="j" :class="classOf(row,col,j)">
                    <component :is="col.render.component" v-bind="{model:row[col.field],index:j,...col.render.attrs}" v-if="!!col.render"></component>
                    <template v-else>
                      {{row|cell(col,i)}}
                    </template>
                  </td>
                </template>
                <td class="actions" v-if="content.action">
                  <template v-for="(action,i) in content.action.items">
                    <a :key="i"
                       :title="action.title"
                       :class="action.color"
                       @click="onAction(action,row,i)"
                       v-if="isVisible(action,row)">
                      {{action.label}}
                    </a>
                  </template>
                </td>
              </slot>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </slot>
    <slot name="pagination" v-if="pagination">
      <div class="pagination flex items-center justify-end mt-5">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pagination.page"
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="onPageChange">
        </el-pagination>
      </div>
    </slot>
  </div>
</template>
<script>

export default {
  name: "Manageunit",
  props: {
    options: Object,
    contentClass: String,
  },
  data() {
    return {
      selections: [],
      condition: null,
      loading: false,
      source: [],
    }
  },
  filters: {
    cell(row, col, index) {
      let field = col.field, alias = col.alias;
      let value = field instanceof Function ? field(row, index) : row[field];
      return alias ? alias[value] : value;
    },
  },
  created() {
    this.onConditionReset();
    if (this.options.immediate) this.doSearch();
  },
  methods: {
    classOf(row, col, index) {
      let field = col.class, invoke = col.value || col.field;
      if (field == null || typeof field === "string") {
        return field;
      }
      return field[invoke instanceof Function ? invoke(row, index) : row[invoke]];
    },
    isDisable(menu) {
      return menu.disable != null ? menu.disable(this.selections) : false;
    },
    isVisible(menu, row) {
      return menu.visible != null ? menu.visible(row) : true
    },
    onPageChange(page) {
      this.doSearch(page);
    },
    onCheck(check, row) {
      if (row === null) {
        if (check) {
          this.selections = this.source.slice();
        } else {
          this.selections.splice(0, this.selections.length);
        }
      } else {
        let index = this.selections.indexOf(row);
        if (index < 0) {
          this.selections.push(row);
        } else {
          this.selections.splice(index, 1);
        }
      }
      this.$emit("update:selection", this.selections);
    },
    onConditionReset() {
      this.condition = typeof this.options.search === "object" ? this.options.search.condition : {};
    },
    doSearch(page = 1) {
      this.loading = true;
      this.pagination.current = page;
      this.options.content.source(this.condition, this.pagination).then(data => {
        this.source = data.source;
        Object.assign(this.pagination, data.pagination);
        this.$emit("update:source", this.source);
      }).finally(() => this.loading = false);
    },
    onAction(action, target) {
      /**
       *  If target is undefined, then use 'selections'.
       *  Some action will use this value, like delete selected items.
       */
      if (target === undefined) target = this.selections;

      /**
       * If action has modal property, that means this action will open a dialog and show target content.
       * So
       */
      if (action.modal) {
        const onCancel = () => {
          Promise.resolve().then(() => {
            if (action.cautious) {
              return this.$store.dispatch("window.once", {
                title: "确认操作：",
                modal: {contentClass: "notice text-yellow-500"},
                content: action.cautious,
              })
            }
          }).then(() => {
            this.$store.dispatch("window.hide", action.modal.id)
          })
        };
        const onSubmit = value => {
          Promise.resolve(value)
            .then(value => {
              if (action.update) {
                this.$store.dispatch("window.open", {id: action.modal.id, status: "el-icon-loading", submit: "提交中..."})
                return action.update(value);
              }
            })
            .then(() => {
              this.$store.dispatch("window.hide", action.modal.id);
              if (action.modal.notice) this.$message(action.modal.notice);
            })
            .then(() => {
              if (action.refresh === true) {
                return this.doSearch()
              }
              Object.assign(target, value);
            })
            .catch(() => this.$store.dispatch("window.open", {id: action.modal.id, status: null, submit: "确定"}))
        }

        return Promise.resolve(target)
          .then(value => action.source ? action.source(value) : value)
          .then(value => {
            this.$store.dispatch("window.open", Object.assign({}, action.modal, {
              onCancel, onSubmit,
              prevent: true,
              submit: "确定",
              attrs: Object.assign({value}, action.modal.attrs)
            }))
          });
      }

      /**
       * This meas the action will do some sample things.
       * Like delete, disable ...
       */
      Promise.resolve().then(() => {
        if (action.confirm) {
          return this.$store.dispatch("window.once", {
            title: action.header || "确认操作",
            modal: {contentClass: "notice text-yellow-500"},
            content: action.confirm
          })
        }
      }).then(() => action.conduct(target))
        .then(() => action.notice && this.$message(action.notice))
        .then(() => action.success && action.success(target))
        .then(() => action.refresh && this.doSearch());
    },
  },
  computed: {
    menu() {return this.options.menu},
    content() {return this.options.content},
    pagination() {return this.options.pagination || {}}
  }
}
</script>
