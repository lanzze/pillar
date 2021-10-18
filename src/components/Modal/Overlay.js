/**
 * The common props define for {@link Modal} and {@link Dialog}.
 *
 * @author    Aslan
 * @version   1.0
 */
export default {
  props: {
    /**
     * The visible of modal，
     */
    value: Boolean,
    zIndex: {
      type: Number,
      default: 9
    },
    size: Array,

    /**
     * As {top,left,right,bottom}.
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
     * Set this is modal has mask or not.
     */
    cover: Boolean,
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
     * Each value can set to negative or null.
     */
    extent: {
      type: Object,
      default: function _default() {
        return {
          top: 0
        };
      }
    },

    /**
     * Add class to inner content element.
     */
    contentClass: String
  }
};