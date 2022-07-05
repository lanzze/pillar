<template>
  <q-table class="explorer__managunit__content-table--classic"
           :rows="data"
           :color="color"
           :columns="dimensions"
           :loading="loading"
           v-model:selected="selections"
           @virtual-scroll="onVirtualScroll"
           v-bind="natives.table">
    <template v-slot:loading>
      <q-spinner-hourglass v-bind="natives.loading"></q-spinner-hourglass>
    </template>
    <template v-slot:body>
      <template v-for="(row,i) in data">
        <tr :key="i" @click="onTableEvent(row,'row:click')" @dblclick="onTableEvent(row,'row:dblclick')">
          <td v-if="sequence">{{numberOf(i)}}</td>
          <template v-for="(column,j) in dimensions">
            <td :key="j"
                :class="classOf(row,column)"
                :style="{width: column.width,color:colorOf(row,column,j)}">
              <component :is="column.render.component"
                         v-bind="{row,column}"
                         @action="onActionHandler"
                         v-if="column.render"></component>
              <template v-else>{{valueOf(row, column, j)}}</template>
            </td>
          </template>
          <td class="table--actions" v-if="!!actions">
            <template v-for="(e,i) in actions">
              <q-btn :key="i"
                     :icon="e.image"
                     :label="e.label"
                     :title="e.title"
                     v-bind="e.native"
                     @click="onActionHandler(e,row)"></q-btn>
            </template>
          </td>
        </tr>
      </template>
    </template>
    
    <template v-slot:pagination>
      <q-pagination :max="pagination.length"
                    direction-links
                    boundary-links
                    icon-first="skip_previous"
                    icon-last="skip_next"
                    icon-prev="fast_rewind"
                    icon-next="fast_forward"
                    :model-value="pagination.page"
                    v-bind="natives.pagination"
                    @update:model-value="pagination.page=$event"></q-pagination>
    </template>
  </q-table>
</template>
<script>
import {reactive} from "vue";

export default {
  name: "ClassicTableContent",
  props: {
    // from managunit
    selections: Array,
    pagination: Object,
    dimensions: Array,
    loading: Boolean,
    error: Boolean,
    data: Array,
    // from config
    color: String,
    natives: Object,
    actions: Array,
    handles: Object,
    sequence: Boolean
  },
  setup(props, context) {
    
    const get = (target, ...args) => target instanceof Function ? target(...args) : target;
    
    const onVirtualScroll = () => {
    
    }
    return {
      onVirtualScroll,
      onActionHandler: (action, row) => context.emit("action", action, row),
      onTableEvent: (row, name) => {
        let handler = props.handles && props.handles[name];
        if (typeof handler === "string") {
          handler = props.actions.find(e => e.id === props.handles[name]);
        }
        if (handler != null) {
          context.emit("action", handler, row);
        }
      },
      colorOf: (row, column) => get(column.color, row),
      valueOf: (row, column, cid) => {
        return Array.isArray(row) ? row[cid] : get(column.field, row) || column.default;
      },
      numberOf: (idx) => {
        return props.pagination ? props.pagination.size * (props.pagination.page - 1) + idx + 1 : idx + 1;
      },
      classOf: (row, column) => get(column.classes, row)
    }
  }
}
</script>