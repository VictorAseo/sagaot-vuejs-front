export type listOptionProps = {
  label: string;
  event: () => void;
};

export type AppDropdownProps = {
  optionList: Array<listOptionProps>;
  position?: "left-bottom" | "right-bottom" | "left-top" | "right-top" | string;
};
