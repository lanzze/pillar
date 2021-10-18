<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <!--<router-view></router-view>-->
  <div id="test">
    <Dialog :size="[500,400]" position="fixed" cover movable="body" icon="title">
      <!--<template v-slot:mover>-->
      <!--  <div style="background: red;width: 20px;height: 10px"></div>-->
      <!--</template>-->
      <div style="flex:1">
        
        This is content.
      </div>
    
    </Dialog>
  </div>
</template>

<script setup>
import Dialog from "./components/Modal/Dialog.vue";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Modal  from "./components/Modal/Modal.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}

#test {
  position: absolute;
  width: 70vw;
  height: 70vh;
  top: 100px;
  left: 200px;
  border: 1px solid green;
}

</style>
