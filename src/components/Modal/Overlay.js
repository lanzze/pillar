import {clamp}       from "./tools";
import {toBodyStyle} from "./tools";
import {toMainStyle} from "./tools";
import options       from "../component.options";

/**
 * The common props define for {@link Modal} and {@link Dialog}.
 *
 * @author    Aslan
 * @version   1.0
 */
export default {
  props: {
    zIndex: {
      type: Number,
      default: 9
    },
    sizes: Array,

    /**
     * The open offset object like {top,left,right,bottom}.
     */
    offset: Object,

    /**
     * Overflow for inner content.
     */
    overflow: String,

    /**
     * Set this modal to maximum or not.
     */
    maximum: Boolean,

    /**
     * Specify whether enable the modal mask.
     */
    modally: Boolean,

    /**
     * Specify whether enable the modal can be move.
     */
    movable: Boolean,

    /**
     * The position css property.
     */
    position: {
      type: String,
      default: "fixed"
    },

    /**
     * Set dialog can resize or not. If false, dialog cannot resize the window(include maximum).
     */
    resizeable: {
      type: Boolean,
      default: false
    },

    /**
     * The extent object for limit the dialog position.
     * The extent may has value like:
     * top: Padding top;
     * right: Padding right;
     * bottom: Padding bottom;
     * left: Padding left;
     *
     * Each value can set to negative or null. The extent can be null.
     */
    extent: {
      type: Object,
      default: () => ({top: 0})
    },

    /**
     * Add class to inner content element.
     */
    contentClass: String
  },
  data() {
    return {
      options,
      moving: false,
      locator: null,
      isMaximum: false,
      sign: {L: null, T: null, X: null, Y: null}
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
  methods: {
    over() {
      this.moving = false;
    },
    down(event) {
      let element = this.modally ? this.$refs.body : this.$el;
      let bounder = element.getBoundingClientRect();
      this.sign.L = bounder.left;
      this.sign.T = bounder.top;
      this.sign.X = event.x;
      this.sign.Y = event.y;
      this.moving = true;
    },
    move(event) {
      let moved = this.sign.X !== event.x || this.sign.Y !== event.y;

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
  },
  computed: {
    mainClass() {
      return {maximum: this.isMaximum, modally: this.modally};
    },
    mainStyle() {
      return toMainStyle(this.$props, this.$data);
    },
    bodyStyle() {
      return toBodyStyle(this.$props, this.$data);
    },
  }
};