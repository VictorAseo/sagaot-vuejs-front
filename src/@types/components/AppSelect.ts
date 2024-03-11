export type listOptionProps = {
  id: number;
  label: string;
};

export type AppSelectProps = {
  label: string;
  inputValue: number | null;
  optionList: Array<listOptionProps>;
  position?: "left-bottom" | "right-bottom" | "left-top" | "right-top" | string;
};

export type SelectEmitsProps = {
  (e: "update:inputValue", value: number): number;
};
