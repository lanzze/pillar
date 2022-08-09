import {isRef} from "vue";

function ensure(value) {
  return value == null ? null : isNaN(value) ? value : `${value}px`;
}

function isp(value) {
  return typeof value === "string" && (value.match(/^.+(%|vh|vw)$/));
}

function doLocator(offset, sizes, locator, offsetable, sizeable) {
  let siz = sizes && sizes.map(function (v) {
    return v == null || isNaN(v) ? v : `${v}px`;
  });
  let top = offsetable && ensure(locator.top != null ? locator.top : offset && offset.top);
  let lft = offsetable && ensure(locator.left != null ? locator.left : offset && offset.left);
  let rgt = offsetable && ensure(offset && offset.right);
  let bom = offsetable && ensure(offset && offset.bottom);
  let wid = siz && siz[0], hei = siz && siz[1];
  let transformX, transformY, transform;
  if (!top && !bom && offsetable) {
    top = (siz && siz[1] != null) ? `calc(50% - ${siz[1]}/2)` : "50%";
    transformY = (siz && siz[1] != null) ? undefined : "translateY(-50%)";
  }

  if (!lft && !rgt && offsetable) {
    lft = (siz && siz[0] != null) ? `calc(50% - ${siz[0]}/2)` : "50%";
    transformX = (siz && siz[0] != null) ? undefined : "translateX(-50%)";
  }

  if (transformX || transformY) {
    transform = `${transformX || ""} ${transformY || ""}`;
  }

  return {top: top, left: lft, right: rgt, bottom: bom, width: sizeable && wid, height: sizeable && hei, transform};
}

export function toMainStyle(props, data) {
  if (props.modally) {
    return {position: props.position, zIndex: props.zIndex};
  }

  let maximum = isRef(data.maximum) ? data.maximum.value : data.maximum;
  let locator = doLocator(props.offset, props.sizes, data.locator, !maximum, false);

  if (props.modally === false) {
    if (props.sizes && isp(props.sizes[0])) {
      locator.width = props.sizes[0];
    }

    if (props.sizes && isp(props.sizes[1])) {
      locator.height = props.sizes[1];
    }
  }

  return {position: props.position, overflow: props.overflow, zIndex: props.zIndex, ...locator};
}

export function toBodyStyle(props, data): Object {
  let maximum = isRef(data.maximum) ? data.maximum.value : data.maximum;
  let position = props.modally ? "absolute" : null;
  let locator = doLocator(props.offset, props.sizes, data.locator, props.modally && !maximum, true);

  if (props.modally === false) {
    if (props.sizes && isp(props.sizes[0])) {
      locator.width = "100%";
    }

    if (props.sizes && isp(props.sizes[1])) {
      locator.height = "100%";
    }
  }

  return {position: position, overflow: props.overflow, ...locator};
}

export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}