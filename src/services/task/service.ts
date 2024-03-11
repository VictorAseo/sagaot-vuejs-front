import api from "@/plugins/axios";
import type {
  DELETETask,
  DELETETaskParams,
  GETTask,
  GETTaskParams,
  GETTasks,
  GETTasksParams,
  POSTAnswerQuestion,
  POSTAnswerQuestionParams,
  POSTCreateTask,
  POSTCreateTaskPayload,
  PUTCreateTask,
  PUTCreateTaskPayload
} from "@/@types/services/TaskService";

export const getTaskService = async (params: GETTaskParams): Promise<GETTask> => {
  try {
    const response = await api.get<GETTask>(`/tarefa?id=${params.taskId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTasksService = async (params: GETTasksParams): Promise<GETTasks> => {
  try {
    const response = await api.get<GETTasks>(`/tarefas?id_modulo=${params.moduleId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const answerQuestionService = async (
  params: POSTAnswerQuestionParams
): Promise<POSTAnswerQuestion> => {
  try {
    const response = await api.post<POSTAnswerQuestion>(
      `/resposta/enviar?idResposta=${params.answerId}&idTarefa=${params.taskId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createTaskService = async (
  payload: POSTCreateTaskPayload
): Promise<POSTCreateTask> => {
  try {
    const response = await api.post<POSTCreateTask>(`/tarefa`, payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editTaskService = async (payload: PUTCreateTaskPayload): Promise<PUTCreateTask> => {
  try {
    const response = await api.put<PUTCreateTask>(`/tarefa`, payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTaskService = async (params: DELETETaskParams): Promise<DELETETask> => {
  try {
    const response = await api.delete<DELETETask>(`/tarefa?id=${params.id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
