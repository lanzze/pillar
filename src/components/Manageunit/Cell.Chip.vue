<template>
  <div class="cell.chips">
    <template v-for="(e,i) in model">
      <span class="chip" :class="classes" :key="i">{{getter(e)}}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "Cell.Chip",
  props: {
    model: [Object, Array],
    label: [String, Function],
    index: Number,
    classes: String,
  },
  methods: {
    getter(item) {
      return this.label instanceof Function ? this.label(item, this.index) : this.label ? item[this.label] : item;
    }
  }
}
</script>
