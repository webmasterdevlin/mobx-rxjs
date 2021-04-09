export type AntiHeroStateType = {
  antiHeroes: AntiHeroModel[];
  antiHero: AntiHeroModel;
  loading: boolean;
};

export type AntiHeroModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type AntiHeroActionType = {
  /*non-asynchronous*/
  softDeleteAntiHeroAction: (antiHero: AntiHeroModel) => void;

  /*computed or derived values*/
  totalAntiHeroesCount: () => number;

  /*asynchronous*/
  getAntiHeroesAction: () => void;
  postAntiHeroAction: (antiHero: AntiHeroModel) => void;
  deleteAntiHeroAction: (id: string) => void;
};

export type AntiHeroStoreSchema = {} & AntiHeroStateType & AntiHeroActionType;
