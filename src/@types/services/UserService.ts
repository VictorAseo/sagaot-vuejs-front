export type UserProps = {
  id: number;
  name: string;
  email: string;
  matricula: number;
  typeUser: string;
  is_admin: boolean;
  token: string;
};

export type GetUserProps = {
  message: string;
  data: UserProps;
};

export type GetLoginProps = {
  message: string;
  data: UserProps;
};

export type LoginProps = {
  email: string;
  password: string;
};
//
// export type ChangeAvatarPayload = {
//   id_avatar: number;
// };
//
// export type ChangeAvatarProps = {
//   message: string;
//   data: null;
// };

export type RegisterParams = {
  name: string;
  email: string;
  matricula: number;
  password: string;
  typeUser: number;
  is_admin: boolean;
};

export type PUTChangeInfos = POSTEmailOrLoginError;

export type ChangeInfosPayload = {
  name: string;
  login: string;
  email: string;
};

export type ChangePasswordPayload = {
  senha: string;
};
//
// type RankingProps = {
//   nome: string;
//   user_level: number;
//   user_exp: number;
//   url: string;
//   rank: number;
// };
//
// export type GETRankingProps = {
//   message: string;
//   data: RankingProps[];
// };

export type POSTEmailOrLoginError = {
  name: string;
  email: string;
};


export type POSTEmailOrLoginErrorPayload = {
  login: string;
  email: string;
};
//
// export type GETValidateLifes = {
//   message: string;
//   bloquear: false;
// };

