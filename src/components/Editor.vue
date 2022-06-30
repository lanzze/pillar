<template>
  <div>
    <button @click="onOpen">Open</button>
  </div>
</template>

<script>
export default {
  name: "Editor",
  methods: {
    onOpen() {
      this.$store.dispatch("window.open", {
        id: "ch",
        title: "Choose",
        content: () => import("./CH.vue"),
        attrs: {obj: {value: "Alice"}}
      });
    }
  }
}
</script>