<template>
  <q-table class="managunit content table--classic"
           :rows="data"
           :color="color"
           :columns="dimensions"
           :loading="loading"
           v-model:selected="selection"
           @virtual-scroll="onVirtualScroll"
           v-bind="natives.table">
    <template v-slot:loading>
      <q-spinner-hourglass v-bind="natives.loading"></q-spinner-hourglass>
    </template>
    <template v-slot:body>
      <template v-for="(row,i) in data" :key="i">
        <tr @click="onTableEvent(row,'row:click')" @dblclick="onTableEvent(row,'row:dblclick')">
          <td v-if="sequence">{{numberOf(i)}}</td>
          <template v-for="(column,j) in dimensions" :key="j">
            <td :class="classOf(row,column)"
                :style="{width: column.width,color:colorOf(row,column,j)}">
              <component :is="defineAsyncComponent(column.render.component)"
                         v-bind="{model:row,...column.render.attribute}"
                         @action="onActionHandler(row,$event)"
                         v-if="!!column.render"></component>
              <template v-else>{{valueOf(row, column, j)}}</template>
            </td>
          </template>
          <td class="content--actions" v-if="!!actions">
            <template v-for="(e,i) in actions">
              <q-btn :key="i"
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
          </td>
        </tr>
      </template>
    </template>
    
    <template v-slot:no-data>
      <div class="content--nodata">
        {{nodata}}
      </div>
    </template>
    
    <template v-slot:pagination v-if="!!pagination">
      <q-pagination :max="pagination.length||10"
                    direction-links
                    boundary-links
                    icon-first="skip_previous"
                    icon-last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward"
                    :model-value="pagination.page"
                    v-bind="natives.pagination"
                    @update:model-value="onPageUpdate"></q-pagination>
    </template>
  </q-table>
</template>
<script>
import {isRef}                from "vue";
import {inject}               from "vue";
import {defineAsyncComponent} from "vue";
import {get}                  from "./explorer.tools";

export default {
  name: "ClassicTableContent",
  props: {
    color: String,
    natives: Object,
    actions: Array,
    handles: Object,
    sequence: Boolean,
    dimensions: Array,
    nodata: String
  },
  emits: ["query", "action"],
  setup(props, context) {
    const pagination = inject("pagination", null),
          selection  = inject("selection", []),
          loading    = inject("loading", false),
          errored    = inject("errored", false),
          data       = inject("data", []);
    
    const onVirtualScroll = () => {
    
    }
    return {
      pagination,
      selection,
      loading,
      errored,
      data,
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
      onPageUpdate: page => context.emit("query", page),
      colorOf: (row, column) => get(column.color, row),
      valueOf: (row, column, cid) => {
        let value = column.field instanceof Function
            ? column.field(row)
            : Array.isArray(row) ? row[cid] : row[column.field];
        return value || column.default;
      },
      classOf: (row, column) => get(column.classes, row),
      numberOf: (idx) => {
        return pagination ? pagination.size * (pagination.page - 1) + idx + 1 : idx + 1;
      },
      disableOf: (row, action) => get(action.disable, row) === true,
      visibleOf: (row, action) => get(action.visible, row) !== false
    }
  }
}
</script>