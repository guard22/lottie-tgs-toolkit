<template>
  <div id="editorMain" class="editor-page">
    <split-panel :layout="'horizontal'" :init="65" :min="20" :max="80" id="mainSplit">
      <template v-slot:1>
        <div class="splitSlot">
          <div id="editorHeader" class="subHeader">
            <router-link to="/editor">
              Timeline Editor
              <span class="material-icons">playlist_play</span>
            </router-link>
            <router-link to="/editor/json">
              JSON Data
              <span class="material-icons">code</span>
            </router-link>
          </div>
          <router-view class="slotContent" />
        </div>
      </template>
      <template v-slot:2>
        <div class="splitSlot">
          <div id="previewHeader" class="subHeader">
            <div style="display: inline-block;">
              Animation
              <span class="material-icons">movie</span>
            </div>
          </div>
          <PreviewArea class="slotContent" />
        </div>
      </template>
    </split-panel>
    <div id="errorMsg" v-if="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SplitPanel from "../components/SplitPanel.vue";
import PreviewArea from "../components/PreviewArea.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    SplitPanel,
    PreviewArea,
  },
  computed: {
    errorMsg() {
      return useStore().state.errorMsg;
    },
  },
  mounted() {
    // Add editor-page class to content container
    const contentEl = document.querySelector('.content');
    if (contentEl) {
      contentEl.classList.add('editor-page');
    }
  },
  beforeUnmount() {
    // Remove editor-page class when leaving
    const contentEl = document.querySelector('.content');
    if (contentEl) {
      contentEl.classList.remove('editor-page');
    }
  },
});
</script>

<style scoped>
#editorMain {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
}

.splitSlot {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  position: absolute;
}

.split-panel-part {
  position: relative;
}

.slotContent {
  flex: 1 1 auto;
}

/* Error message */
#errorMsg {
  position: absolute;
  bottom: 10px;
  left: 10%;
  right: 10%;
  background-color: #222;
  color: #fff;
  text-align: left;
  padding: 10px;
  z-index: 100;
}

/* Modern Sub headers */
.subHeader {
  flex: 0 1 auto;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid var(--gray-200);
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.subHeader .material-icons {
  vertical-align: -4px;
  margin-left: 0.5rem;
  font-size: 1.25rem;
  opacity: 0.7;
}

.subHeader div {
  display: inline-flex;
  align-items: center;
  color: var(--gray-700);
  font-size: 1rem;
}

.subHeader a {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: 1.5rem;
  padding: 0.5rem 1rem;
  color: var(--gray-600);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  background-color: transparent;
  border: 1px solid transparent;
}

.subHeader a:hover {
  color: var(--primary-color);
  background-color: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
  transform: translateY(-1px);
}

.subHeader a:active {
  transform: translateY(0);
}

.subHeader a.router-link-exact-active {
  color: var(--primary-color);
  background-color: white;
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
  font-weight: 600;
}

.subHeader a.router-link-exact-active .material-icons {
  opacity: 1;
}
</style>
