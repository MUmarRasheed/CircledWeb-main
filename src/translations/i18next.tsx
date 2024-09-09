import i18next from "i18next";

import common_en from "./en/common.json";
import navigation_en from "./en/navigation.json";

const i18nInit = () =>
  i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: "en", // language to use
    resources: {
      en: {
        common: common_en, // 'common' is our custom namespace
        navigation: navigation_en,
      },
    },
  });

export default i18nInit;
