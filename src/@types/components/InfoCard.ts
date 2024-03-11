export type InfoFieldProps = {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  status: boolean;
  feedback: string;
  validations: Array<Function>;
};

export type InfoFields = {
  [key: string]: InfoFieldProps;
  firstname: InfoFieldProps;
  lastname: InfoFieldProps;
  username: InfoFieldProps;
  email: InfoFieldProps;
};
