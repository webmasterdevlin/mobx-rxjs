import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { catchError, map } from "rxjs/operators";
import { runInAction } from "mobx";
import { of } from "rxjs";

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

/*
 * what is runInAction()?
 * https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 * */

const VillainContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    softDeleteVillainAction(villain: VillainModel) {
      store.villains = store.villains.filter((ah) => ah.id !== villain.id);
    },

    getVillainsAction() {
      runInAction(() => {
        store.loading = true;
      });

      get(EndPoints.villains)
        .pipe(
          map((data) => runInAction(() => (store.villains = data))),
          catchError((err) => {
            console.log(err);
            return of([]);
          })
        )
        .subscribe();

      runInAction(() => {
        store.loading = false;
      });
    },

    deleteVillainAction(id: string) {
      const previousVillains = store.villains;
      store.villains = store.villains.filter((ah) => ah.id !== id);
      deleteById(EndPoints.villains, id)
        .pipe(
          catchError((err) => {
            store.villains = previousVillains;
            console.log(err);
            return of([]);
          })
        )
        .subscribe();
    },

    postVillainAction(newVillain: VillainModel) {
      post(EndPoints.villains, newVillain)
        .pipe(
          map((data) => runInAction(() => store.villains.push(data))),
          catchError((err) => {
            console.log(err);
            return of([]);
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
