<template>
  <div id="batchConverter">
    <h2>{{ $t('batchConverter.title') }}</h2>
    <div
      id="batchDropArea"
      :class="{dragover: dragover}"
      @drop.prevent="dropFiles"
      @dragover.prevent="dragover = true;"
      @dragenter="dragover = true;"
      @dragend="dragover = false;"
      @dragleave="dragover = false;"
      @click="this.$refs.folderInput.click()"
    >
      <div class="material-icons">folder_open</div>
      <div>{{ $t('batchConverter.dropArea') }}</div>
      
      <input
        type="file"
        ref="folderInput"
        id="folderInput"
        webkitdirectory
        directory
        multiple
        @change="handleFolderSelect"
      />
    </div>

    <div v-if="files.length > 0" class="file-list">
      <h3>{{ $t('batchConverter.filesFound') }}: {{ tgsFiles.length }}</h3>
      <div class="progress-container">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{width: progressPercent + '%'}"
          ></div>
        </div>
        <span>{{ processedCount }} / {{ tgsFiles.length }}</span>
      </div>
      
      <div class="file-items">
        <div 
          v-for="file in tgsFiles" 
          :key="file.name"
          class="file-item"
          :class="{
            'processed': file.processed,
            'error': file.error,
            'processing': file.processing
          }"
        >
          <span class="file-name">{{ file.name }}</span>
          <span class="file-status">
            <span v-if="file.processing">⏳</span>
            <span v-else-if="file.processed">✅</span>
            <span v-else-if="file.error">❌</span>
            <span v-else>⏸️</span>
          </span>
        </div>
      </div>

      <div class="action-buttons">
        <button 
          class="text-button primary" 
          @click="convertAll"
          :disabled="isConverting"
        >
          {{ isConverting ? $t('batchConverter.buttons.converting') : $t('batchConverter.buttons.convertAll') }}
        </button>
        <button 
          class="text-button" 
          @click="downloadAsZip"
          :disabled="processedCount === 0"
        >
          {{ $t('batchConverter.buttons.downloadZip') }} ({{ processedCount }})
        </button>
        <button class="text-button" @click="clearFiles">{{ $t('batchConverter.buttons.clear') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ungzip } from "pako";
import { downloadDataAsFile } from "../main";
import JSZip from "jszip";

interface TgsFile {
  file: File;
  name: string;
  processed: boolean;
  processing: boolean;
  error: boolean;
  jsonData?: string;
}

export default defineComponent({
  data() {
    return {
      dragover: false,
      files: [] as File[],
      tgsFiles: [] as TgsFile[],
      isConverting: false,
      processedCount: 0,
    };
  },
  computed: {
    progressPercent(): number {
      if (this.tgsFiles.length === 0) return 0;
      return (this.processedCount / this.tgsFiles.length) * 100;
    }
  },
  methods: {
    dropFiles(e: DragEvent) {
      this.dragover = false;
      const items = e.dataTransfer?.items;
      if (items) {
        this.handleDataTransferItems(items);
      }
    },
    
    handleFolderSelect(e: InputEvent) {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        this.files = Array.from(files);
        this.processFolderFiles();
      }
    },

    async handleDataTransferItems(items: DataTransferItemList) {
      const files: File[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const entry = item.webkitGetAsEntry();
          if (entry) {
            await this.traverseFileTree(entry, files);
          }
        }
      }
      
      this.files = files;
      this.processFolderFiles();
    },

    async traverseFileTree(item: any, files: File[]): Promise<void> {
      return new Promise((resolve) => {
        if (item.isFile) {
          (item as any).file((file: File) => {
            if (file.name.toLowerCase().endsWith('.tgs')) {
              files.push(file);
            }
            resolve();
          });
        } else if (item.isDirectory) {
          const dirReader = (item as any).createReader();
          dirReader.readEntries(async (entries: any[]) => {
            for (const entry of entries) {
              await this.traverseFileTree(entry, files);
            }
            resolve();
          });
        } else {
          resolve();
        }
      });
    },

    processFolderFiles() {
      this.tgsFiles = this.files
        .filter(file => file.name.toLowerCase().endsWith('.tgs'))
        .map(file => ({
          file,
          name: file.name,
          processed: false,
          processing: false,
          error: false,
        }));
      this.processedCount = 0;
    },

    async convertAll() {
      if (this.isConverting) return;
      
      this.isConverting = true;
      this.processedCount = 0;

      for (const tgsFile of this.tgsFiles) {
        if (!tgsFile.processed) {
          await this.convertSingleFile(tgsFile);
        }
      }

      this.isConverting = false;
    },

    async convertSingleFile(tgsFile: TgsFile): Promise<void> {
      tgsFile.processing = true;
      tgsFile.error = false;

      try {
        const data = await this.readFileAsBinaryString(tgsFile.file);
        
        // Unpack gzip
        const unzippedData = new TextDecoder("utf-8").decode(ungzip(new Uint8Array(data.split('').map(c => c.charCodeAt(0)))));
        
        // Check that it's valid JSON
        JSON.parse(unzippedData);
        
        tgsFile.jsonData = unzippedData;
        tgsFile.processed = true;
        this.processedCount++;
      } catch (error) {
        console.error(`${this.$t('batchConverter.errors.conversionError')} ${tgsFile.name}:`, error);
        tgsFile.error = true;
      } finally {
        tgsFile.processing = false;
      }
    },

    readFileAsBinaryString(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsBinaryString(file);
      });
    },

    async downloadAsZip() {
      const processedFiles = this.tgsFiles.filter(f => f.processed && f.jsonData);
      
      if (processedFiles.length === 0) {
        return;
      }

      if (processedFiles.length === 1) {
        // If only one file, download it separately
        const file = processedFiles[0];
        const fileName = file.name.replace(/\.tgs$/i, '');
        if (file.jsonData) {
          downloadDataAsFile(fileName, '.json', file.jsonData);
        }
        return;
      }

      // Create ZIP archive
      const zip = new JSZip();
      
      processedFiles.forEach(file => {
        const fileName = file.name.replace(/\.tgs$/i, '.json');
        if (file.jsonData) {
          zip.file(fileName, file.jsonData);
        }
      });

      try {
        // Generate ZIP file
        const zipBlob = await zip.generateAsync({ type: "blob" });
        
        // Create download link
        const url = window.URL.createObjectURL(zipBlob);
        const linkElement = document.createElement('a');
        linkElement.setAttribute("href", url);
        linkElement.setAttribute("download", `converted_tgs_files_${new Date().toISOString().slice(0, 10)}.zip`);
        linkElement.style.display = 'none';

        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
        
        // Free memory
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(this.$t('batchConverter.errors.zipError'), error);
        alert(this.$t('batchConverter.errors.zipErrorAlert'));
      }
    },

    clearFiles() {
      this.files = [];
      this.tgsFiles = [];
      this.processedCount = 0;
      this.isConverting = false;
    }
  }
});
</script>

<style scoped>
#batchConverter {
  max-width: 100%;
}

#batchDropArea {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 250px;
  background: white;
  border-radius: var(--border-radius-xl);
  border: 3px dashed var(--gray-300);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
}

#batchDropArea:hover {
  border-color: var(--primary-color);
  background-color: #fafbff;
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

#batchDropArea.dragover {
  border-color: var(--primary-color);
  background-color: #f0f4ff;
  transform: scale(1.02);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

#batchDropArea .material-icons {
  font-size: 5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

#batchDropArea:hover .material-icons {
  color: #4f46e5;
  transform: scale(1.1);
}

#batchDropArea div:last-child {
  color: var(--gray-700);
  font-weight: 600;
  font-size: 1.125rem;
  text-align: center;
  max-width: 400px;
  line-height: 1.6;
}

#batchDropArea:hover div:last-child {
  color: var(--primary-color);
}

#batchDropArea.dragover div:last-child {
  color: var(--primary-color);
  font-weight: 700;
}

#folderInput {
  display: none;
}

.file-list {
  background: white;
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border: 1px solid var(--gray-200);
}

.file-list h3 {
  color: var(--gray-900);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--gray-200);
}

.progress-bar {
  flex: 1;
  height: 14px;
  background-color: var(--gray-200);
  border-radius: 7px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color) 0%, #667eea 100%);
  transition: width 0.5s ease;
  border-radius: 7px;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.file-items {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 2rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  transition: all 0.2s ease-in-out;
}

.file-item:last-child {
  border-bottom: none;
}

.file-item:hover {
  background-color: var(--gray-50);
}

.file-item.processing {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-left: 4px solid #f59e0b;
  animation: pulse 2s infinite;
}

.file-item.processed {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border-left: 4px solid #10b981;
  animation: fadeInUp 0.5s ease;
}

.file-item.error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-left: 4px solid #ef4444;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.file-name {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: var(--gray-700);
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-status {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
}

.text-button {
  min-width: 200px;
}

.text-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.text-button:disabled:hover {
  background-color: white;
  border-color: var(--gray-300);
  box-shadow: var(--shadow-sm);
  transform: none;
}

.text-button.primary:disabled:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .file-list {
    padding: 1rem;
  }
  
  .file-items {
    max-height: 300px;
  }
  
  .file-name {
    max-width: 200px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .text-button {
    min-width: 250px;
  }
}
</style>