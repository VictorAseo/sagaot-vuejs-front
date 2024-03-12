export type RegisterFieldProps = {
  label: string;
  value: string | number | null;
  type: string;
  placeholder: string;
  status: boolean;
  feedback: string;
  validations: Array<Function>;
};

export type RegisterFields = {
  [key: string]: RegisterFieldProps;
  name: RegisterFieldProps;
  email: RegisterFieldProps;
  matricula: RegisterFieldProps;
  password: RegisterFieldProps;
  retypePassword: RegisterFieldProps;
  typeUser: RegisterFieldProps
};
