import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import ru from '../locales/ru'

// Determine default language
const getDefaultLocale = (): string => {
  // Check saved language in localStorage
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['en', 'ru'].includes(savedLocale)) {
    return savedLocale
  }
  
  // Determine browser language
  const browserLocale = navigator.language.toLowerCase()
  if (browserLocale.startsWith('ru')) {
    return 'ru'
  }
  
  return 'en' // Default to English
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
})

export default i18n

// Function to change language
export const setLocale = (locale: string) => {
  if (['en', 'ru'].includes(locale)) {
    i18n.global.locale.value = locale as any
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }
}

// Function to get current language
export const getCurrentLocale = (): string => {
  return i18n.global.locale.value
}