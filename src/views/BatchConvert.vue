<template>
  <div id="batchConvert">
    <div class="page-header">
      <h1>{{ $t('batchConvert.title') }}</h1>
      <p class="page-description">
        {{ $t('batchConvert.description') }}
      </p>
    </div>
    
    <div class="converter-container">
      <BatchConverter />
    </div>
    
    <div class="help-section">
      <div class="help-grid">
        <div class="help-card">
          <span class="help-icon">📁</span>
          <h3>{{ $t('batchConvert.help.selectFolder.title') }}</h3>
          <p>{{ $t('batchConvert.help.selectFolder.description') }}</p>
        </div>
        <div class="help-card">
          <span class="help-icon">⚡</span>
          <h3>{{ $t('batchConvert.help.fastProcessing.title') }}</h3>
          <p>{{ $t('batchConvert.help.fastProcessing.description') }}</p>
        </div>
        <div class="help-card">
          <span class="help-icon">📦</span>
          <h3>{{ $t('batchConvert.help.zipArchive.title') }}</h3>
          <p>{{ $t('batchConvert.help.zipArchive.description') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BatchConverter from "../components/BatchConverter.vue";

export default defineComponent({
  components: {
    BatchConverter,
  },
});
</script>

<style scoped>
#batchConvert {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-description {
  font-size: 1.125rem;
  color: var(--gray-600);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.converter-container {
  margin-bottom: 4rem;
}

.help-section {
  background: white;
  border-radius: var(--border-radius-xl);
  padding: 3rem 2rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.help-card {
  text-align: center;
  padding: 1.5rem;
}

.help-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.help-card h3 {
  color: var(--gray-800);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.help-card p {
  color: var(--gray-600);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .help-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  #batchConvert {
    padding: 0 1rem;
  }
  
  .help-section {
    padding: 2rem 1rem;
  }
}
</style>