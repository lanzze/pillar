import config from "../config/static.json";

function recompute() {
   // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
   const scale = document.documentElement.clientWidth / 375;

   // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
   document.documentElement.style.fontSize = Math.ceil(config["base-font-size"] * scale) + 'px';

   return recompute;
}

// 改变窗口大小时重新设置 rem
window.onresize = recompute();
