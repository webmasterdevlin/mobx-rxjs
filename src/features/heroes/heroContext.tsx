import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { catchError, map } from "rxjs/operators";

import { EndPoints } from "../../axios/api-config";
import { HeroModel, HeroStateType } from "./heroTypes";
import { deleteById, get, post } from "../../axios/genericApiCalls";

const initialValues: HeroStateType = {
  heroes: [] as HeroModel[],
  hero: {
    id: "",
    firstName: "",
    lastName: "",
    house: "",
    knownAs: "",
  } as HeroModel,
  loading: false,
};

const HeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    softDeleteHeroAction(hero: HeroModel) {
      store.heroes = store.heroes.filter((ah) => ah.id !== hero.id);
    },

    getHeroesAction() {
      store.loading = true;
      get(EndPoints.heroes)
        .pipe(
          map((data) => (store.heroes = data)),
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
        .subscribe();
      store.loading = false;
    },

    deleteHeroAction(id: string) {
      const previousHeroes = store.heroes;
      store.heroes = store.heroes.filter((ah) => ah.id !== id);
      deleteById(EndPoints.heroes, id)
        .pipe(
          catchError((err) => {
            console.log(err);
            store.heroes = previousHeroes;
            return err;
          })
        )
        .subscribe();
    },

    postHeroAction(newHero: HeroModel) {
      post(EndPoints.heroes, newHero)
        .pipe(
          map((data) => store.heroes.push(data)),
          catchError((err) => {
            console.log(err);
            return err;
          })
        )
        .subscribe();
    },

    /*computed values i.e. derived state*/
    get totalHeroesCount() {
      return store.heroes.length;
    },
  }));

  return store;
};

export default HeroContext;
