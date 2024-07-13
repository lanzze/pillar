<script setup lang="ts">

import Windows  from "../../../basic/src/components/Windows/Windows";
import useStore from "../store/index";

let store = useStore();




</script>


<template>
   <Windows :items="store.windows.state.items" :front="store.windows.state.front"></Windows>
   <router-view></router-view>
   <q-btn>Btn</q-btn>
</template>
