<template>
  <div id="about">
    <div class="about-container">
      <div class="about-header">
        <h1>{{ $t('nav.about') }}</h1>
        <p class="about-subtitle">{{ $t('home.title') }}</p>
      </div>
      
      <div class="about-content">
        <div class="about-section">
          <h2>🎯 {{ $t('home.features.convert.title') }}</h2>
          <p>{{ $t('home.features.convert.description') }}</p>
        </div>
        
        <div class="about-section">
          <h2>⚡ {{ $t('home.features.batch.title') }}</h2>
          <p>{{ $t('home.features.batch.description') }}</p>
        </div>
        
        <div class="about-section">
          <h2>🔧 {{ $t('home.features.edit.title') }}</h2>
          <p>{{ $t('home.features.edit.description') }}</p>
        </div>
        
        <div class="about-section">
          <h2>🌐 {{ $t('nav.about') }}</h2>
          <p>{{ $t('about.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About'
})
</script>

<style scoped>
#about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-subtitle {
  font-size: 1.25rem;
  color: var(--gray-600);
  margin-top: 0.5rem;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-section {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
}

.about-section h2 {
  color: var(--gray-800);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.about-section p {
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-section p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  #about {
    padding: 1rem;
  }
  
  .about-section {
    padding: 1.5rem;
  }
}
</style>