import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arTranslations from "./locals/ar.json"
import frTranslations from "./locals/fr.json"
import enTranslations from "./locals/en.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      En: {
        translation: enTranslations,
      },
      Fr: {
        translation: frTranslations,
      },
      Ar: {
        translation: arTranslations
      }
    },
    lng: 'En', // Set the default language
    fallbackLng: 'En', // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // Disable HTML escaping
    },
  });

export default i18n