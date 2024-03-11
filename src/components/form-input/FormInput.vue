<template>
  <div class="form-input__container">
    <label>{{ inputLabel }}</label>
    <input
      v-if="inputModelLocal === 'input'"
      :class="[{ 'is-invalid': !inputStatus }]"
      :type="inputType"
      :value="inputValue"
      :placeholder="inputPlaceholder"
      @input="updateInputValue"
    />
    <textarea
      v-if="inputModelLocal === 'textarea'"
      rows="5"
      :class="[{ 'is-invalid': !inputStatus }]"
      :type="inputType"
      :value="inputValue"
      :placeholder="inputPlaceholder"
      @input="updateInputValue"
    />
    <span v-if="!inputStatus && !!inputFeedback">{{ inputFeedback }}</span>
  </div><br>
</template>

<script lang="ts" setup>
import { type EmitsProps, type InputProps } from "@/@types/components/FormInput";
import { ref } from "vue";

const {
  inputLabel,
  inputValue,
  inputType,
  inputFeedback,
  inputStatus,
  inputPlaceholder,
  inputModel
} = defineProps<InputProps>();

const inputModelLocal = ref(inputModel || "input");

const emit = defineEmits<EmitsProps>();

const updateInputValue = (e: Event) => {
  emit("update:inputValue", (e.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.form-input__container {
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
  }

  input,
  textarea {
    max-width: 100%;
    min-width: 100%;
    padding: 6px 12px;
    border-radius: 5px;
    background: #fff;
    border: 2px solid #100000;
    height: fit-content;
    color: #212121;
    font-size: 12px;
    line-height: normal;
    font-weight: 600;
    margin-top: 4px;
    outline: none;

    &::placeholder {
      color: #a8a8a8;
    }

    &.is-invalid {
      border-color: #ff6363;
    }
  }

  span {
    color: #ff6363;
    font-size: 9px;
    font-weight: 400;
    margin-top: 4px;
    line-height: normal;
  }
}
</style>
