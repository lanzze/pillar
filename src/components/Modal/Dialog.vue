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
          <q-btn :icon="cancel.image"
                 :color="cancel.color"
                 :label="cancel.label"
                 v-bind="cancel.native"
                 @click.stop="onCancel"
                 v-if="!!cancel">
          </q-btn>
          <q-btn :icon="submit.image"
                 :color="submit.color"
                 :label="submit.label"
                 :loading="progress"
                 v-bind="submit.native"
                 @click.stop="onSubmit" v-if="!!submit">
            <template v-slot:loading>
              <component :is="progressor.component" v-bind="progressor.attribute"></component>
            </template>
          </q-btn>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import {reactive} from "vue";
import Overlay    from "./Overlay";
import options    from "../component.options";

let zIndex = 333333;
export default {
  name: "Dialog",
  extends: Overlay,
  props: {
    zIndex: {
      type: Number,
      default: () => zIndex++
    },
    icon: String,
    title: String,
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
    closer: {
      type: Boolean,
      default: true
    },
    cancel: [Boolean, Object],
    submit: [Boolean, Object],
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
    progress: Boolean
  },
  setup(props, context) {
    return {
      submit: props.submit === false ? false : Object.assign(reactive({
        label: options["modal.submit.label"],
        color: options["modal.submit.color"],
        image: options["modal.submit.image"],
      }), props.submit),
      
      cancel: props.submit === false ? false : Object.assign(reactive({
        label: options["modal.cancel.label"],
        color: options["modal.cancel.color"],
        image: options["modal.cancel.image"],
      }), props.cancel),
      
      progressor: {
        component: options["modal.progress"],
        attribute: options["modal.progress.native"],
      },
      
      onMouseDown(event, target) {
        if (props.movable === target) {
          this.down(event);
        }
      },
      onCancel: () => context.$emit("cancel"),
      onSubmit: () => context.$emit("submit")
    }
  }
}
</script>