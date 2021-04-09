export type HeroStateType = {
  heroes: HeroModel[];
  hero: HeroModel;
  loading: boolean;
};

export type HeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type HeroActionType = {
  softDeleteHeroAction: (hero: HeroModel) => void;

  /*computed or derived values*/
  totalHeroesCount: () => number;

  getHeroesAction: () => void;
  deleteHeroAction: (id: string) => void;
  postHeroAction: (hero: HeroModel) => void;
};

export type HeroStoreSchema = {} & HeroStateType & HeroActionType;
