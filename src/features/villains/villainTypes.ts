export type VillainStateType = {
  villains: VillainModel[];
  villain: VillainModel;
  loading: boolean;
};

export type VillainModel = {
  id: string;
  firstName: string;
  lastName: string;
  house: string;
  knownAs: string;
};

export type VillainActionType = {
  softDeleteVillainAction: (villain: VillainModel) => void;

  /*computed or derived values*/
  totalVillainsCount: () => number;

  getVillainsAction: () => void;
  deleteVillainAction: (id: string) => void;
  postVillainAction: (villain: VillainModel) => void;
};

export type VillainStoreSchema = {} & VillainStateType & VillainActionType;
