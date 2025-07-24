import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import es from "./locales/es/common.json";
import fr from "./locales/fr/common.json";
import de from "./locales/de/common.json";
import pt from "./locales/pt/common.json";
import zh from "./locales/zh/common.json";
import ja from "./locales/ja/common.json";
import ru from "./locales/ru/common.json";
import ar from "./locales/ar/common.json";
import hi from "./locales/hi/common.json";

const resources = {
  en: { common: en },
  es: { common: es },
  fr: { common: fr },
  de: { common: de },
  pt: { common: pt },
  zh: { common: zh },
  ja: { common: ja },
  ru: { common: ru },
  ar: { common: ar },
  hi: { common: hi }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;