export type GETTaskParams = {
  taskId: string;
};

export type GETTasksParams = {
  moduleId: string;
};

type AnswerProps = {
  id: number;
  descricao: string;
  id_tarefa: number;
};

type TaskProps = {
  id: number;
  nome: string;
  conteudo: string;
  tipo: number;
  respostas: AnswerProps[];
};

export type GETTask = {
  message: string;
  data: {
    id_modulo: number;
    nome_modulo: string;
    perc_completo: number;
    tarefa: TaskProps;
  };
};

export type GETTasks = {
  message: string;
  data: {
    id: number;
    nome: string;
    conteudo: string;
    tipo: number;
    id_modulo: number;
    tarefa_exp: number;
    respostas: ({ resposta_correta: boolean } & AnswerProps)[];
  }[];
};

export type POSTAnswerQuestionParams = {
  answerId: string;
  taskId: string;
};

type AnswerResponse = {
  acertou: boolean;
  exp: number;
  subiuNivel: boolean;
  vidas: never;
  resposta: string;
  user_level: number;
};

export type POSTAnswerQuestion = {
  message: string;
  data: AnswerResponse;
};

export type POSTCreateTask = {
  message: string;
};

type answerProps = {
  descricao: string;
};

export type POSTCreateTaskPayload = {
  nome: string;
  conteudo: string;
  tipo: number;
  tarefa_exp: number;
  id_modulo: number | null;
  index_resp: number;
  respostas: answerProps[];
};

export type PUTCreateTask = POSTCreateTask;

export type PUTCreateTaskPayload = { id: number } & POSTCreateTaskPayload;

export type DELETETask = {
  message: string;
};

export type DELETETaskParams = {
  id: number;
};
