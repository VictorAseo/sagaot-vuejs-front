export type PasswordFieldProps = {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  status: boolean;
  feedback: string;
  validations: Array<Function>;
};

export type PasswordFields = {
  [key: string]: PasswordFieldProps;
  password: PasswordFieldProps;
  retypePassword: PasswordFieldProps;
};
