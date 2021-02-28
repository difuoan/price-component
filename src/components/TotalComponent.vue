<template>
  <div class="priceComponent border rounded m-4">
    <h3>{{ title }}</h3>
    <div class="text-right mb-3">
      <h4>
        <b>Total:</b>&nbsp;<span>{{ total }} EUR/KG</span>
      </h4>
    </div>
    <form>
      <PriceComponent
        class="form-row mb-2"
        v-for="(fieldset, index) in internalFieldsets"
        :key="`priceComponent_field_${index}`"
        :fieldset="fieldset"
        :index="index"
        :labelPlaceholder="labelPlaceholder"
        :valuePlaceholder="valuePlaceholder"
      />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PriceComponent from "@/components/PriceComponent.vue";
import { commonMethods } from "@/mixins/methods.ts";
import "@/mixins/interfaces.ts";

export default Vue.extend({
  name: "TotalComponent",
  components: { PriceComponent },
  props: {
    title: {
      type: String,
      required: false,
      default: "Price Components"
    },
    labelPlaceholder: {
      type: String,
      required: false,
      default: "Label"
    },
    valuePlaceholder: {
      type: String,
      required: false,
      default: "value"
    },
    fieldsets: {
      type: Array as () => Array<Fieldset>,
      required: false,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      internalFieldsets: [
        {
          label: "Baseprice",
          originalLabel: "Baseprice",
          editingLabel: false,
          hoveringOverFieldset: false,
          editable: false,
          value: "1.00",
          originalValue: 1,
          editingValue: false,
          isGhostFieldset: false
        }
      ]
        .concat(this.$props.fieldsets as Array<Fieldset>)
        .concat([
          {
            label: "",
            originalLabel: "",
            editingLabel: false,
            hoveringOverFieldset: false,
            editable: false,
            value: "",
            originalValue: 0,
            editingValue: false,
            isGhostFieldset: true
          }
        ])
    };
  },
  methods: {
    ...commonMethods
  },
  computed: {
    total(): string {
      let total = 0;
      this.internalFieldsets.forEach(fieldset => {
        if (fieldset.isGhostFieldset === false) {
          total = total + fieldset.originalValue;
        }
      });
      return this.formatFieldsetValue(total);
    }
  }
});
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/_functions.scss";
@import "../assets/scss/variables.scss";
.priceComponent {
  position: relative;
  padding: ($spacer * 0.75) $spacer;
  h3 {
    background: $white;
    padding: $spacer / 2;
    display: inline-block;
    font-size: $font-size-base * 1.5;
    position: absolute;
    top: -($spacer * 1.5);
  }
  h4 {
    b {
      font-size: $font-size-base * 1.5;
    }
    span {
      font-size: $font-size-base * 1.25;
    }
  }
}
</style>
