export type answerProps = {
  value: string;
  type?: string;
  placeholder?: string;
  valid?: boolean;
  feedback?: string;
};

export type RegisterActivitiesFieldsProps = {
  [key: string]: any;
  type: number;
  name: {
    label: string;
    value: string;
    type: string;
    placeholder: string;
  };
  exp: {
    label: string;
    value: number;
    type: string;
    placeholder: string;
  };
  content: {
    label: string;
    value: string;
    type: string;
    placeholder: string;
  };
  answers: answerProps[];
  correctAnswerIndex: number;
};