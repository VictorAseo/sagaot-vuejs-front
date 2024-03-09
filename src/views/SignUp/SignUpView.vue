<template>
  <main id="register-container">
    <RouterLink to="/SignInView" class="return-icon">
      <span class="material-symbols-outlined">
        keyboard_return
      </span>
    </RouterLink>
    <h1 class="title">
      Cadastro
    </h1>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="form-container"
      hide-required-asterisk
    >
      <el-row>
        <el-form-item>
          <el-col>
            Nome:
            <el-input
              v-model="ruleForm.firstName"
              placeholder="Digite aqui"
              label="Nome"
              prop="firstName"
            />
          </el-col>
        </el-form-item>
        <el-col :xs="24" :sm="24">
          <el-form-item
            label="E-mail"
            prop="email"
          >
            <el-input
              v-model="ruleForm.email"
              placeholder="exemplo@exemplo.com"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24">
          <el-form-item
            label="matricula"
            prop="matricula"
            :key="`matricula-${controlRender}`"
          >
            <el-input
              id="input-matricula"
              placeholder="201986481"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
            <el-form-item label="userType" prop="userType">
              <el-select
                v-model="usertype_ref"
                placeholder="Select"
                size="small"
                style="width: 240px">
                <el-option
                  v-for="item in usertype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item
            label="Senha"
            prop="password"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="•••••••••••"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item
            label="Repita a senha"
            prop="retypePassword"
          >
            <el-input
              v-model="ruleForm.retypePassword"
              type="password"
              placeholder="•••••••••••"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          color="#7FE7C4"
          @click="submitForm(ruleFormRef)"
        >
          Cadastrar
        </el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElRow,
  ElCol,
  ElButton,
  //ElInputNumber,
  ElSelect,
  ElOption,
} from "element-plus";

const ruleFormRef = ref<FormInstance>();
const controlRender: Ref<number> = ref(0);

interface registerForm {
  firstName: string,
  user: string,
  email: string,
  matricula: string,
  password: string,
  retypePassword: string,
  selectedUsertype: string | undefined,
  userTypeOptions: object[],
  flagRegister: boolean
}

const ruleForm: registerForm = reactive({
  firstName: '',
  user: '',
  email: '',
  matricula: '',
  password: '',
  retypePassword: '',
  age: undefined,
  selectedUsertype: undefined,
  userTypeOptions: [],
  flagRegister: false
})

const usertype_ref = ref('')

const usertype = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const validateRequiredField = (rule: any, value: any, callback: any) => {
  if(ruleForm.flagRegister) {
    if(value === '' || value == null) callback(new Error('Campo obrigatório'))
  }
}
// const addListenerOnlyNumber = () => {
//     window.addEventListener('keydown', onlynumber, true)
// }
// const removeListenerOnlyNumber = () => {
//   window.removeEventListener('keydown', onlynumber, true)
// }
const validateEmail = (rule: any, value: any, callback: any) => {
  if(ruleForm.flagRegister) {
    if(value === '') {
      callback(new Error('Campo obrigatório'));
    } else {
      let user: string = value.substring(0, value.indexOf("@"));
      let domain: string = value.substring(value.indexOf("@")+ 1, value.length);
      if((user.length >= 1) &&
        (domain.length >= 3) &&
        (user.search("@") == -1) &&
        (domain.search("@") ==- 1) &&
        (user.search(" ") == -1) &&
        (domain.search(" ") == -1) &&
        (domain.search(".") != -1) &&
        (domain.indexOf(".") >=1)&&
        (domain.lastIndexOf(".") < domain.length - 1)) {
          callback();
      } else {
        callback(new Error('E-mail inválido!'))
      }
    }
  }
}

const validateRetypePassword = (rule: any, value: any, callback: any) => {
  if(ruleForm.flagRegister) {
    if(value === '') {
      callback(new Error('Campo obrigatório'));
    } else {
      ruleFormRef.value?.validateField('retypePassword', () => null)
      if(value !== ruleForm.password && ruleForm.password !== '') {
        callback(new Error('As senhas não são iguais'))
      }
    }
  }
};

const rules = reactive<FormRules>({
  firstName: [
    {
      validator: validateRequiredField,
      trigger: 'change'
    },
  ],
  lastName: [
    {
      validator: validateRequiredField,
      trigger: 'change'
    },
  ],
  user: [
    {
      validator: validateRequiredField,
      trigger: 'change',
    },
  ],
  email: [
    {
      validator: validateEmail,
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: validateRequiredField,
      trigger: 'change',
    },
  ],
  retypePassword: [
    {
      validator: validateRetypePassword,
      trigger: 'change',
    },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  ruleForm.flagRegister = true;
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) formEl.resetFields()
  });
}

</script>

<style lang="scss">
  //.el-input__inner {
  //  width: 100px;
  //  height: 500px;
  //}
</style>