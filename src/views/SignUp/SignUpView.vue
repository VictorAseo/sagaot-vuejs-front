<template>
  <div class="register-step-one__container">
    <h1 class="register-step-one__title">Cadastro</h1>
    <div class="register-step-one__form">
      <FormInput
        v-for="[key, fieldInfo] in Object.entries(registerFields)"
        :key="key"
        :input-label="fieldInfo.label"
        :input-value="fieldInfo.value"
        :input-type="fieldInfo.type"
        :input-status="fieldInfo.status"
        :input-feedback="fieldInfo.feedback"
        :input-placeholder="fieldInfo.placeholder"
        @update:input-value="(newValue) => (fieldInfo.value = newValue)"
      />
    </div>
    <div class="register-step-one__redirect-and-button-container">
      <TextButton to="/login">
        <template #text>Já possui conta? Voltar para </template>
        <template #bold>Login</template>
      </TextButton>
      <AppButton
        class="register-step-one__next-button"
        @click="goToNextStep"
      >
        Próximo
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";

import { useRegisterStore } from "@/stores/RegisterStore";
import { isEmail } from "@/utils";
import type { RegisterFields } from "@/@types/stores/RegisterStore";

import FormInput from "@/components/form-input/FormInput.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import TextButton from "@/components/text-button/TextButton.vue";
import { hasEspecialCaracter } from "@/utils";
import { getEmailOrLoginErrorService } from "@/services/user/service";
import { useAppStore } from "@/stores/AppStore";

const appStore = useAppStore();
const store = useRegisterStore();
const { handleLoading } = appStore;
const { registerFields } = storeToRefs(store);
const { changeStep } = store;

const checkRequiredField = (registerFieldsParam: RegisterFields, key: string) => {
  const status = !!registerFieldsParam[key].value;
  registerFieldsParam[key].status = status;
  registerFieldsParam[key].feedback = status ? "" : "Campo obrigatório";

  return status;
};

const checkEqualPasswords = (registerFieldsParam: RegisterFields) => {
  if (!registerFieldsParam.password.value || !registerFieldsParam.retypePassword.value) return true;

  const isEqual: boolean =
    registerFieldsParam.password.value === registerFieldsParam.retypePassword.value;

  registerFieldsParam.password.status = isEqual;
  registerFieldsParam.password.feedback = !isEqual ? "As senhas não são iguais" : "";
  registerFieldsParam.retypePassword.status = isEqual;
  registerFieldsParam.retypePassword.feedback = !isEqual ? "As senhas não são iguais" : "";

  return isEqual;
};

const checkEmail = (registerFieldsParam: RegisterFields, key: string) => {
  if (!registerFieldsParam[key].value) return;

  const isValidEmail: boolean = isEmail(registerFieldsParam[key].value);
  registerFieldsParam[key].status = isValidEmail;
  registerFieldsParam[key].feedback = isValidEmail ? "" : "E-mail inválido";

  return isValidEmail;
};

const checkUsername = (registerFieldsParam: RegisterFields, key: string) => {
  if (!registerFieldsParam[key].value) return;

  const isValidUsername: boolean = !hasEspecialCaracter(registerFieldsParam[key].value);
  registerFieldsParam[key].status = isValidUsername;
  registerFieldsParam[key].feedback = isValidUsername
    ? ""
    : "Não utilize caracteres espcecias. Ex: !,@,#, etc...";

  return isValidUsername;
};

const validateFields = () => {
  let isValid = true;
  for (const key in registerFields.value) {
    for (const action of registerFields.value[key].validations) {
      let validation = action(registerFields.value, key);
      isValid = isValid && !validation ? false : isValid;
    }
  }

  return isValid;
};

const validateLoginAndEmail = async () => {
  const payload = {
    email: registerFields.value.email.value.toLowerCase(),
    login: registerFields.value.username.value.toLowerCase()
  };

  handleLoading(true);

  try {
    const response = await getEmailOrLoginErrorService(payload);
    if (registerFields.value.username.status) {
      registerFields.value.username.status = !response.login;
      registerFields.value.username.feedback = response.login;
    }

    if (registerFields.value.email.status) {
      registerFields.value.email.status = !response.email;
      registerFields.value.email.feedback = response.email;
    }

    return !response.email && !response.login;
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const goToNextStep = async () => {
  const isValid = validateFields();
  const isEmailAndLoginValid = await validateLoginAndEmail();

  if (!isValid || !isEmailAndLoginValid) return;

  changeStep(2);
};

const fields = {
  firstname: {
    label: "Nome",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  lastname: {
    label: "Sobrenome",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  username: {
    label: "Nome de usuário",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField, checkUsername]
  },
  email: {
    label: "E-mail",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField, checkEmail]
  },
  password: {
    label: "Senha",
    value: "",
    type: "password",
    placeholder: "********",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
  },
  retypePassword: {
    label: "Repita a senha",
    value: "",
    type: "password",
    placeholder: "********",
    status: true,
    feedback: "",
    validations: [checkRequiredField, checkEqualPasswords]
  }
};

registerFields.value =
  Object.keys(registerFields.value).length === 0 ? { ...fields } : registerFields.value;
</script>

<style lang="scss" scoped>
.register-step-one__container {
  width: 100%;
  display: flex;
  flex-direction: column;

  .register-step-one__title {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 12px;
  }

  .register-step-one__form {
    margin: 12px 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .register-step-one__redirect-and-button-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .register-step-one__next-button {
      margin: auto 0 0 auto;
      height: fit-content;
    }
  }
  .register-step-one__register-link {
    display: flex;
    margin-top: 16px;
    justify-content: center;

    a {
      text-decoration: none !important;
    }
  }
}

@media (max-width: 550px) {
  .register-step-one__container {
    .register-step-one__form {
      grid-template-columns: 1fr;
    }

    .register-step-one__redirect-and-button-container {
      flex-direction: column-reverse;
      .register-step-one__next-button {
        width: 100%;
      }
    }
  }
}
</style>