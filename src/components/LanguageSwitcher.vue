<template>
  <div class="language-switcher">
    <button
      v-for="lang in languages"
      :key="lang.code"
      @click="switchLanguage(lang.code)"
      :class="['lang-button', { active: currentLocale === lang.code }]"
      :title="lang.name"
    >
      {{ lang.flag }} {{ lang.code.toUpperCase() }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

export default defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    const { locale } = useI18n()
    
    const languages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' }
    ]
    
    const switchLanguage = (langCode: string) => {
      setLocale(langCode)
    }
    
    const currentLocale = computed(() => locale.value)
    
    return {
      languages,
      switchLanguage,
      currentLocale
    }
  }
})
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-300);
  background: white;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
}

.lang-button:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

.lang-button.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.lang-button.active:hover {
  background: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

@media (max-width: 768px) {
  .lang-button {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>