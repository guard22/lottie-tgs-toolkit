<template>
  <div id="app">
    <Header id="header" />
    <router-view class="content" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
  },
});
</script>

<style>
:root {
  --primary-color: #6366f1;
  --primary-color-hover: #4f46e5;
  --primary-color-light: #a5b4fc;
  --primary-light: #e0e7ff;
  --primary-color-dark: #3730a3;

  --secondary-color: #f59e0b;
  --secondary-color-hover: #d97706;
  --secondary-color-light: #fbbf24;

  --success-color: #10b981;
  --success-color-light: #34d399;
  --error-color: #ef4444;
  --error-color-light: #f87171;
  --warning-color: #f59e0b;

  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  --border-radius: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background-color: #ffffff;
  color: var(--gray-900);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#header {
  flex: 0 0 auto;
}

.content {
  flex: 1 1 auto;
  padding: 2rem 1rem;
}

/* Special styling for editor page - no padding, full height */
.content:has(#editorMain) {
  padding: 0;
  height: calc(100vh - 80px); /* Subtract header height */
}

/* Fallback for browsers that don't support :has() */
.editor-page {
  padding: 0 !important;
  height: calc(100vh - 80px) !important;
}

/* Modern Button Styles */
.text-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem;
  border-radius: var(--border-radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  background-color: white;
  color: var(--gray-700);
  border-color: var(--gray-300);
  box-shadow: var(--shadow-sm);
}

.text-button:hover {
  background-color: var(--gray-50);
  border-color: var(--gray-400);
  box-shadow: var(--shadow);
  transform: translateY(-1px);
}

.text-button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.text-button.primary {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.text-button.primary:hover {
  background-color: var(--primary-color-hover);
  border-color: var(--primary-color-hover);
}

.text-button.secondary {
  background-color: var(--secondary-color);
  color: white;
  border-color: var(--secondary-color);
}

.text-button.secondary:hover {
  background-color: var(--secondary-color-hover);
  border-color: var(--secondary-color-hover);
}

.text-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.text-button:disabled:hover {
  background-color: var(--gray-100);
  border-color: var(--gray-300);
  box-shadow: var(--shadow-sm);
  transform: none;
}

.text-button.primary:disabled:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

/* Header Button Styles */
.white-button {
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.5rem;
  border-radius: var(--border-radius);
}

.white-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.white-button:active {
  transform: translateY(0);
}

/* Card Styles */
.card {
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-200);
  overflow: hidden;
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  background-color: var(--gray-50);
}

.card-body {
  padding: 1.5rem;
}

/* Typography */
h1 {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  color: var(--gray-900);
}

h2 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--gray-800);
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--gray-800);
}

p {
  color: var(--gray-600);
  margin: 0 0 1rem 0;
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mt-8 {
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    padding: 1rem 0.5rem;
  }
  
  h1 {
    font-size: 1.875rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}
</style>
