<script lang="ts" setup>

import Tabbar      from "@/components/Tabbar.vue";
import Navigation  from "@/components/Tabbar.vue";
import items       from "@/config/tabbar";
import {useRouter} from "vue-router";

const router = useRouter();


function onTo() {
   router.push("/details")
}

</script>

<template>
   <div class="index overflow-y-auto">
      <router-view></router-view>
      <q-btn @click="onTo">TO</q-btn>
      <Tabbar :items="items"></Tabbar>
   </div>
</template>

<style lang="scss">

.q-tab {
   padding: 0 !important;
}

.q-tab__content {
   padding: 0 !important;
}

.q-hoverable:hover > .q-focus-helper {
   display: none;
}
</style>
