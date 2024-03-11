export type ModulesInProgressProp = {
  id: number;
  name: string;
};

export type ModulesSectionProps = {
  sectionTitle: string;
  moduleInProgressList: Array<ModulesInProgressProp>;
};
