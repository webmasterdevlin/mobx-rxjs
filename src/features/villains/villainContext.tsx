import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { catchError, map } from "rxjs/operators";

import { EndPoints } from "../../axios/api-config";
import { VillainModel, VillainStateType } from "./villainTypes";
import { deleteById, get, post } from "../../axios/genericApiCalls";

const initialValues: VillainStateType = {
  villains: [] as VillainModel[],
  villain: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as VillainModel,
  loading: false,
};

const VillainContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    softDeleteVillainAction(villain: VillainModel) {
      store.villains = store.villains.filter((ah) => ah.id !== villain.id);
    },

    getVillainsAction() {
      store.loading = true;
      get(EndPoints.villains)
        .pipe(
          map((data) => (store.villains = data)),
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
        .subscribe();
      store.loading = false;
    },

    deleteVillainAction(id: string) {
      const previousVillains = store.villains;
      store.villains = store.villains.filter((ah) => ah.id !== id);
      deleteById(EndPoints.villains, id)
        .pipe(
          catchError((err) => {
            console.log(err);
            store.villains = previousVillains;
            return err;
          })
        )
        .subscribe();
    },

    postVillainAction(newVillain: VillainModel) {
      post(EndPoints.villains, newVillain)
        .pipe(
          map((data) => store.villains.push(data)),
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
        .subscribe();
    },

    /*computed values i.e. derived state*/
    get totalVillainsCount() {
      return store.villains.length;
    },
  }));

  return store;
};

export default VillainContext;
