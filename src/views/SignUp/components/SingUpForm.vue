<template>
  <div class="register-step-one__container">
    <h1 class="register-step-one__title">Cadastro</h1>
    <div class="horizontal-line"></div>
    <div class="register-step-one__form">
      <FormInput
        :input-label="registerFields.name.label"
        :input-value="registerFields.name.value"
        :input-type="registerFields.name.type"
        :input-status="registerFields.name.status"
        :input-feedback="registerFields.name.feedback"
        :input-placeholder="registerFields.name.placeholder"
        @update:input-value="(newValue) => (registerFields.name.value = newValue)"
      />
      <FormInput
        :input-label="registerFields.email.label"
        :input-value="registerFields.email.value"
        :input-type="registerFields.email.type"
        :input-status="registerFields.email.status"
        :input-feedback="registerFields.email.feedback"
        :input-placeholder="registerFields.email.placeholder"
        @update:input-value="(newValue) => (registerFields.email.value = newValue)"
      />
      <FormInput
        :input-label="registerFields.matricula.label"
        :input-value="registerFields.matricula.value"
        :input-type="registerFields.matricula.type"
        :input-status="registerFields.matricula.status"
        :input-feedback="registerFields.matricula.feedback"
        :input-placeholder="registerFields.matricula.placeholder"
        @update:input-value="(newValue) => (registerFields.matricula.value = newValue)"
      />
      <FormInput
        :input-label="registerFields.password.label"
        :input-value="registerFields.password.value"
        :input-type="registerFields.password.type"
        :input-status="registerFields.password.status"
        :input-feedback="registerFields.password.feedback"
        :input-placeholder="registerFields.password.placeholder"
        @update:input-value="(newValue) => (registerFields.password.value = newValue)"
      />
      <FormInput
        :input-label="registerFields.retypePassword.label"
        :input-value="registerFields.retypePassword.value"
        :input-type="registerFields.retypePassword.type"
        :input-status="registerFields.retypePassword.status"
        :input-feedback="registerFields.retypePassword.feedback"
        :input-placeholder="registerFields.retypePassword.placeholder"
        @update:input-value="(newValue) => (registerFields.retypePassword.value = newValue)"
      />
      <Formselect
          :input-value="registerFields.typeUser.value"
          :input-status="registerFields.typeUser.status"
          :input-feedback="registerFields.typeUser.feedback"
          :input-placeholder="registerFields.typeUser.placeholder"
          :option-list="usertypeOptions"
          :label="registerFields.typeUser.label"
          @update:input-value="(newValue) => (registerFields.typeUser.value = newValue)"
      />
    </div>

    <div class="register-step-one__redirect-and-button-container">
      <TextButton to="/SignInView">
        <template #text>Já possui conta? Voltar para </template>
        <template #bold>Login</template>
      </TextButton>
      <AppButton
        class="register-step-one__next-button"
        @click="goToNextStep"
      >
        Cadastrar
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormInput from "@/components/form-input/FormInput.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import TextButton from "@/components/text-button/TextButton.vue";
import Formselect from "@/components/app-select/AppSelect.vue";
import { storeToRefs } from "pinia";
import { useRegisterStore } from "@/stores/RegisterStore";
import { isEmail } from "@/utils";
import type { RegisterFields } from "@/@types/stores/RegisterStore";
import { hasEspecialCaracter } from "@/utils";
import { getEmailOrLoginErrorService } from "@/services/user/service";
import { useAppStore } from "@/stores/AppStore";
import { ref } from "vue";
import type {InputProps, EmitsProps} from "@/@types/components/FormInput";


const usertypeOptions = ref( [{id: 0, label: 'Aluno'}, {id: 1, label: 'Professor'},
  {id: 2, label: 'Avaliador'}]);
const selectedUsertype = ref(null);

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

  const isValidEmail: boolean = isEmail(registerFieldsParam[key].value?.toString() || '');
  registerFieldsParam[key].status = isValidEmail;
  registerFieldsParam[key].feedback = isValidEmail ? "" : "E-mail inválido";

  return isValidEmail;
};

const checkUsername = (registerFieldsParam: RegisterFields, key: string) => {
  if (!registerFieldsParam[key].value) return;

  const isValidUsername: boolean = !hasEspecialCaracter(registerFieldsParam[key].value?.toString() || '');
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
  // const payload = {
  //   email: registerFields.value.email.value?.toString().toLowerCase(),
  //   login: registerFields.value.username.value?.toString().toLowerCase()
  // };
  //
  // handleLoading(true);
  //
  // try {
  //   const response = await getEmailOrLoginErrorService(payload);
  //   if (registerFields.value.username.status) {
  //     registerFields.value.username.status = !response.login;
  //     registerFields.value.username.feedback = response.login;
  //   }
  //
  //   if (registerFields.value.email.status) {
  //     registerFields.value.email.status = !response.email;
  //     registerFields.value.email.feedback = response.email;
  //   }
  //
  //   return !response.email && !response.login;
  // } catch (error) {
  //   console.error(error);
  // } finally {
  //   handleLoading(false);
  // }
};

const goToNextStep = async () => {
  const isValid = validateFields();
  // const isEmailAndLoginValid = await validateLoginAndEmail();

  if (!isValid) return; //if (!isValid || !isEmailAndLoginValid) return;

  changeStep(2);
};

const fields = {
  name: {
    label: "Nome",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
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
  matricula: {
    label: "Matricula",
    value: "",
    type: "number",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
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
    label: "Confirme a senha",
    value: "",
    type: "password",
    placeholder: "********",
    status: true,
    feedback: "",
    validations: [checkRequiredField, checkEqualPasswords]
  },
  typeUser: {
    label: "Tipo de usuário",
    value: null, //
    type: "",
    placeholder: "Selecione o tipo de usuário!",
    status: true,
    feedback: "",
    validations: [checkRequiredField]
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
  align-items: center;
  margin-top: 85px;
  background: #ffffff;
  border-radius: 6px;

  .horizontal-line {
    width: 913.86px;
    height: 1px;
    margin-top: 21px;
    margin-bottom: 21px;
    background-color: #939393;
  }

  .register-step-one__title {
    color: #000000;
    background: #ffffff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;

  }

  .register-step-one__next-button {
    margin-bottom: 71px;
  }

  .register-step-one__form {
    margin: 12px 0 24px;
    flex-direction: column;

  }

  .register-step-one__redirect-and-button-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background: #ffffff;

  }

  .register-step-one__register-link {
    display: flex;
    margin-top: 16px;

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