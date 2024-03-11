type Module = {
  id: number;
  nome: string;
  descricao: string;
};

type AllModules = {
  modulos_disponiveis: Module[];
  modulos_em_andamento: Module[];
  modulos_finalizados: Module[];
};

export type POSTCreateModule = {
  message: string;
  data: Module;
};

export type GETModules = {
  message: string;
  data: Module[];
};

export type GETAllModules = {
  message: string;
  data: AllModules;
};

export type GETInitializedModules = GETModules;

type TaskProps = {
  id: number;
  nome: string;
  conteudo: string;
  tipo: number;
  tarefa_exp: number;
  id_modulo: number;
  completo: boolean;
};

export type GETModuleTasks = {
  message: string;
  data: {
    id_modulo: number;
    nome_modulo: string;
    perc_completo: number;
    tarefas: TaskProps[];
  };
};

export type GETModuleTasksParams = {
  id_module: string;
};

export type POSTModules = {
  message: string;
  data: {
    id: number;
    nome: string;
    descricao: string;
  };
};

export type POSTModulesPayload = {
  nome: string;
  descricao: string;
};

export type DELETEModuleParams = {
  id: number;
};

export type DELETEModule = {
  message: string;
};

export type PUTModules = {
  message: string;
};

export type PUTModulesPayload = { id: number } & POSTModulesPayload;
