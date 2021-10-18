<template>
  <div id="component:modal.dialog" class="component modal dialog" :class="mainClass" :style="mainStyle">
    <div ref="body" class="modal.body" :style="bodyStyle" @mousedown.stop="down($event,'body')">
      <div class="modal.header" @mousedown="down($event,'header')" v-if="!!header">
        <slot name="header">
          <div class="modal.header.icon" v-if="!!normalIcon">
            <i class="icon" :class="normalIcon.content"></i>
          </div>
          <div class="modal.header.title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="modal.header.control" v-if="!!maximizer||!!closer">
            <i class="icon" :class="normalMaximizer.content" @click.stop="switchMaximum" v-if="!!maximizer"></i>
            <i class="icon" :class="normalCloser.content" @click.stop="onCancel" v-if="!!closer"></i>
          </div>
        </slot>
      </div>
      <div class="modal.content" :class="contentClass">
        <slot :validation.sync="validation"></slot>
      </div>
      <div class="modal.footer" v-if="!!footer">
        <slot name="footer">
          <button @click.stop="onCancel"
                  :class="[normalCancel.color,normalCancel.sizes]"
                  v-if="!!cancel">{{normalCancel.label}}
          </button>
          <button :disabled="!validation"
                  @click.stop="onSubmit"
                  v-if="!!submit">{{normalSubmit.label}}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import Overlay                    from "./Overlay";
import {clamp}                    from "./tools";
import {toBodyStyle, toMainStyle} from "./tools";

let zIndex = 999999999;
export default {
  name: "Dialog",
  extends: Overlay,
  props: {
    /**
     * The title icon.
     */
    icon: String,
    title: String,
    drag: false,
    /**
     * Set this dialog has close button or not, set to string change the default icon.
     */
    closer: {
      type: [Boolean, Object],
      default: true
    },
    zIndex: {
      type: Number,
      default: () => zIndex++
    },
    maximizer: {
      type: [Boolean, Object],
      default: false
    },
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
      type: [Boolean, Object],
      default: true
    },
    submit: {
      type: [Boolean, Object],
      default: true
    },
    /**
     * A disabled flag for confirm button, this is use for form valid.
     */
    validator: Function,
    /**
     * If true, the dialog will close when confirm button clicked.
     */
    closeOnSubmit: {
      type: Boolean,
      default: true
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
    }
  },
  data() {
    return {
      validation: false,
      isMaximum: null,
      locator: null,
      sign: {L: null, T: null, X: null, Y: null}
    };
  },
  beforeDestroy() {
    if (this.movable) {
      document.removeEventListener("mousemove", this.move);
      document.removeEventListener("mouseup", this.over);
    }
  },
  created() {
    if (this.movable) {
      document.addEventListener("mousemove", this.move);
      document.addEventListener("mouseup", this.over);
    }
  },
  watch: {
    maximum: {
      immediate: true,
      handler(value) {
        this.isMaximum = value;
      }
    },
    offset: {
      immediate: true,
      handler(value) {
        if (value !== this.locator) {
          this.locator = value;
        }
        
        if (this.locator == null) {
          this.locator = {top: null, left: null};
        }
      }
    }
  },
  methods: {
    over() {
      this.moving = false;
    },
    down(event, target) {
      if (this.movable === target) {
        let element = this.cover ? this.$refs.body : this.$el;
        this.sign.L = element.offsetLeft;
        this.sign.T = element.offsetTop;
        this.sign.X = event.x;
        this.sign.Y = event.y;
        this.moving = true;
      }
    },
    move(event) {
      let moved = this.sign.X !== event.x || this.sign.Y !== event.y;
      if (this.drag) return;
      
      if (moved && this.moving && !this.isMaximum) {
        event.preventDefault();
        delete this.locator.right;
        delete this.locator.bottom;
        
        if (this.extent) {
          let ex = this.extent;
          let dx = event.x - this.sign.X;
          let dy = event.y - this.sign.Y;
          let br = this.$refs.body.getBoundingClientRect();
          let el = ex.left != null ? ex.left : -Number.MAX_VALUE;
          let et = ex.top != null ? ex.top : -Number.MAX_VALUE;
          let mr = ex.right != null ? window.innerWidth - ex.right - br.width : Number.MAX_VALUE;
          let mb = ex.bottom != null ? window.innerHeight - ex.bottom - br.height : Number.MAX_VALUE;
          this.locator.left = clamp(this.sign.L + dx, el, mr);
          this.locator.top = clamp(this.sign.T + dy, et, mb);
        } else {
          let Δx = event.x - this.sign.X;
          let Δy = event.y - this.sign.Y;
          
          this.locator.left = this.sign.L + Δx;
          this.locator.top = this.sign.T + Δy;
        }
        this.$emit("update:offset", this.locator);
      }
    },
    switchMaximum() {
      this.moving = false;
      this.$emit("update:maximum", this.isMaximum = !this.isMaximum);
    },
    onCancel() {
      this.$emit("cancel");
    },
    onSubmit() {
      if (this.validator != null) {
        return this.validator().then(valid => {
          if (valid) {
            this.$emit("submit");
            if (this.closeOnSubmit) this.$emit("cancel");
          }
        });
      }
      this.$emit("submit");
      if (this.closeOnSubmit) this.$emit("cancel");
    },
  },
  computed: {
    normalCloser() {
      return this.closer && Object.assign({color: "white", icon: "mdi-close", title: "关闭"}, this.closer);
    },
    normalSubmit() {
      return this.submit && Object.assign({color: "primary", label: "确定"}, this.submit);
    },
    normalCancel() {
      return this.cancel && Object.assign({color: "warning", label: "关闭"}, this.cancel);
    },
    normalIcon() {
      if (this.icon == null) return null;
      return Object.assign({color: "white"}, typeof this.icon === "string" ? {content: this.icon} : this.icon);
    },
    normalMaximizer() {
      return this.maximizer && Object.assign({
        color: "white",
        title: ["最大化", "还原"],
        icon: ["mdi-window-maximize", "mdi-window-restore"]
      }, this.maximizer);
    },
    mainClass() {
      return {maximum: this.isMaximum, cover: this.cover, resizeable: this.resizeable};
    },
    mainStyle() {
      return toMainStyle(this.$props, this.$data);
    },
    bodyStyle() {
      return toBodyStyle(this.$props, this.$data);
    }
  }
};
</script>