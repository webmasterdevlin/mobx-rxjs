import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { catchError, map } from "rxjs/operators";

import { EndPoints } from "../../axios/api-config";
import { AntiHeroModel, AntiHeroStateType } from "./antiHeroTypes";
import { deleteById, get, post } from "../../axios/genericApiCalls";

const initialValues: AntiHeroStateType = {
  antiHeroes: [] as AntiHeroModel[],
  antiHero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as AntiHeroModel,
  loading: false,
};

const AntiHeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    softDeleteAntiHeroAction(antiHero: AntiHeroModel) {
      store.antiHeroes = store.antiHeroes.filter((ah) => ah.id !== antiHero.id);
    },

    getAntiHeroesAction() {
      store.loading = true;
      get(EndPoints.antiHeroes)
        .pipe(
          map((data) => (store.antiHeroes = data)),
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
        .subscribe();
      store.loading = false;
    },

    deleteAntiHeroAction(id: string) {
      const previousAntiHeroes = store.antiHeroes;
      store.antiHeroes = store.antiHeroes.filter((ah) => ah.id !== id);
      deleteById(EndPoints.antiHeroes, id)
        .pipe(
          catchError((err) => {
            console.log(err);
            store.antiHeroes = previousAntiHeroes;
            return err;
          })
        )
        .subscribe();
    },

    postAntiHeroAction(newAntiHero: AntiHeroModel) {
      post(EndPoints.antiHeroes, newAntiHero)
        .pipe(
          map((data) => store.antiHeroes.push(data)),
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
        .subscribe();
    },

    /*computed values i.e. derived state*/
    get totalAntiHeroesCount() {
      return store.antiHeroes.length;
    },
  }));

  return store;
};

export default AntiHeroContext;
