<template>
  <div
    id="dropArea"
    :class="{dragover: dragover}"
    v-cloak
    @drop.prevent="dropFiles"
    @dragover.prevent="dragover = true;"
    @dragenter="dragover = true;"
    @dragend="dragover = false;"
    @dragleave="dragover = false;"
    @click="this.$refs.fileInput.click()"
  >
    <div class="material-icons">open_in_browser</div>
    <div>{{ $t('fileDrop.dragDrop') }}</div>

    <input
      type="file"
      ref="fileInput"
      id="fileInput"
      accept=".tgs, .json, .lottie"
      @change="openFile"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ungzip } from "pako";
import store from "../store/store";
import { MutationTypes } from "../store/store";

export default defineComponent({
  data() {
    return {
      dragover: false,
    };
  },
  methods: {
    dropFiles(e: DragEvent) {
      this.dragover = false;
      this.handleFile(e.dataTransfer?.files);
    },
    openFile(e: InputEvent) {
      this.handleFile((e.target as HTMLInputElement).files);
    },
    handleFile(files: FileList | undefined | null) {
      if (files && files.length > 0) {
        console.log(files[0]);
        const reader = new FileReader();
        reader.readAsBinaryString(files[0]);
        reader.addEventListener("load", this.onFileLoaded);
      }
    },
    onFileLoaded(file: ProgressEvent<FileReader>) {
      let data = file.target?.result;
      if (data instanceof ArrayBuffer) {
        data = new TextDecoder("utf-8").decode(data);
      }

      if (data) {
        // Try to unzip the gzip
        try {
          data = new TextDecoder("utf-8").decode(ungzip(new Uint8Array(data.split('').map(c => c.charCodeAt(0)))));
        } catch (e) {
          console.log(e);
        }

        try {
          const newAnimData = JSON.parse(data);
          store.commit(MutationTypes.SET_LOADED_ANIM_DATA, newAnimData);
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
});
</script>

<style scoped>
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -10px, 0);
  }
  70% {
    transform: translate3d(0, -5px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

#dropArea {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 200px;
  background: white;
  border-radius: var(--border-radius-lg);
  border: 2px dashed var(--gray-300);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

#dropArea:hover {
  border-color: var(--primary-color);
  background-color: #fafbff;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

#dropArea.dragover {
  border-color: var(--primary-color);
  background-color: #f0f4ff;
  transform: scale(1.02);
  animation: pulse 1.5s infinite;
}

#dropArea .material-icons {
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

#dropArea:hover .material-icons {
  animation: bounce 1s;
  color: #4f46e5;
}

#dropArea div:last-child {
  color: var(--gray-700);
  font-weight: 500;
  text-align: center;
  max-width: 320px;
  line-height: 1.6;
  font-size: 1rem;
}

#dropArea:hover div:last-child {
  color: var(--primary-color);
}

#dropArea.dragover div:last-child {
  color: var(--primary-color);
  font-weight: 600;
}

#fileInput {
  display: none;
}
</style>