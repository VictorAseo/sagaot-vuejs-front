<template>
  <div class="login-step-one__container">
    <h1 class="login-step-one__title">Login</h1>
    <div class="horizontal-line"></div>
      <InvalidAlert v-show="hasLoginError">Usuário/E-mail ou senha inválidos</InvalidAlert>
    <div class="login-step-one__form">
      <FormInput
        v-for="[key, loginFields] in Object.entries(fields)"
        :key="key"
        :input-label="loginFields.label"
        :input-value="loginFields.value"
        :input-type="loginFields.type"
        :input-status="loginFields.status"
        :input-feedback="loginFields.feedback"
        :input-placeholder="loginFields.placeholder"
        @update:input-value="(newValue) => (loginFields.value = newValue)"
      />
    </div>
    <div class="login-step-one__redirect-and-button-container">
      <TextButton to="/SignUpView">
        <template #text>Não possui conta? Voltar para </template>
        <template #bold>Cadastro</template>
      </TextButton>
      <AppButton
        class="login-step-one__next-button"
        @click="login"
      >
        Login
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";
import type { UserProps } from "@/@types/services/UserService";
import { loginUserService } from "@/services/user/service";
import { useAppStore } from "@/stores/AppStore";
import { useUserStore } from "@/stores/UserStore";
import FormInput from "@/components/form-input/FormInput.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import TextButton from "@/components/text-button/TextButton.vue";
import InvalidAlert from "@/views/SignIn/components/InvalidAlert.vue";

const hasLoginError = ref(false);

const fields = ref({
  login: {
    label: "Nome ou E-mail",
    value: "",
    type: "text",
    placeholder: "Digite aqui",
    status: true,
    feedback: "",
    validations: []
  },
  password: {
    label: "Senha",
    value: "",
    type: "password",
    placeholder: "********",
    status: true,
    feedback: "",
    validations: []
  }
});

const userStore = useUserStore();
const appStore = useAppStore();
const { handleLoading } = appStore;
const { userData } = storeToRefs(userStore);

const saveUserData = (infos: UserProps | undefined) => {
  if (!infos) return;

  // userData.value = {
  //   id: infos.id,
  //   firstname: infos.nome,
  //   lastname: infos.sobrenome,
  //   username: infos.login,
  //   email: infos.email,
  //   userLevel: infos.user_level,
  //   userExp: infos.user_exp,
  //   userNextLevelExp: infos.user_next_level_exp,
  //   blocked: infos.bloqueado,
  //   lifes: infos.vidas,
  //   avatarId: infos.id_avatar,
  //   avatarSrc: infos.url_avatar,
  //   isAdmin: infos.is_admin,
  //   token: infos.token
  // };

  localStorage.setItem("token", infos.token);
};

const login = async () => {
  // await router.push({name: "DashboardView"})
  const payload = {
    login: fields.value.login.value,
    password: fields.value.password.value
  };

  handleLoading(true);
  try {
    const response = await loginUserService(payload);
//
     if (hasLoginError.value) hasLoginError.value = false;
//
//     saveUserData(response.data);
  } catch (error) {
     console.error(error);
    hasLoginError.value = true;
  } finally {
      handleLoading(false);
  }
};

watch(
  () => userData.value,
  (newValue) => {
    newValue && router.push({ name: "DashboardView" });
  }
);

</script>
<style scoped lang="scss">

.login-step-one__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 85px;
  background: #ffffff;
  border-radius: 6px;
  
  InvalidAlert{
    padding: 9px;
  }
  .horizontal-line {
    width: 913.86px;
    height: 1px;
    margin-top: 21px;
    margin-bottom: 21px;
    background-color: #939393;
  }

  .login-step-one__title {
    color: #000000;
    background: #ffffff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;

  }

  .login-step-one__next-button {
    margin-bottom: 71px;
  }

  .login-step-one__form {
    margin: 12px 0 24px;
    flex-direction: column;

  }

  .login-step-one__redirect-and-button-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background: #ffffff;

  }

  .login-step-one__login-link {
    display: flex;
    margin-top: 16px;

    a {
      text-decoration: none !important;
    }
  }
}

@media (max-width: 550px) {
  .login-step-one__container {
    .login-step-one__form {
      grid-template-columns: 1fr;
    }

    .login-step-one__redirect-and-button-container {
      flex-direction: column-reverse;
      .login-step-one__next-button {
        width: 100%;
      }
    }
  }
}

</style>