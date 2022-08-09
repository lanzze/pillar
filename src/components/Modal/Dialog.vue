<template>
  <div class="component modal dialog" :class="mainClass" :style="mainStyle">
    <div ref="body" class="modal--body" :style="bodyStyle" @mousedown.stop="onMouseDown($event,'body')">
      <div class="modal--header" @mousedown.stop="onMouseDown($event,'header')" v-if="!!header">
        <slot name="header">
          <div class="header--icon" v-if="!!icon">
            <i class="icon" :class="icon"></i>
          </div>
          <div class="header--title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="header--control" v-if="!!switcher||!!closer">
            <q-btn @click.stop="onSwitch"
                   :icon="switcher[maximum].image"
                   :color="switcher[maximum].color"
                   unelevated dense v-if="!!switcher"></q-btn>
            <q-btn @click.stop="onCancel"
                   :icon="closer.image"
                   :color="closer.color"
                   unelevated dense v-if="!!closer"></q-btn>
          </div>
        </slot>
      </div>
      <div class="modal--content" :class="contentClass">
        <slot></slot>
      </div>
      <div class="modal--footer" v-if="!!footer">
        <slot name="footer">
          <q-btn :icon="cancel.image"
                 :color="cancel.color"
                 :label="cancel.label"
                 v-bind="cancel.native"
                 @click.stop="onCancel"
                 v-if="!!cancel">
          </q-btn>
          <q-btn :icon="progress?undefined:submit.image"
                 :color="submit.color"
                 :label="submit.label"
                 :loading="progress"
                 v-bind="submit.native"
                 :disable="!validation || progress"
                 @click.stop="onSubmit" v-if="!!submit">
            <template v-slot:loading>
              <component :is="progresser.component"
                         :color="submit.color"
                         :name="submit.image"
                         v-bind="progresser.attribute"></component>
              {{submit.label}}
            </template>
          </q-btn>
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed} from "vue";
import options    from "../options";
import Overlay    from "./Overlay";

let zIndex = 333333;
export default {
  name: "Dialog",
  props: {
    ...Overlay.props,
    zIndex: {
      type: Number,
      default: () => zIndex++,
    },
    icon: String,
    title: String,
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
      },
    },
    maximizer: {
      type: Boolean,
      default: true,
    },
    closer: {
      type: Boolean,
      default: true,
    },
    cancel: [Boolean, Object],
    submit: [Boolean, Object],
    /**
     * Set this dialog has header or not.
     */
    header: {
      type: Boolean,
      default: true,
    },
    /**
     * Set this dialog has footer or not.
     */
    footer: {
      type: Boolean,
      default: true,
    },
    validation: Boolean,
    progress: Boolean,
  },
  emits: ["submit", "cancel", ...Overlay.emits],
  setup(props, context) {
    const overlay = Overlay.setup(props, context);
    const switcher = props.maximizer === false ? false : {
      "true": {
        image: options["modal.maximum.image"],
        color: options["modal.maximum.color"],
      },
      "false": {
        image: options["modal.minimum.image"],
        color: options["modal.minimum.color"],
      },
    };
    const closer = props.closer === false ? false : {
      image: options["modal.closer.image"],
      color: options["modal.closer.color"],
    };
    const submit = computed(() => {
      return props.submit === false ? false : {
        label: options["modal.submit.label"],
        color: options["modal.submit.color"],
        image: options["modal.submit.image"],
        ...props.submit,
      }
    });
    const cancel = computed(() => {
      return props.cancel === false ? false : {
        label: options["modal.cancel.label"],
        color: options["modal.cancel.color"],
        image: options["modal.cancel.image"],
        ...props.cancel,
      }
    });
    const progresser = {
      component: options["modal.progress"],
      attribute: options["modal.progress.native"],
    };
    const onMouseDown = (event, target) => {
      if (props.movable === target) {
        overlay.onMouseDown(event);
      }
    };
    const onCancel = () => context.emit("cancel");
    const onSubmit = () => context.emit("submit");
    
    return {...overlay, switcher, closer, submit, cancel, progresser, onMouseDown, onSubmit, onCancel}
  },
}
</script>