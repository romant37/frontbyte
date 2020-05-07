import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import locales_no from 'assets/locales/no/translation.json'
import locales_en from 'assets/locales/en/translation.json'

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  saveMissing: true,
  preload: ['en', 'no'],
  lng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  resources: {
    en: {
      translations: locales_en,
    },
    no: {
      translations: locales_no,
    },
  },
  react: {
    bindI18n: 'languageChanged',
  },
})

export default i18n
