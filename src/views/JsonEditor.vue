<template>
  <div id="jsonCodeEditor" />
</template>

<style scoped>
#jsonCodeEditor {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--gray-300);
}

/* Override ACE editor styles */
:deep(.ace_editor) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}

:deep(.ace_gutter) {
  background: var(--gray-100) !important;
  border-right: 1px solid var(--gray-300) !important;
}

:deep(.ace_gutter-active-line) {
  background: var(--primary-light) !important;
}

:deep(.ace_active-line) {
  background: rgba(99, 102, 241, 0.05) !important;
}

:deep(.ace_cursor) {
  color: var(--primary-color) !important;
}

:deep(.ace_selection) {
  background: rgba(99, 102, 241, 0.2) !important;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import * as ace from "ace-builds";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import { useStore } from "vuex";
import { MutationTypes } from "../store/store";

// Configure paths for ACE workers
ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/');
ace.config.set('modePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/');
ace.config.set('themePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/');
ace.config.set('workerPath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/');

// Disable workers - will be applied when creating editor

let editor: ace.Ace.Editor;

export default defineComponent({
  mounted() {
    const store = useStore();

    editor = ace.edit("jsonCodeEditor");
    editor.setTheme("ace/theme/xcode");
    editor.setShowPrintMargin(false);
    editor.setOption("dragEnabled", false);
    editor.session.setMode("ace/mode/json");
    editor.session.setTabSize(4);
    
    // Disable workers to avoid loading errors
    editor.session.setUseWorker(false);

    // Set value
    editor.setValue(JSON.stringify(store.state.animData, null, 4));
    editor.gotoLine(0);

    // Commit changes
    editor.on("change", function () {
      const content = editor.getValue();
      store.commit(MutationTypes.PARSE_AND_SET_ANIM_DATA, content);
    });
  },
  beforeUnmount: function () {
    editor.destroy();
    editor.container.remove();
  },
});
</script>