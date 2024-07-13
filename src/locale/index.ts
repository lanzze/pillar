// @ts-ignore
import zh_CN from "./lang/zh_CN.json"
// @ts-ignore
import en_US from "./lang/en_US.json"

export const languages = [
   {code: "zh_CN", name: "简体中文"},
   {code: "pt_BR", name: "Brazilian Portuguese"},  // 葡萄牙（巴西）
]


export const messages = {
   locale: "zh_CN",
   legacy: false,
   messages: {
      zh_CN,
      en_US
   }
}