<template>
  <div id="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1>{{ $t('home.title') }}</h1>
        <p class="hero-description">
          {{ $t('home.description') }}
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">⚡</span>
            <span class="stat-label">{{ $t('home.features.convert.title') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">📁</span>
            <span class="stat-label">{{ $t('home.features.batch.title') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">🔒</span>
            <span class="stat-label">{{ $t('home.features.edit.title') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="features-section">
      <h2>{{ $t('home.subtitle') }}</h2>
      
      <div class="conversion-options">
        <div class="option-card">
          <div class="card-icon">
            <span class="material-icons">upload_file</span>
          </div>
          <div class="card-content">
            <h3>{{ $t('home.features.convert.title') }}</h3>
            <p>{{ $t('home.features.convert.description') }}</p>
            <div class="card-action">
              <FileDrop />
            </div>
          </div>
        </div>
        
        <div class="option-card">
          <div class="card-icon">
            <span class="material-icons">folder_open</span>
          </div>
          <div class="card-content">
            <h3>{{ $t('home.features.batch.title') }}</h3>
            <p>{{ $t('home.features.batch.description') }}</p>
            <div class="card-action">
              <router-link to="/batch-convert" class="text-button primary">
                <span class="material-icons">rocket_launch</span>
                {{ $t('home.cta.batch') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <LoadedAnimPreview />
    
    <div class="info-section">
      <div class="info-grid">
        <div class="info-card">
          <h3>🎨 {{ $t('info.whatIsTgs.title') }}</h3>
          <p>{{ $t('info.whatIsTgs.description') }}</p>
        </div>
        <div class="info-card">
          <h3>⚡ {{ $t('info.fastProcessing.title') }}</h3>
          <p>{{ $t('info.fastProcessing.description') }}</p>
        </div>
        <div class="info-card">
          <h3>🔧 {{ $t('info.editing.title') }}</h3>
          <p>{{ $t('info.editing.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileDrop from "../components/FileDrop.vue";
import LoadedAnimPreview from "../components/LoadedAnimPreview.vue";

export default defineComponent({
  components: {
    FileDrop,
    LoadedAnimPreview,
  },
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

#home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 2rem;
  margin: -2rem -1rem 4rem -1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 2rem 2rem;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
}

.hero-content {
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

.hero-section h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: white;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  animation: pulse 2s infinite;
}

.stat-number {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.features-section {
  padding: 0 1rem;
  margin-bottom: 4rem;
}

.features-section h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease-out;
}

.conversion-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.option-card {
  background: white;
  border-radius: var(--border-radius-xl);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border: 1px solid var(--gray-200);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  animation: fadeInUp 0.8s ease-out;
}

.option-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
}

.card-icon {
  background: linear-gradient(135deg, var(--primary-color) 0%, #667eea 100%);
  color: white;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.card-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.option-card:hover .card-icon::before {
  left: 100%;
}

.card-icon .material-icons {
  font-size: 4rem;
  animation: float 3s ease-in-out infinite;
}

.card-content {
  padding: 2.5rem;
  text-align: center;
}

.card-content h3 {
  color: var(--gray-900);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.card-content p {
  color: var(--gray-600);
  margin-bottom: 2rem;
  line-height: 1.7;
  font-size: 1rem;
}

.card-action {
  margin-top: 1.5rem;
}

.info-section {
  padding: 0 1rem;
  margin-bottom: 4rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.info-card {
  background: white;
  padding: 2.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  border: 1px solid var(--gray-200);
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.info-card h3 {
  color: var(--gray-900);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.info-card p {
  color: var(--gray-600);
  line-height: 1.7;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1rem;
    margin: -1rem -0.5rem 3rem -0.5rem;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
  
  .stat-item {
    width: 200px;
  }
  
  .conversion-options {
    grid-template-columns: 1fr;
  }
  
  .features-section h2 {
    font-size: 2rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .features-section h2 {
    font-size: 1.75rem;
  }
  
  .conversion-options {
    grid-template-columns: 1fr;
  }
}
</style>
