<template>
  <div id="component:modal.modal" class="component modal" :class="mainClass" :style="mainStyle">
    <div ref="body" class="modal.body" :style="bodyStyle">
      <div class="modal.content" :class="contentClass" @mousedown.stop="down($event,'content')">
        <div class="modal.mover" @mousedown.stop="down($event,'mover')" v-if="hasMover">
          <slot name="mover"></slot>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import {clamp}                    from "./tools";
import {toBodyStyle, toMainStyle} from "./tools";
import Overlay                    from "./Overlay";

export default {
  name: "Modal",
  extends: Overlay,
  props: {
    /**
     * Set this modal can move or not.
     */
    movable: Boolean
  },
  data: function data() {
    return {
      moving: false,
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
    offset: {
      immediate: true,
      handler: function handler(value) {
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
      if (this.movable && (this.hasMover ? target === 'mover' : true)) {
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
      
      if (moved && this.moving && !this.maximum) {
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
    }
  },
  computed: {
    mainClass() {
      return {maximum: this.maximum, cover: this.cover};
    },
    mainStyle() {
      return toMainStyle(this.$props, this.$data);
    },
    bodyStyle() {
      return toBodyStyle(this.$props, this.$data);
    },
    hasMover() {
      return !!this.$slots.mover;
    }
  }
};
</script>