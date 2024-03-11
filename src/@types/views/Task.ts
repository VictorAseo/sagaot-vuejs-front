export type AnswerProps = {
  answerId: number;
  answerDescription: string;
  taskId: number;
  correct: boolean;
};

export type TaskProps = {
  taskId: number;
  taskName: string;
  taskContent: string;
  taskType: number;
  taskExp: number;
  taskAnswers: AnswerProps[];
};

export type TaskInfosProps = {
  moduleId: number;
  moduleName: string;
  completedPercentage: number;
  task: TaskProps;
};

export type TaskComponentProps = {
  taskInfos: TaskProps;
};

export type TaskCardProps = {
  title?: string;
};
