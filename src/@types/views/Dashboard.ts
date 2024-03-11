export type ModuleProps = {
  id: number;
  name: string;
  description: string;
};

export type ModulesSectionProps = {
  sectionTitle: string;
  modules: ModuleProps[];
};

export type RankingProps = {
  username: string;
  exp: number;
  rank: number;
  image: string;
};

export type RankingListProps = {
  rankingList: RankingProps[];
};
