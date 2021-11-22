<template>
  <div class="manageunit.chooser flex-1">
    <el-select class="w-full"
               v-model="model.value"
               :clearable="clearable"
               :multiple="multiple"
               :remote="!!fetch"
               :filterable="!!fetch"
               :remote-method="fetch"
               @change="onChange">
      <template v-for="(e,i) in array">
        <el-option :value="getter(value,e)" :label="getter(label,e)" :key="i"></el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "Chooser",
  props: {
    items: [],
    multiple: Boolean,
    clearable: Boolean,
    fetch: Function,
    label: [Function, String],
    value: [Function, String]
  },
  data() {
    return {
      array: [],
      model: {value: null}
    }
  },
  created() {
    if (this.fetch != null) this.load();
    this.$emit("input", this.model);
    this.$emit("update:validation", false);
  },
  methods: {
    getter(field, item) {
      return typeof field === "string" ? item[field] : field(item);
    },
    load(keyword) {
      this.fetch(keyword).then(data => this.array = data || []);
    },
    onChange(item) {
      this.$emit("update:validation", !!item);
    }
  }
}
</script>
