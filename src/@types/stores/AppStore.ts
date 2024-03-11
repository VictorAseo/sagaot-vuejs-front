export type ModalInfosProps = {
  active: boolean;
  title?: string;
  subtitle?: string;
  text?: string;
  textGreenButton?: string;
  textRedButton?: string;
  timeClose?: number;
  eventGreenButton?: () => void;
  eventRedButton?: () => void;
};
