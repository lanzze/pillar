<template>
  <q-table class="managunit content table-classic"
           :rows="list"
           :color="color"
           :columns="dimensions"
           :loading="loading"
           :selection="selective"
           :visible-columns="visibles"
           row-key="name"
           v-model:selected="selection"
           @virtual-scroll="onVirtualScroll"
           v-bind="natives.table">
    <template v-slot:body="{row,rowIndex}">
      <tr>
        <template v-for="(column,cid) in dimensions" :key="cid">
          <td :class="[classOf(row,column)]"
              :style="{width: column.width,color:colorOf(row,column,cid)}">
            <template v-if="column.render==='index'">
              {{indexOf(rowIndex)}}
            </template>
            <template v-else-if="column.render==='action'">
              <template v-for="(e,x) in actions">
                <q-btn :key="x"
                       :icon="e.image"
                       :label="e.label"
                       :title="e.title"
                       :color="e.color"
                       :size="e.size"
                       padding="xs"
                       fab
                       :disable="disableOf(row,e)"
                       v-bind="e.native"
                       @click.stop="onActionHandler(row,e)"
                       v-if="visibleOf(row,e)"></q-btn>
              </template>
            </template>
            <component :is="defineAsyncComponent(column.render.component)"
                       v-bind="{model:row,...column.render.attribute}"
                       @action="onActionHandler(row,$event)"
                       v-else-if="!!column.render"></component>
            <template v-else>{{valueOf(row, column, cid)}}</template>
          </td>
        </template>
      </tr>
    </template>
    <template v-slot:pagination v-if="!!pagination">
      <q-pagination :max="pagination.count||10"
                    direction-links
                    boundary-links
                    round
                    :model-value="pagination.page"
                    v-bind="natives.pagination"
                    @update:model-value="onPageUpdate"></q-pagination>
    </template>
  </q-table>
</template>
<script>
import {computed}             from "vue";
import {ref}                  from "vue";
import {reactive}             from "vue";
import {inject}               from "vue";
import {defineAsyncComponent} from "vue";
import {onMounted}            from "vue";
import {get}                  from "./explorer.tools";

const DefClass = {sequence: "content--sequence", action: "content--actions"};

export default {
  name: "ClassicTableContent",
  props: {
    color: String,
    natives: Object,
    actions: Array,
    handles: Object,
    dimensions: Array,
    pagination: Object,
    source: [Array, Function],
    selective: String
  },
  emits: ["query", "action"],
  setup(props, context) {
    const selection    = inject("selection", []),
          interceptors = inject("interceptors"),
          loading      = inject("loading", false),
          errored      = inject("errored", false);
    
    const source = props.source;
    const dimensions = props.dimensions ? props.dimensions : ref([]);
    const list = Array.isArray(source) ? source : reactive([]);
    const pagination = props.pagination;
    
    const visibles = computed(() => dimensions.map(e => e.name))
    
    const fetch = (args, store, context) => {
      if (source instanceof Function) {
        return source(args, store, context)
            .then(ret => {
              let rows = ret && "source" in ret ? ret.source : ret;
              let page = ret && "pagination" in ret ? ret.pagination : null;
              let dims = ret && "dimensions" in ret ? ret.dimensions : null;
              if (rows) list.splice(0, list.length, ...rows);
              if (page) Object.assign(pagination, page);
              if (dims) dimensions.value = dims;
            })
      }
    }
    
    const onVirtualScroll = () => {
    
    }
    
    if (source instanceof Function) interceptors.push(fetch);
    
    // context.emit("query");
  
    onMounted(()=>console.log("content amounted"));
    
    return {
      dimensions,
      visibles,
      selection,
      loading,
      errored,
      list,
      defineAsyncComponent,
      onVirtualScroll,
      onActionHandler: (row, action) => {
        if (typeof action === "string") {
          action = props.actions.find(e => e.id === action);
        }
        if (action != null) {
          context.emit("action", action, row)
        }
      },
      onTableEvent: (row, name) => {
        let handler = props.handles && props.handles[name];
        if (typeof handler === "string") {
          handler = props.actions.find(e => e.id === props.handles[name]);
        }
        if (handler != null) {
          context.emit("action", handler, row);
        }
      },
      onPageUpdate: page => context.emit("query", {page}),
      colorOf: (row, column) => get(column.color, row),
      valueOf: (row, column, cid) => {
        let value = column.field instanceof Function
            ? column.field(row)
            : Array.isArray(row) ? row[cid] : row[column.field];
        return value || column.default;
      },
      classOf: (row, column) => get(column.classes, row) || DefClass[column.render],
      indexOf: (idx) => {
        return pagination ? pagination.size * (pagination.page - 1) + idx + 1 : idx + 1;
      },
      disableOf: (row, action) => get(action.disable, row) === true,
      visibleOf: (row, action) => get(action.visible, row) !== false
    }
  }
}
</script>