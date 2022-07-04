<template>
  <q-table class="explorer__managunit__content-table"
           :rows="data"
           :columns="dimensions"
           :loading="loading"
           v-bind="attribute">
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
  props: {
    selections: Array,
    pagination: Object,
    loading: Boolean,
    error: Boolean,
    data: Array,
    
    attribute: Object,
    dimensions: Array,
    natives: Object,
    actions: Array
  },
  setup(props, context) {
    
    
    return {}
  }
}
</script>