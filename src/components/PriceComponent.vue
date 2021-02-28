<template>
  <div
    :class="`form-row mb-2 ${ghostFieldsetClass}`"
    :key="`priceComponent_field_${index}`"
    @mouseenter="mouseEnterOnFieldset()"
    @mouseleave="mouseLeaveOnFieldset()"
  >
    <div class="col col-sm-4">
      <input
        v-if="editingFieldsetLabel() === true"
        type="text"
        class="form-control position-relative"
        :placeholder="labelPlaceholder"
        :value="fieldset.originalLabel"
        @blur="stopEditingFieldsetLabel()"
        @change="setFieldsetLabelValue($event.target.value)"
        maxlength="50"
        ref="fieldsetLabelInput"
      />
      <label
        class="d-block overflow-ellipsis pr-4 mt-2"
        v-else
        :title="fieldset.originalLabel"
      >
        <span>{{ fieldset.label }}</span>
        <transition name="fade" v-if="hasEditButton() === true">
          <BIconPencil
            v-show="showEditButton() === true"
            class="position-absolute right-2 mt-1 cursor-pointer"
            title="edit label"
            @click="activateFieldsetLabelInput()"
          />
        </transition>
      </label>
    </div>
    <div class="col col-sm-8">
      <div class="input-group">
        <input
          :type="getCurrentlyDisplayedFieldsetType()"
          class="form-control"
          min="0"
          step="0.1"
          :placeholder="valuePlaceholder"
          :value="getCurrentlyDisplayedFieldsetValue()"
          :title="fieldset.originalValue"
          @input="setFieldsetValue($event.target.value)"
          @focus="startEditingFieldset()"
          @blur="stopEditingFieldset()"
          @change="addNewFieldset()"
        />
        <div
          class="input-group-append cursor-pointer"
          v-if="showingDeleteButton() === true"
          @click="deleteFieldset()"
          title="delete fieldset"
        >
          <span class="input-group-text">&times;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { BIconPencil } from "bootstrap-vue";
import { commonMethods } from "@/mixins/methods.ts";
import "@/mixins/interfaces.ts";

export default (Vue as VueConstructor<
  Vue & {
    $refs: {
      fieldsetLabelInput: Array<HTMLInputElement>;
    };
  }
>).extend({
  name: "PriceComponent",
  components: { BIconPencil },
  props: {
    fieldset: {
      type: Object as () => Fieldset,
      required: true
    },
    index: {
      type: Number,
      required: true
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
    }
  },
  computed: {
    ghostFieldsetClass(): string {
      if (this.fieldset.isGhostFieldset === true) {
        if (
          this.fieldset.editingLabel === false &&
          this.fieldset.editingValue === false
        ) {
          return "opacity-50";
        }
      }
      return "";
    }
  },
  methods: {
    ...commonMethods,
    showingDeleteButton(): boolean {
      if (
        this.fieldset.editable === true &&
        this.fieldset.hoveringOverFieldset === true
      ) {
        return true;
      } else {
        return false;
      }
    },
    startEditingFieldset(): void {
      this.fieldset.editingValue = true;
    },
    stopEditingFieldset(): void {
      this.fieldset.editingValue = false;
    },
    showEditButton(): boolean {
      return this.fieldset.hoveringOverFieldset === true;
    },
    hasEditButton(): boolean {
      return this.fieldset.editable === true;
    },
    mouseEnterOnFieldset(): void {
      this.fieldset.hoveringOverFieldset = true;
    },
    editingFieldsetLabel(): boolean {
      if (
        this.fieldset.editingLabel === true ||
        this.fieldset.isGhostFieldset === true
      ) {
        return true;
      } else {
        return false;
      }
    },
    mouseLeaveOnFieldset(): void {
      if (this.fieldset.editingLabel === false) {
        this.fieldset.hoveringOverFieldset = false;
      }
    },
    stopEditingFieldsetLabel(): void {
      this.fieldset.editingLabel = false;
      this.fieldset.hoveringOverFieldset = false;
    },
    setFieldsetValue(value: string): void {
      let castValue = parseFloat(value);
      if (value.length === 0) {
        castValue = 0;
      }
      if (castValue >= 0) {
        this.fieldset.originalValue = castValue;
        this.fieldset.value = this.formatFieldsetValue(castValue);
      }
    },
    setFieldsetLabelValue(value: string): void {
      const label = value.trim();
      if (label.length > 0) {
        this.fieldset.originalLabel = value;
        this.fieldset.label = label;
      }
      if (this.fieldset.isGhostFieldset === true) {
        this.addNewFieldset();
      }
    },
    activateFieldsetLabelInput() {
      this.fieldset.editingLabel = true;
      this.$nextTick(() => {
        this.$refs.fieldsetLabelInput[this.index].focus();
      });
    },
    deleteFieldset(): void {
      this.$parent.$data.internalFieldsets.splice(this.index, 1);
    },
    addNewFieldset(): void {
      const fieldsets = this.$parent.$data.internalFieldsets;
      if (
        this.fieldsetInputValuesAreValid() === true &&
        this.fieldset.isGhostFieldset === true
      ) {
        fieldsets.splice(fieldsets.length - 1, 0, {
          label: this.fieldset.label,
          originalLabel: this.fieldset.label,
          editingLabel: false,
          hoveringOverFieldset: false,
          editable: true,
          value: this.formatFieldsetValue(this.fieldset.originalValue),
          originalValue: this.fieldset.originalValue,
          editingValue: false,
          isGhostFieldset: false
        });
        this.fieldset.originalLabel = "";
        this.fieldset.label = "";
        this.fieldset.originalValue = 0;
        this.fieldset.value = "";
        this.fieldset.editingValue = false;
      }
    },
    getCurrentlyDisplayedFieldsetValue(): number | string {
      if (this.fieldset.editingValue === true) {
        return this.fieldset.originalValue;
      } else {
        return this.fieldset.value;
      }
    },
    getCurrentlyDisplayedFieldsetType(): string {
      if (this.fieldset.editingValue === true) {
        return "number";
      } else {
        return "text";
      }
    },
    fieldsetInputValuesAreValid(): boolean {
      const labelIsValid = this.fieldset.label.length > 0;
      const valueIsValid = this.fieldset.originalValue > 0;
      if (labelIsValid === true && valueIsValid === true) {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>

<style lang="scss"></style>
