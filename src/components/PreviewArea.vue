<template>
  <div id="previewAreaMain">
    <LottieAnimation :animData="this.animData" @new-anim="this.anim = $event" />
    <p id="playbackButtons">
      <span
        @click="this.anim.goToAndStop(this.anim.firstFrame, true);"
        class="material-icons black-button"
        title="First frame (down arrow)"
      >first_page</span>
      <span
        @click="goToPrevFrame"
        class="material-icons black-button"
        title="Previous frame (left arrow)"
      >chevron_left</span>
      <span
        @click="this.anim.togglePause();"
        class="material-icons black-button"
        title="Play/pause (spacebar)"
      >
        <span v-if="this.anim && this.anim.isPaused">play_arrow</span>
        <span v-else>pause</span>
      </span>
      <span
        @click="goToNextFrame"
        class="material-icons black-button"
        title="Next frame (right arrow)"
      >chevron_right</span>
      <span
        @click="this.anim.goToAndStop(this.anim.firstFrame + this.anim.totalFrames, true);"
        class="material-icons black-button"
        title="Last frame (up arrow)"
      >last_page</span>
    </p>
    <h4>Export animation:</h4>
    <div class="export-buttons">
      <button @click="this.exportAnimation('.tgs')" class="text-button primary">Save as TGS</button>
      <button @click="this.exportAnimation('.json')" class="text-button">Save as JSON</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import LottieAnimation from "./LottieAnimation.vue";
import { AnimationItem } from "lottie-web";
import { downloadDataAsFile } from "../main";
import { gzip } from "pako";

export default defineComponent({
  components: { LottieAnimation },
  data() {
    return {
      anim: null as AnimationItem | null,
    };
  },
  computed: mapState(["animData"]),
  methods: {
    goToPrevFrame() {
      if (this.anim == null) return;
      let frame = Math.round(this.anim.currentFrame - 0.55);
      if (frame < this.anim.firstFrame) {
        // Loop around if needed
        frame += this.anim.totalFrames;
      }
      this.anim.goToAndStop(frame, true);
    },
    goToNextFrame() {
      if (this.anim == null) return;
      let frame = Math.round(this.anim.currentFrame + 0.55);
      if (frame >= this.anim.firstFrame + this.anim.totalFrames) {
        // Loop around if needed
        frame -= this.anim.totalFrames;
      }
      this.anim.goToAndStop(frame, true);
    },
    globalKeypress(e: KeyboardEvent) {
      // Skip keyboard events targeted at text input fields
      if (e.target) {
        const nodeName = (e.target as HTMLElement).nodeName.toLowerCase();
        if (nodeName == "textarea" || nodeName == "input") {
          return;
        }
      }

      if (e.code === "Space") {
        this.anim?.togglePause();
      } else if (e.code === "ArrowLeft") {
        this.goToPrevFrame();
      } else if (e.code === "ArrowRight") {
        this.goToNextFrame();
      } else if (e.code === "ArrowUp") {
        this.anim?.goToAndStop(
          this.anim.firstFrame + this.anim.totalFrames,
          true
        );
      } else if (e.code === "ArrowDown") {
        this.anim?.goToAndStop(this.anim.firstFrame, true);
      }
    },
    exportAnimation(extension: ".tgs" | ".json") {
      let data: string | Uint8Array = JSON.stringify(this.animData);
      if (extension == ".tgs") {
        data = gzip(data);
      }
      downloadDataAsFile(this.animData.nm, extension, data);
    },
  },
  mounted() {
    // Setup global hotkeys
    window.addEventListener("keydown", this.globalKeypress);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.globalKeypress);
  },
});
</script>

<style scoped>
#previewAreaMain {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--gray-50);
}

#animContainer {
  background-image: url("../assets/background.jpg");
  background-size: 16px 16px;
  background-repeat: repeat;
  border: 1px solid var(--gray-300);
  border-radius: var(--border-radius);
  margin: 1rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
}

#playbackButtons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: white;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
}

#playbackButtons > span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: var(--gray-600);
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
}

#playbackButtons > span:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

#playbackButtons > span:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

h4 {
  margin: 1rem;
  color: var(--gray-800);
  font-weight: 600;
  font-size: 1.125rem;
}

.export-buttons {
  display: flex;
  gap: 0.75rem;
  margin: 0 1rem 1rem 1rem;
  justify-content: center;
}

.export-buttons .text-button {
  flex: 1;
  max-width: 200px;
}
</style>