import api from "@/plugins/axios";

import type {
  ChangeAvatarPayload,
  ChangeAvatarProps,
  ChangeInfosPayload,
  ChangePasswordPayload,
  POSTEmailOrLoginError,
  POSTEmailOrLoginErrorPayload,
  GETRankingProps,
  GetLoginProps,
  LoginProps,
  RegisterParams,
  GETValidateLifes,
  UserProps, PUTChangeInfos
} from "@/@types/services/UserService";

import { useAppStore } from "@/stores/AppStore";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import type {UnwrapRef} from "vue";
import type {RegisterFieldProps} from "@/@types/stores/RegisterStore";

export const loginUserService = async (payload: {
  senha: UnwrapRef<RegisterFieldProps> | UnwrapRef<UnwrapRef<RegisterFieldProps>>;
  login: UnwrapRef<RegisterFieldProps> | UnwrapRef<UnwrapRef<RegisterFieldProps>>
}): Promise<GetLoginProps> => {
  try {
    const response = await api.post<GetLoginProps>("/usuario/login", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUserService = async (payload: {
  password: UnwrapRef<RegisterFieldProps> | UnwrapRef<UnwrapRef<RegisterFieldProps>>;
  typeUser: UnwrapRef<RegisterFieldProps> | UnwrapRef<UnwrapRef<RegisterFieldProps>>;
  name: UnwrapRef<RegisterFieldProps> | UnwrapRef<UnwrapRef<RegisterFieldProps>>;
  matricula: UnwrapRef<RegisterFieldProps> | UnwrapRef<UnwrapRef<RegisterFieldProps>>;
  isAdmin: boolean;
  email: UnwrapRef<RegisterFieldProps> | UnwrapRef<UnwrapRef<RegisterFieldProps>>
}) => {
  try {
    const response = await api.post("/usuario", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserService = async (): Promise<GetLoginProps> => {
  try {
    const response = await api.get<GetLoginProps>("/usuario");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeAvatarUserService = async (
  payload: ChangeAvatarPayload
): Promise<ChangeAvatarProps> => {
  try {
    const response = await api.put<ChangeAvatarProps>("usuario/trocar-avatar", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeUserInfosService = async (payload: ChangeInfosPayload): Promise<PUTChangeInfos> => {
  try {
    const response = await api.put<PUTChangeInfos>("usuario/trocar-dados", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeUserPasswordService = async (payload: ChangePasswordPayload): Promise<void> => {
  try {
    const response = await api.put<void>("usuario/trocar-senha", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRankingService = async (): Promise<GETRankingProps> => {
  try {
    const response = await api.get<GETRankingProps>("usuario/ranking");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getEmailOrLoginErrorService = async (
  payload: POSTEmailOrLoginErrorPayload
): Promise<POSTEmailOrLoginError> => {
  try {
    const response = await api.post<POSTEmailOrLoginError>("verificar-dados", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const validateLifesService = async (): Promise<GETValidateLifes> => {
  try {
    const response = await api.get<GETValidateLifes>("/usuario/verificar-vida");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveUserData = (infos: UserProps | undefined) => {
  if (!infos) return;
  const userStore = useUserStore();
  const { userData } = storeToRefs(userStore);

  userData.value = {
      id: infos.id,
      name: infos.name,
      email: infos.email,
      matricula: infos.matricula,
      typeUser: infos.typeUser,
      isAdmin: infos.is_admin,
      token: infos.token
  };

  localStorage.setItem("token", infos.token);
};

export const getUser = async () => {
  const appStore = useAppStore();
  const { handleLoading } = appStore;

  handleLoading(true);
  try {
    const response = await getUserService();
    saveUserData(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};
