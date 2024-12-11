import { createContext, useContext, useEffect, useState } from "react";

import i18n from "i18next";

const LangContext = createContext();

export const useLanguageContext = () => {
  return useContext(LangContext);
};

export const LangProvider = ({ children }) => {
  const currentLanguage = localStorage.getItem("language") || "en";
  const [language, setLanguage] = useState(currentLanguage);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    if (i18n.isInitialized) {
      i18n.changeLanguage(language);
    } else {
      i18n.on("initialized", () => {
        i18n.changeLanguage(language);
      });
    }
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
};
