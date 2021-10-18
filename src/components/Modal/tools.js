function ensure(value) {
  return value == null ? null : isNaN(value) ? value : `${value}px`;
}

function isp(value) {
  return typeof value === "string" && (value.match(/^.+(%|vh|vw)$/));
}

function doLocator(offset, sizes, locator, calcOffset, calcSize) {
  let siz = sizes && sizes.map(function (v) {
    return isNaN(v) ? v : `${v}px`;
  });
  let top = calcOffset && ensure(locator.top != null ? locator.top : offset && offset.top);
  let lft = calcOffset && ensure(locator.left != null ? locator.left : offset && offset.left);
  let rgt = calcOffset && ensure(offset && offset.right);
  let bom = calcOffset && ensure(offset && offset.bottom);
  let wid = siz && siz[0],
      hei = siz && siz[1];

  if (!top && !bom && calcOffset) {
    top = siz ? `calc(50% - ${siz[1]}/2)` : 0;
  }

  if (!lft && !rgt && calcOffset) {
    lft = siz ? `calc(50% - ${siz[0]}/2)` : 0;
  }

  return {top: top, left: lft, right: rgt, bottom: bom, width: calcSize && wid, height: calcSize && hei};
}

export function toMainStyle(props, data) {
  if (props.cover) {
    return {position: props.position, zIndex: props.zIndex};
  }

  let locator = doLocator(props.offset, props.sizes, data.locator, true, false);

  if (props.cover === false) {
    if (props.sizes && isp(props.sizes[0])) {
      locator.width = props.sizes[0];
    }

    if (props.sizes && isp(props.sizes[1])) {
      locator.height = props.sizes[1];
    }
  }

  return Object.assign({position: props.position, overflow: props.overflow, zIndex: props.zIndex}, locator);
}

export function toBodyStyle(props, data) {
  let position = props.cover ? "absolute" : null;
  let locator = doLocator(props.offset, props.sizes, data.locator, props.cover, true);

  if (props.cover === false) {
    if (props.sizes && isp(props.sizes[0])) {
      locator.width = "100%";
    }

    if (props.sizes && isp(props.sizes[1])) {
      locator.height = "100%";
    }
  }

  return Object.assign({position: position, overflow: props.overflow}, locator);
}

export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}