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
      this.$store.dispatch("window.once", {
        title: "Choose",
        content: () => import("./CH.vue"),
        attrs: {value: "Alice"}
      }).then(() => alert("You click the submit"))
          .catch(() => alert("You click the cancel"));
    }
  }
}
</script>