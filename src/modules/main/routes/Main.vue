<template>
  <div id="module:main.main">
    Welcome : {{name}}, This is index.
  </div>
</template>

<script>
export default {
  name: "Main",
  props: ["name"]
}
</script>