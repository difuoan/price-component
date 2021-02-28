<template>
  <div id="app">
    <TotalComponent />
    <TotalComponent
      title="Some title"
      labelPlaceholder="label placeholder"
      valuePlaceholder="value placeholder"
      :fieldsets="fieldsetToPassDown"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TotalComponent from "@/components/TotalComponent.vue";

export default Vue.extend({
  name: "App",
  components: {
    TotalComponent
  },
  data() {
    return {
      fieldsetToPassDown: [
        {
          label: "Scrap surcharge",
          originalLabel: "Scrap surcharge",
          editingLabel: false,
          hoveringOverFieldset: false,
          editable: true,
          value: "0.42",
          originalValue: 0.42,
          editingValue: false,
          isGhostFieldset: false
        },
        {
          label: "Energy surcharge",
          originalLabel: "Energy surcharge",
          editingLabel: false,
          hoveringOverFieldset: false,
          editable: true,
          value: "0.15",
          originalValue: 0.15,
          editingValue: false,
          isGhostFieldset: false
        }
      ]
    };
  }
});
</script>

<style lang="scss"></style>
