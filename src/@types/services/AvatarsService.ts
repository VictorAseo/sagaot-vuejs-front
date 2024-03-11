export type AvatarProps = {
  id: number;
  url: string;
  level_req: number;
  selecionado: boolean;
  desbloqueado: boolean;
};

export type GetAvatarsProps = {
  message: string;
  data: AvatarProps[];
};

export type POSTCreateAvatar = {
  message: string;
  data: {
    id: number;
    url: string;
    level_req: number;
  };
};

export type POSTCreateAvatarPayload = {
  url: string;
  level_req: number;
};

export type DELETEAvatarParams = {
  id: number;
};

export type DELETEAvatar = {
  message: string;
};
