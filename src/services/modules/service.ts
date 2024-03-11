import api from "@/plugins/axios";
import type {
  DELETEModule,
  DELETEModuleParams,
  GETInitializedModules,
  GETAllModules,
  GETModuleTasks,
  GETModuleTasksParams,
  GETModules,
  POSTModules,
  POSTModulesPayload,
  PUTModules,
  PUTModulesPayload
} from "@/@types/services/ModulesService";

export const getInitializedModulesService = async (): Promise<GETInitializedModules> => {
  try {
    const response = await api.get<GETInitializedModules>("/modulos-iniciados");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModulesService = async (): Promise<GETModules> => {
  try {
    const response = await api.get<GETModules>("/modulos");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllModulesService = async (): Promise<GETAllModules> => {
  try {
    const response = await api.get<GETAllModules>("/modulos-curso");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getModuleTasksService = async (
  params: GETModuleTasksParams
): Promise<GETModuleTasks> => {
  try {
    const response = await api.get<GETModuleTasks>(`/modulo-tarefas?id_module=${params.id_module}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createModulesService = async (payload: POSTModulesPayload) => {
  try {
    const response = await api.post<POSTModules>("/modulo", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteModuleService = async (params: DELETEModuleParams) => {
  try {
    const response = await api.delete<DELETEModule>(`/modulo?id=${params.id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editModulesService = async (payload: PUTModulesPayload) => {
  try {
    const response = await api.put<PUTModules>("/modulo", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
