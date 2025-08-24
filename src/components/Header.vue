<template>
  <header id="header">
    <div class="header-container">
      <div class="logo">
        <span class="logo-icon">🎨</span>
        <span class="logo-text">Lottie TGS Toolkit</span>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/" class="nav-item">
          <span class="material-icons">home</span>
          <span class="nav-text">{{ $t('nav.home') }}</span>
        </router-link>
        <router-link to="/batch-convert" class="nav-item">
          <span class="material-icons">folder_open</span>
          <span class="nav-text">{{ $t('nav.batchConvert') }}</span>
        </router-link>
        <router-link to="/editor" class="nav-item">
          <span class="material-icons">edit</span>
          <span class="nav-text">{{ $t('nav.editor') }}</span>
        </router-link>
        <router-link to="/about" class="nav-item">
          <span class="material-icons">info</span>
          <span class="nav-text">{{ $t('nav.about') }}</span>
        </router-link>
        
        <LanguageSwitcher />
      </nav>

      <!-- Mobile menu button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span class="material-icons">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>

    <!-- Mobile menu -->
    <nav class="mobile-nav" :class="{ 'mobile-nav-open': mobileMenuOpen }">
      <router-link to="/" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="material-icons">home</span>
        <span>{{ $t('nav.home') }}</span>
      </router-link>
      <router-link to="/batch-convert" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="material-icons">folder_open</span>
        <span>{{ $t('nav.batchConvert') }}</span>
      </router-link>
      <router-link to="/editor" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="material-icons">edit</span>
        <span>{{ $t('nav.editor') }}</span>
      </router-link>
      <router-link to="/about" class="mobile-nav-item" @click="closeMobileMenu">
        <span class="material-icons">info</span>
        <span>{{ $t('nav.about') }}</span>
      </router-link>
      
      <div class="mobile-lang-switcher">
        <LanguageSwitcher />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";

export default defineComponent({
  name: "Header",
  components: {
    LanguageSwitcher,
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
  },
});
</script>

<style scoped>
#header {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-900);
}

.logo-icon {
  font-size: 1.75rem;
}

.logo-text {
  color: var(--primary-color);
  font-weight: 700;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  color: var(--gray-600);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover {
  color: var(--primary-color);
  background-color: var(--gray-50);
  transform: translateY(-1px);
}

.nav-item.router-link-active {
  color: var(--primary-color);
  background-color: var(--primary-light);
  font-weight: 600;
}

.nav-text {
  font-size: 0.875rem;
}

.material-icons {
  font-size: 1.25rem;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--gray-600);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
}

.mobile-menu-btn:hover {
  background-color: var(--gray-100);
  color: var(--primary-color);
}

.mobile-nav {
  display: none;
  background-color: white;
  border-top: 1px solid var(--gray-200);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-nav-open {
  max-height: 300px;
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: var(--gray-600);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid var(--gray-100);
  transition: all 0.2s ease;
}

.mobile-nav-item:hover {
  background-color: var(--gray-50);
  color: var(--primary-color);
}

.mobile-nav-item.router-link-active {
  background-color: var(--primary-light);
  color: var(--primary-color);
  font-weight: 600;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
  }
  
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-nav {
    display: block;
  }
}

.mobile-lang-switcher {
  padding: 1rem 2rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  justify-content: center;
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.125rem;
  }
}
</style>