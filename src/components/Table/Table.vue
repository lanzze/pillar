<template>
  <div class="component table">
    <div class="table--container">
      <div class="table--wrapper">
        <table>
          <thead>
          <slot name="header" :dimensions="dimensions">
            <tr>
              <th class="th--index" v-if="selective!=null">
                <q-checkbox :model-value="all"
                            :indeterminate-value="null"
                            v-bind="natives?.select"
                            :disable="selective==='single'"
                            @update:model-value="onCheck($event,null,true)">
                </q-checkbox>
              </th>
              <template v-for="(column,i) in dimensions" :key="i">
                <th @click="onColumnClick($event,column)" :class="[{sortable:column.name in orders},column.headerClass]">
                  <span class="th--cell">
                    {{column.label}}
                  </span>
                  <q-icon class="th--order"
                          :class="classes[orders[column.name]]"
                          name="mdi-play"
                          v-if="column.name in orders">
                  </q-icon>
                </th>
              </template>
            </tr>
          </slot>
          </thead>
          <tbody>
          <slot name="body" :dimensions="dimensions" :source="source">
            <template v-for="(row,index) in source" :key="index">
              <tr @click="$emit('table:click','row:click',row,index)" @dblclick="$emit('table:click','row:dblclick',row,index)">
                <td class="table--select" v-if="selective!=null">
                  <q-checkbox :model-value="row[identity] in checks"
                              v-bind="natives?.select"
                              @update:model-value="onCheck($event,row)">
                  </q-checkbox>
                </td>
                <template v-for="(column,cid) in dimensions" :key="cid">
                  <td :class="[classOf(row,column)]"
                      :style="{width: column.width,color:colorOf(row,column,cid)}">
                    <template v-if="column.render==='index'">
                      {{indexOf(index)}}
                    </template>
                    <template v-else-if="column.render==='action'">
                      <template v-for="(e,x) in actions">
                        <q-btn :key="x"
                               :icon="e.image"
                               :label="e.label"
                               :title="e.title"
                               :color="e.color"
                               :size="e.size"
                               :flat="!!e.label"
                               :rounded="!!e.image"
                               :disable="disableOf(row,e)"
                               v-bind="e.native"
                               @click.stop="onActionHandler(row,e)"
                               v-if="visibleOf(row,e)"></q-btn>
                      </template>
                    </template>
                    <component :is="renders[column.name]"
                               v-bind="{model:row,...column.render.attribute}"
                               @action="onActionHandler"
                               v-else-if="!!column.render"></component>
                    <template v-else>{{valueOf(row, column, cid)}}</template>
                  </td>
                </template>
              </tr>
            </template>
          </slot>
          </tbody>
        </table>
      </div>
    </div>
    <div class="table--pagination">
      <slot name="pagination" :pagination="pagination" v-if="!!pagination">
        <q-pagination :max="pagination.count||10"
                      round
                      direction-links
                      boundary-links
                      :model-value="pagination.page"
                      @update:model-value="$emit('update:page',$event)">
        </q-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent}      from "vue";
import {computed}             from "vue";
import {reactive}             from "vue";
import {defineAsyncComponent} from "vue";
import {get}                  from "./tools.table";

const classes = {index: "table--index", action: "table--actions", [-1]: "dsc", [1]: "asc"};
export default defineComponent({
  name: "Table",
  props: {
    source: Array,
    actions: Array,
    handles: Object,
    visibles: Array,
    dimensions: Array,
    pagination: Object,
    selection: Array,
    selective: String,
    identity: String,
    natives: Object,
  },
  emits: ["action", "table:click", "update:page", "update:selection", "update:sort"],
  setup(props, context) {
    const checks = reactive({});
    const selection = props.selection || [];
    const pagination = props.pagination;
    const dimensions = computed(() => {
      if (!props.visibles?.length || !props.dimensions?.length) {
        return props.dimensions;
      }
      return props.dimensions.filter((e: any) => {
        return e.required || props.visibles.indexOf(e.name) > -1;
      })
    })
    const orders = reactive(<object>(props.dimensions?.reduce((accept: any, col: any) => {
      if (col.sort !== undefined && col.name != null) {
        accept[col.name] = col.order || 0;
      }
      return accept;
    }, {}) || {}));
    
    const renders = props.dimensions?.reduce((accept: any, col: any) => {
      if (col.render?.component instanceof Function && col.name != null) {
        accept[col.name] = defineAsyncComponent(col.render.component);
      }
      return accept;
    }, {})
    
    const all = computed(() => {
      if (!props.source?.length) return false;
      return props.source?.every(e => e[props.identity] in checks)
          ? true
          : Object.keys(checks).length ? null : false;
    });
    
    const onCheck = (checked: boolean, row: any, isAll?: boolean) => {
      if (checked) {
        if (isAll === true) {
          props.source?.reduce((p: any, v: any) => (checks[v[props.identity]] = true, p), checks);
          selection.splice(0, selection.length, ...props.source);
        } else {
          if (props.selective === "single") {
            Object.keys(checks).forEach(key => delete checks[key]);
          }
          checks[row[props.identity]] = true;
          selection.push(row);
        }
      } else {
        if (isAll === true) {
          Object.keys(checks).forEach(key => delete checks[key]);
          selection.splice(0);
        } else {
          delete checks[row[props.identity]];
          selection.splice(selection.indexOf(row), 1);
        }
      }
      context.emit("update:selection", selection);
    }
    
    const onColumnClick = (event: MouseEvent, column: any) => {
      let order = orders[column.name];
      if (event.ctrlKey !== true) {
        Object.keys(orders).forEach(key => orders[key] = 0);
      }
      if (order == null) return;
      else if (order === 0) order = 1;
      else if (order > 0) order = -1;
      else if (order < 0) order = 0;
      if (column.sort instanceof Function) {
        props.source?.sort((a, b) => column.sort(a, b, orders) * order);
      }
      context.emit("update:sort", column, orders, orders[column.name] = order);
    }
    
    const valueOf = (row, column, cid) => {
      let value = column.field instanceof Function
          ? column.field(row)
          : Array.isArray(row) ? row[cid] : row[column.field];
      return value || column.default;
    }
    
    const onActionHandler = (row, action) => context.emit("action", row, action);
    const colorOf = (row, column) => get(column.color, row);
    const classOf = (row, column) => get(column.classes, row) || classes[column.render];
    const indexOf = (idx) => pagination ? pagination.size * (pagination.page - 1) + idx + 1 : idx + 1;
    const disableOf = (row, action) => get(action.disable, row) === true;
    const visibleOf = (row, action) => get(action.visible, row) !== false;
    
    return {
      all,
      checks,
      orders,
      renders,
      classes,
      selection,
      dimensions,
      onActionHandler,
      onColumnClick,
      disableOf,
      visibleOf,
      colorOf,
      valueOf,
      classOf,
      indexOf,
      onCheck,
    };
  },
})
</script>