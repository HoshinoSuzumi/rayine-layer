import { createShikiHighlighter } from "@nuxtjs/mdc/runtime/highlighter/shiki";
import MaterialTheme from "shiki/themes/material-theme.mjs";
import MaterialThemeLighter from "shiki/themes/material-theme-lighter.mjs";
import LightPlus from "shiki/themes/light-plus.mjs";
import DarkPlus from "shiki/themes/dark-plus.mjs";
import HtmlLang from "shiki/langs/html.mjs";
import MdcLang from "shiki/langs/mdc.mjs";
import VueLang from "shiki/langs/vue.mjs";
import YamlLang from "shiki/langs/yaml.mjs";
import PostcssLang from "shiki/langs/postcss.mjs";
import type { Highlighter } from "@nuxtjs/mdc";

let highlighter: Highlighter;
export const useShikiHighlighter = () => {
  if (!highlighter) {
    highlighter = createShikiHighlighter({
      bundledThemes: {
        "material-theme-lighter": MaterialThemeLighter,
        "material-theme": MaterialTheme,
        "light-plus": LightPlus,
        "dark-plus": DarkPlus,
      },
      bundledLangs: {
        html: HtmlLang,
        mdc: MdcLang,
        vue: VueLang,
        yml: YamlLang,
        postcss: PostcssLang,
      },
    });
  }

  return highlighter;
};
