export type RegisterModuleField = {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  status: boolean;
  feedback: string;
  validations: ((fieldsParams: any, key: string) => boolean)[];
};

export type RegisterModuleFields = {
  [key: string]: RegisterModuleField;
  name: RegisterModuleField;
  description: RegisterModuleField;
};
