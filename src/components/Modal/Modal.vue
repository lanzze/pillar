<template>
  <div class="component modal" :class="mainClass" :style="mainStyle">
    <div ref="body" class="modal--body" :style="bodyStyle">
      <div class="modal--content" :class="contentClass" @mousedown.stop="onMouseDown($event,'content')">
        <div class="modal--mover" @mousedown.stop="onMouseDown($event,'mover')" v-if="hasMover">
          <slot name="mover" :switchMaximum="switchMaximum"></slot>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import {computed} from "vue";
import Overlay    from "./Overlay";

export default {
  name: "Modal",
  extends: Overlay,
  setup(props, context) {
    const hasMover = computed(() => !!context.slots.mover)
    return {
      hasMover,
      onMouseDown(event, target) {
        if (props.movable && (hasMover ? target === 'mover' : true)) {
          this.down(event);
        }
      }
    }
  }
};
</script>