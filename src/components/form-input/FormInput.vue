<template>
  <div class="form-input__container">
    <label>{{ inputLabel }}</label><br>
    <input
      v-if="inputModelLocal === 'input'"
      :class="[{ 'is-invalid': !inputStatus }]"
      :type="inputType"
      :value="inputValue"
      :placeholder="inputPlaceholder"
      @input="updateInputValue"
      style="height: 37px; width: 516px; margin-top: 9px; margin-bottom: 9px"
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
    <span class="inputFeedback_Status" v-if="!inputStatus && !!inputFeedback">{{ inputFeedback }}</span>
  </div>
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
  background: #ffffff;

  label {
    color: #000000;
    background: #ffffff;
    font-size: 12px;
    font-weight: 400;

  }

  .inputFeedback_Status{
    padding-left: 5px;
  }

  input,
  textarea {
    width: 1000px;
    max-height: 1231231px;
    padding: 6px 12px;
    border-radius: 5px;
    background-color: rgba(205, 205, 205, 0.1);
    border: 2px solid rgb(205, 205, 205);
    height: fit-content;
    color: #212121;
    font-size: 12px;
    line-height: normal;
    font-weight: 600;
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
    background: #ffffff;
    font-size: 9px;
    font-weight: 400;
    margin-top: 4px;
  }
}
</style>
