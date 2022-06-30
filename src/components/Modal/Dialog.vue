<template>
  <div class="component modal dialog" :class="mainClass" :style="mainStyle">
    <div ref="body" class="modal.body" :style="bodyStyle" @mousedown.stop="onMouseDown($event,'body')">
      <div class="modal.header" @mousedown.stop="onMouseDown($event,'header')" v-if="!!header">
        <slot name="header">
          <div class="modal.header.icon" v-if="!!icon">
            <i class="icon" :class="icon"></i>
          </div>
          <div class="modal.header.title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="modal.header.control" v-if="!!maximizer||!!closer">
            <button @click="switchMaximum" v-if="!!maximizer">
              <i :class="options['modal.icon.maximum']"></i>
            </button>
            <button @click.stop="onCancel" v-if="!!closer">
              <i :class="options['modal.icon.closer']"></i>
            </button>
          </div>
        </slot>
      </div>
      <div class="modal.content" :class="contentClass">
        <slot></slot>
      </div>
      <div class="modal.footer" v-if="!!footer">
        <slot name="footer">
          <button @click.stop="onCancel" v-if="!!cancel">
            <i :class="options['modal.icon.cancel']"></i>
            <span>{{$t(cancel)}}</span>
          </button>
          <button @click.stop="onSubmit" v-if="!!submit">
            <i :class="options['modal.icon.submit']"></i>
            <span>{{$t(submit)}}</span>
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import Overlay from "./Overlay";

let zIndex = 999999999;
export default {
  name: "Dialog",
  extends: Overlay,
  props: {
    zIndex: {
      type: Number,
      default: () => zIndex++
    },
    /**
     * The title icon.
     */
    icon: String,
    title: String,
    
    /**
     * Set this dialog has close button or not, set to string change the default icon.
     */
    closer: {
      type: Boolean,
      default: true
    },
    maximizer: Boolean,
    /**
     * Set dialog movable, the value specify move place.
     * Passable value is:
     * <li>header: Move by drag header.</li>
     * <li>content: Move with drag any where in dialog.</li>
     * <li>false: Disable move.</li>
     */
    movable: {
      type: [Boolean, String],
      default: "header",
      validator(value) {
        return value === false || value === "header" || value === "body";
      }
    },
    cancel: {
      type: [Boolean, String],
      default: "modal.cancel"
    },
    submit: {
      type: [Boolean, String],
      default: "modal.submit"
    },
    /**
     * Set this dialog has header or not.
     */
    header: {
      type: Boolean,
      default: true
    },
    /**
     * Set this dialog has footer or not.
     */
    footer: {
      type: Boolean,
      default: true
    },
    
    validation: Boolean,
  },
  methods: {
    onMouseDown(event, target) {
      if (this.movable === target) {
        this.down(event);
      }
    },
    onCancel() {
      this.$emit("cancel");
    },
    onSubmit() {
      this.$emit("submit");
    },
  }
};
</script>