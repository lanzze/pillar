<template>

</template>

<script>
export default {
  name: "Editor",
  props: {
    /**
     * The dialog open mode. Only support 'view' 'edit' 'new'.
     * By default, is 'view'.
     */
    mode: {
      type: String,
      default: "view",
      validator: v => ["view", "edit", "new"].indexOf(v) > -1
    },
  },
  data() {
    return {dynamicSubmit: null}
  },
  watch: {
    submit: {
      immediate: true,
      handler(value) {
        this.dynamicSubmit = value;
      }
    }
  },
}
</script>