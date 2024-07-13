<script lang="ts" setup>
import {ref}       from "vue";
import {useRouter} from "vue-router";
//const-----------------------------------------------------------------------------------
const props  = defineProps({
   items: Array
});
const router = useRouter();
//variables-----------------------------------------------------------------------------------

//apis----------------------------------------------------------------------------------------

//handlers------------------------------------------------------------------------------------

function onItemClick(item: any) {
   router.replace(item.route);
}

//privates------------------------------------------------------------------------------------

//hooks---------------------------------------------------------------------------------------


</script>

<template>
   <div class="component tabbar">
      <q-tabs>
         <template v-for="(e,i) in items" :key="i">
            <q-route-tab :to="e.route" :label="e.label" replace></q-route-tab>
         </template>
      </q-tabs>
   </div>
</template>

<style lang="scss">
.component.tabbar {
   width: 100vw;
   height: 80px;
   position: fixed;
   left: 0;
   bottom: 0;
}
</style>
