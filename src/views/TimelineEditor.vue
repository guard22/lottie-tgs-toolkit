<template>
  <div class="timeline-editor">
    <div class="editor-content">
      <h2>{{ $t('timelineEditor.title') }}</h2>
      <p>{{ $t('timelineEditor.subtitle') }}</p>
      
      <div class="animation-info" v-if="animData">
        <h3>{{ $t('timelineEditor.animationInfo.title') }}</h3>
        <ul>
          <li><strong>{{ $t('timelineEditor.animationInfo.name') }}:</strong> {{ animData.nm || $t('timelineEditor.animationInfo.untitled') }}</li>
          <li><strong>{{ $t('timelineEditor.animationInfo.size') }}:</strong> {{ animData.w }}x{{ animData.h }}</li>
          <li><strong>{{ $t('timelineEditor.animationInfo.fps') }}:</strong> {{ animData.fr }}</li>
          <li><strong>{{ $t('timelineEditor.animationInfo.duration') }}:</strong> {{ animData.op - animData.ip }} {{ $t('timelineEditor.animationInfo.frames') }}</li>
          <li><strong>{{ $t('timelineEditor.animationInfo.layers') }}:</strong> {{ animData.layers?.length || 0 }}</li>
        </ul>
      </div>
      
      <!-- Animation Controls -->
      <div class="animation-controls" v-if="animData">
        <h3>{{ $t('timelineEditor.animationSettings.title') }}</h3>
        <div class="controls-grid">
          <div class="control-group">
            <label>{{ $t('timelineEditor.animationSettings.animationName') }}</label>
            <input 
              type="text" 
              v-model="editableAnimData.nm" 
              @input="updateAnimData"
              class="control-input"
            />
          </div>
          
          <div class="control-group">
            <label>{{ $t('timelineEditor.animationSettings.fpsLabel') }}</label>
            <input 
              type="number" 
              v-model.number="editableAnimData.fr" 
              @input="updateAnimData"
              min="1" 
              max="60"
              class="control-input"
            />
          </div>
          
          <div class="control-group">
            <label>{{ $t('timelineEditor.animationSettings.startFrame') }}</label>
            <input 
              type="number" 
              v-model.number="editableAnimData.ip" 
              @input="updateAnimData"
              min="0"
              class="control-input"
            />
          </div>
          
          <div class="control-group">
            <label>{{ $t('timelineEditor.animationSettings.endFrame') }}</label>
            <input 
              type="number" 
              v-model.number="editableAnimData.op" 
              @input="updateAnimData"
              :min="editableAnimData.ip + 1"
              class="control-input"
            />
          </div>
        </div>
      </div>

      <!-- Layers Panel -->
      <div class="layers-panel" v-if="animData && animData.layers">
        <h3>{{ $t('timelineEditor.layersPanel.title') }}</h3>
        <div class="layers-list">
          <div 
            v-for="(layer, index) in animData.layers" 
            :key="layer.ind || index"
            class="layer-item"
            :class="{ 'selected': selectedLayer === index }"
            @click="selectLayer(index)"
          >
            <div class="layer-header">
              <div class="layer-info">
                <span class="layer-name">{{ layer.nm || `${$t('timelineEditor.layersPanel.layer')} ${layer.ind || index + 1}` }}</span>
                <span class="layer-type">{{ getLayerTypeName(layer.ty) }}</span>
              </div>
              <div class="layer-controls">
                <button 
                  class="layer-toggle"
                  :class="{ 'hidden': layer.hd }"
                  @click.stop="toggleLayerVisibility(index)"
                  :title="layer.hd ? 'Show layer' : 'Hide layer'"
                >
                  <span class="material-icons">{{ layer.hd ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>
            
            <div class="layer-timeline" v-if="selectedLayer === index" @click.stop>
              <div class="timeline-info">
                <div class="timeline-param">
                  <label>{{ $t('timelineEditor.layersPanel.startFrame') }}:</label>
                  <input 
                    type="number" 
                    v-model.number="layer.ip" 
                    @input="updateAnimData"
                    min="0"
                    class="timeline-input"
                  />
                </div>
                <div class="timeline-param">
                  <label>{{ $t('timelineEditor.layersPanel.endFrame') }}:</label>
                  <input 
                    type="number" 
                    v-model.number="layer.op" 
                    @input="updateAnimData"
                    :min="layer.ip + 1"
                    class="timeline-input"
                  />
                </div>
                <div class="timeline-param">
                  <label>{{ $t('timelineEditor.layersPanel.duration') }}:</label>
                  <span class="timeline-value">{{ layer.op - layer.ip }} {{ $t('timelineEditor.animationInfo.frames') }}</span>
                </div>
              </div>
              
              <!-- Timeline Bar -->
              <div class="timeline-bar">
                <div class="timeline-track">
                  <div 
                    class="timeline-segment"
                    :style="{
                      left: (layer.ip / animData.op) * 100 + '%',
                      width: ((layer.op - layer.ip) / animData.op) * 100 + '%'
                    }"
                  ></div>
                </div>
                <div class="timeline-markers">
                  <div 
                    v-for="frame in Math.ceil(animData.op / 10)" 
                    :key="frame"
                    class="timeline-marker"
                    :style="{ left: ((frame * 10) / animData.op) * 100 + '%' }"
                  >
                    {{ frame * 10 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h3>{{ $t('timelineEditor.quickActions.title') }}</h3>
        <div class="actions-grid">
          <button class="action-button" @click="resetAnimation">
            <span class="material-icons">refresh</span>
            {{ $t('timelineEditor.quickActions.reset') }}
          </button>
          <button class="action-button" @click="duplicateLayer" :disabled="selectedLayer === null">
            <span class="material-icons">content_copy</span>
            {{ $t('timelineEditor.quickActions.duplicate') }}
          </button>
          <button class="action-button" @click="deleteLayer" :disabled="selectedLayer === null || animData.layers.length <= 1">
            <span class="material-icons">delete</span>
            {{ $t('timelineEditor.quickActions.delete') }}
          </button>
          <button class="action-button" @click="optimizeAnimation">
            <span class="material-icons">tune</span>
            {{ $t('timelineEditor.quickActions.optimize') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import { MutationTypes } from "../store/store";

export default defineComponent({
  data() {
    return {
      selectedLayer: null as number | null,
      editableAnimData: {} as any,
    };
  },
  computed: mapState(["animData"]),
  watch: {
    animData: {
      handler(newData) {
        if (newData) {
          this.editableAnimData = { ...newData };
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations({
      setAnimData: MutationTypes.SET_ANIM_DATA
    }),
    updateAnimData() {
      this.setAnimData(this.editableAnimData);
    },
    
    selectLayer(index: number) {
      this.selectedLayer = this.selectedLayer === index ? null : index;
    },
    
    getLayerTypeName(type: number): string {
      const types: { [key: number]: string } = {
        0: 'Precomp',
        1: 'Solid',
        2: 'Image',
        3: 'Null',
        4: 'Shape',
        5: 'Text',
        6: 'Audio',
        7: 'Video',
        8: 'Image Sequence',
        9: 'Video',
        10: 'Image',
        11: 'Guide',
        12: 'Adjustment',
        13: 'Camera',
        14: 'Light'
      };
      return types[type] || `Type ${type}`;
    },
    
    toggleLayerVisibility(index: number) {
      if (this.editableAnimData.layers && this.editableAnimData.layers[index]) {
        this.editableAnimData.layers[index].hd = !this.editableAnimData.layers[index].hd;
        this.updateAnimData();
      }
    },
    
    resetAnimation() {
      if (confirm(this.$t('timelineEditor.messages.resetConfirm'))) {
        // Reset to original data - you might want to store original data separately
        location.reload(); // Simple reset for now
      }
    },
    
    duplicateLayer() {
      if (this.selectedLayer !== null && this.editableAnimData.layers) {
        const layerToDuplicate = { ...this.editableAnimData.layers[this.selectedLayer] };
        layerToDuplicate.ind = Math.max(...this.editableAnimData.layers.map((l: any) => l.ind || 0)) + 1;
        layerToDuplicate.nm = (layerToDuplicate.nm || 'Layer') + ' Copy';
        
        this.editableAnimData.layers.push(layerToDuplicate);
        this.updateAnimData();
      }
    },
    
    deleteLayer() {
      if (this.selectedLayer !== null && this.editableAnimData.layers && this.editableAnimData.layers.length > 1) {
        if (confirm(this.$t('timelineEditor.messages.deleteConfirm'))) {
          this.editableAnimData.layers.splice(this.selectedLayer, 1);
          this.selectedLayer = null;
          this.updateAnimData();
        }
      }
    },
    
    optimizeAnimation() {
      // Simple optimization - remove unused properties
      if (this.editableAnimData.layers) {
        this.editableAnimData.layers.forEach((layer: any) => {
          // Remove hidden layers
          if (layer.hd) {
            layer.hd = undefined;
          }
        });
      }
      
      this.updateAnimData();
      alert(this.$t('timelineEditor.messages.optimized'));
    }
  }
});
</script>

<style scoped>
.timeline-editor {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
  background: var(--gray-50);
}

.editor-content {
  max-width: 900px;
  margin: 0 auto;
}

.timeline-editor h2 {
  color: var(--gray-900);
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 700;
}

.timeline-editor p {
  color: var(--gray-600);
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.animation-info {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  margin: 2rem 0;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
}

.animation-info h3 {
  color: var(--gray-800);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.animation-info h3::before {
  content: '📊';
  font-size: 1.5rem;
}

.animation-info ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.animation-info li {
  padding: 1rem;
  background: var(--gray-50);
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease-in-out;
}

.animation-info li:hover {
  background: var(--primary-light);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.animation-info li strong {
  color: var(--gray-700);
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.placeholder {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  padding: 3rem 2rem;
  border-radius: var(--border-radius-xl);
  text-align: center;
  color: var(--gray-700);
  margin-top: 2rem;
  border: 1px solid var(--primary-color);
  position: relative;
  overflow: hidden;
}

.placeholder::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 3s infinite;
}

.placeholder p {
  margin: 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 500;
}

.placeholder p:first-child {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
}

@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

/* Animation Controls */
.animation-controls {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  margin: 2rem 0;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
}

.animation-controls h3 {
  color: var(--gray-800);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.animation-controls h3::before {
  content: '⚙️';
  font-size: 1.5rem;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  font-weight: 600;
  color: var(--gray-700);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.control-input {
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  background: white;
}

.control-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Layers Panel */
.layers-panel {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  margin: 2rem 0;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
}

.layers-panel h3 {
  color: var(--gray-800);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.layers-panel h3::before {
  content: '🎬';
  font-size: 1.5rem;
}

.layers-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-item {
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.layer-item:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow);
}

.layer-item.selected {
  border-color: var(--primary-color);
  background: var(--primary-light);
  box-shadow: var(--shadow);
}

.layer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.layer-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.layer-name {
  font-weight: 600;
  color: var(--gray-800);
}

.layer-type {
  font-size: 0.875rem;
  color: var(--gray-600);
  background: var(--gray-100);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  display: inline-block;
}

.layer-controls {
  display: flex;
  gap: 0.5rem;
}

.layer-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--gray-300);
  background: white;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.layer-toggle:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

.layer-toggle.hidden {
  background: var(--error-color);
  border-color: var(--error-color);
  color: white;
}

.layer-timeline {
  padding: 1rem;
  border-top: 1px solid var(--gray-200);
  background: var(--gray-50);
}

.timeline-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.timeline-param {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.timeline-param label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline-input {
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
}

.timeline-value {
  padding: 0.5rem;
  background: var(--gray-100);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-700);
}

.timeline-bar {
  position: relative;
  margin-top: 1rem;
}

.timeline-track {
  height: 20px;
  background: var(--gray-200);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.timeline-segment {
  position: absolute;
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}

.timeline-markers {
  display: flex;
  position: relative;
  margin-top: 0.5rem;
  height: 20px;
}

.timeline-marker {
  position: absolute;
  font-size: 0.75rem;
  color: var(--gray-600);
  transform: translateX(-50%);
}

/* Quick Actions */
.quick-actions {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-xl);
  margin: 2rem 0;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
}

.quick-actions h3 {
  color: var(--gray-800);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quick-actions h3::before {
  content: '⚡';
  font-size: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--gray-300);
  background: white;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  color: var(--gray-700);
}

.action-button:hover:not(:disabled) {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-button .material-icons {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .timeline-editor {
    padding: 1rem;
  }
  
  .animation-info,
  .animation-controls,
  .layers-panel,
  .quick-actions {
    padding: 1.5rem;
  }
  
  .animation-info ul,
  .controls-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-info {
    grid-template-columns: 1fr;
  }
  
  .layer-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
