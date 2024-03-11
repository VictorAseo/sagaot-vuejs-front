import api from "@/plugins/axios";
import type {
  DELETEAvatar,
  DELETEAvatarParams,
  GetAvatarsProps,
  POSTCreateAvatar,
  POSTCreateAvatarPayload
} from "@/@types/services/AvatarsService";

export const getAvatarsService = async (): Promise<GetAvatarsProps> => {
  try {
    const response = await api.get<GetAvatarsProps>("/avatares");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createAvatarService = async (
  payload: POSTCreateAvatarPayload
): Promise<POSTCreateAvatar> => {
  try {
    const response = await api.post<POSTCreateAvatar>("/avatar", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteAvatarService = async (params: DELETEAvatarParams): Promise<DELETEAvatar> => {
  try {
    const response = await api.delete<DELETEAvatar>(`/avatar?id=${params.id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
