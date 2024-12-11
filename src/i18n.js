import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      es: { translation: es },
      pt: { translation: pt },
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false,
    },
    lng: localStorage.getItem("language") || "en",
  });
