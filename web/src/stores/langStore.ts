import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Language = 'km' | 'en';

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref<Language>('km'); // default to Khmer matching Balsamiq wireframe

  function setLang(lang: Language) {
    currentLang.value = lang;
  }

  function toggleLang() {
    currentLang.value = currentLang.value === 'km' ? 'en' : 'km';
  }

  return {
    currentLang,
    setLang,
    toggleLang
  };
});
