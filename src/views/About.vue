<template>
  <div id="about">
    <div class="about-container">
      <div class="about-header">
        <h1>{{ $t('nav.about') }}</h1>
        <p class="about-subtitle">{{ $t('home.title') }}</p>
        <p class="about-description">{{ $t('about.description') }}</p>
      </div>
      
      <div class="about-content">
        <!-- Project Information -->
        <div class="about-section">
          <h2>{{ $t('about.project.title') }}</h2>
          <p>{{ $t('about.project.description') }}</p>
          <p>{{ $t('about.project.openSource') }}</p>
          <div class="author-info">
            <span class="author">{{ $t('about.project.author') }}</span>
          </div>
        </div>
        
        <!-- Key Features -->
        <div class="about-section">
          <h2>{{ $t('about.features.title') }}</h2>
          <ul class="feature-list">
            <li v-for="(feature, index) in $t('about.features.items')" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
        
        <!-- Technologies -->
        <div class="about-section">
          <h2>{{ $t('about.tech.title') }}</h2>
          <ul class="tech-list">
            <li v-for="(tech, index) in $t('about.tech.items')" :key="index">
              {{ tech }}
            </li>
          </ul>
        </div>
        
        <!-- Links -->
        <div class="about-section links-section">
          <h2>{{ $t('about.links.title') }}</h2>
          <div class="links-grid">
            <a 
              href="https://github.com/guard22/lottie-tgs-toolkit" 
              target="_blank" 
              rel="noopener noreferrer"
              class="link-card github-link"
            >
              <div class="link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="link-content">
                <h3>{{ $t('about.links.github') }}</h3>
                <p>guard22/lottie-tgs-toolkit</p>
              </div>
            </a>
            
            <a 
              href="https://github.com/guard22/lottie-tgs-toolkit/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              class="link-card issues-link"
            >
              <div class="link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="link-content">
                <h3>{{ $t('about.links.issues') }}</h3>
                <p>Found a bug? Let us know!</p>
              </div>
            </a>
            
            <a 
              href="https://github.com/guard22/lottie-tgs-toolkit/blob/master/README.md" 
              target="_blank" 
              rel="noopener noreferrer"
              class="link-card contribute-link"
            >
              <div class="link-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div class="link-content">
                <h3>{{ $t('about.links.contribute') }}</h3>
                <p>Help make it better!</p>
              </div>
            </a>
          </div>
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
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-subtitle {
  font-size: 1.5rem;
  color: var(--primary-600);
  margin: 0.5rem 0;
  font-weight: 600;
}

.about-description {
  font-size: 1.1rem;
  color: var(--gray-600);
  margin-top: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
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
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.about-section p {
  color: var(--gray-600);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-section p:last-child {
  margin-bottom: 0;
}

.author-info {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
}

.author {
  color: var(--primary-600);
  font-weight: 600;
  font-size: 1.1rem;
}

.feature-list,
.tech-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li,
.tech-list li {
  color: var(--gray-700);
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-100);
  position: relative;
  padding-left: 2rem;
}

.feature-list li:before,
.tech-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-500);
  font-weight: bold;
  font-size: 1.2rem;
}

.feature-list li:last-child,
.tech-list li:last-child {
  border-bottom: none;
}

.links-section {
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  color: inherit;
}

.github-link:hover {
  border-color: #333;
}

.issues-link:hover {
  border-color: var(--primary-500);
}

.contribute-link:hover {
  border-color: var(--secondary-500);
}

.link-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.github-link .link-icon {
  background: #f6f8fa;
  color: #333;
}

.issues-link .link-icon {
  background: var(--primary-100);
  color: var(--primary-600);
}

.contribute-link .link-icon {
  background: var(--secondary-100);
  color: var(--secondary-600);
}

.link-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gray-800);
}

.link-content p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--gray-600);
}

@media (max-width: 768px) {
  #about {
    padding: 1rem;
  }
  
  .about-section {
    padding: 1.5rem;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .link-card {
    padding: 1rem;
  }
  
  .link-icon {
    width: 40px;
    height: 40px;
  }
}
</style>