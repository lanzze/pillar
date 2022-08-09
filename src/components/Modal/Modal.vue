<template>
  <div class="component modal" :class="mainClass" :style="mainStyle">
    <div ref="body" class="modal--body" :style="bodyStyle">
      <div class="modal--content" :class="contentClass" @mousedown.stop="onMouseDown($event,'content')">
        <div class="modal--mover" @mousedown.stop="onMouseDown($event,'mover')" v-if="mover">
          <slot name="mover" :switchMaximum="onSwitch"></slot>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed} from "vue";
import Overlay    from "./Overlay";

export default {
  name: "Modal",
  props: {...Overlay.props},
  emits: Overlay.emits,
  setup(props, context) {
    const overlay = Overlay.setup(props, context);
    const mover = computed(() => !!context.slots.mover)
    const onMouseDown = (event: MouseEvent, target: String) => {
      if (props.movable && (mover ? target === 'mover' : true)) {
        overlay.onMouseDown(event);
      }
    }
    return {...overlay, mover, onMouseDown}
  },
};
</script>