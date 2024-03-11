export type RegisterFieldProps = {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  status: boolean;
  feedback: string;
  validations: Array<Function>;
};

export type RegisterFields = {
  [key: string]: RegisterFieldProps;
  firstname: RegisterFieldProps;
  lastname: RegisterFieldProps;
  username: RegisterFieldProps;
  email: RegisterFieldProps;
  password: RegisterFieldProps;
  retypePassword: RegisterFieldProps;
};
