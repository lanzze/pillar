import {ref}                from "vue";
import {getCurrentInstance} from "vue";
import {onBeforeUnmount}    from "vue";
import {reactive}           from "vue";
import {watch}              from "vue";
import {clamp}              from "./modal.tools";
import {toBodyStyle}        from "./modal.tools";
import {toMainStyle}        from "./modal.tools";

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
      default: 9,
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
     * Specify whether enable the modal can move.
     */
    movable: Boolean,

    /**
     * The position css property.
     */
    position: {
      type: String,
      default: "fixed",
    },

    /**
     * Set dialog can resize or not. If false, dialog cannot resize the window(include maximum).
     */
    resizeable: Boolean,

    /**
     * The extent object for limit the dialog position.
     * The extent maybe has value like:
     * * top: Padding top;
     * * right: Padding right;
     * * bottom: Padding bottom;
     * * left: Padding left;
     *
     * Each value can set to negative or null. The extent can be null.
     */
    extent: {
      type: Object,
      default: () => ({top: 0}),
    },

    /**
     * Add class to inner content element.
     */
    contentClass: String,
  },
  emits: ["update:offset", "update:maximum"],
  setup(props, context) {
    const that    = getCurrentInstance() as any,
          moving  = ref(false),
          maximum = ref(props.maximum || false),
          locator = reactive({top: null, bottom: null, left: null, right: null}),
          sign    = reactive({x: undefined, y: undefined, l: undefined, t: undefined});

    const data = {locator, maximum};

    watch(props.maximum, v => maximum.value = v);
    watch(props.offset, v => v && Object.assign(locator, v), {immediate: true});

    const onMouseOver = () => moving.value = false;
    const onMouseDown = (event: MouseEvent) => {
      let element = props.modally ? that.refs.body : that.ctx.$el;
      let bounder = element.getBoundingClientRect();
      sign.l = bounder.left;
      sign.t = bounder.top;
      sign.x = event.x;
      sign.y = event.y;
      moving.value = true;
    };
    const onMouseMove = (event: MouseEvent) => {
      let moved = sign.x !== event.x || sign.y !== event.y;

      if (moved && moving.value && !maximum.value) {
        event.preventDefault();
        delete locator.right;
        delete locator.bottom;

        if (props.extent) {
          let ex = props.extent;
          let dx = event.x - sign.x;
          let dy = event.y - sign.y;
          // @ts-ignore
          let br = that.refs.body.getBoundingClientRect();
          let el = ex.left != null ? ex.left : -Number.MAX_VALUE;
          let et = ex.top != null ? ex.top : -Number.MAX_VALUE;
          let mr = ex.right != null ? window.innerWidth - ex.right - br.width : Number.MAX_VALUE;
          let mb = ex.bottom != null ? window.innerHeight - ex.bottom - br.height : Number.MAX_VALUE;
          locator.left = clamp(sign.l + dx, el, mr);
          locator.top = clamp(sign.t + dy, et, mb);
        } else {
          let Δx = event.x - sign.x;
          let Δy = event.y - sign.y;

          locator.left = sign.l + Δx;
          locator.top = sign.t + Δy;
        }
        context.emit("update:offset", locator);
      }
    };
    const onSwitch = () => {
      moving.value = false;
      context.emit("update:maximum", maximum.value = !maximum.value);
    }

    const provide = {
      moving, locator, maximum, sign,
      onMouseOver, onMouseDown, onMouseMove, onSwitch,
      mainClass: {maximum: maximum.value, modally: props.modally},
      mainStyle: toMainStyle(props, data),
      bodyStyle: toBodyStyle(props, data),
    };

    if (props.movable) {
      document.addEventListener("mousemove", provide.onMouseMove);
      document.addEventListener("mouseup", provide.onMouseOver);
    }

    onBeforeUnmount(() => {
      if (props.movable) {
        document.removeEventListener("mousemove", provide.onMouseMove);
        document.removeEventListener("mouseup", provide.onMouseOver);
      }
    });
    return provide;
  },
};