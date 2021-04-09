import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { catchError, map } from "rxjs/operators";
import { runInAction } from "mobx";
import { of } from "rxjs";

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

/*
 * what is runInAction()?
 * https://stackoverflow.com/questions/57271153/mobx-runinaction-usage-why-do-we-need-it
 * */

const HeroContext = () => {
  const store = useLocalObservable(() => ({
    /*observables*/
    ...initialValues,

    softDeleteHeroAction(hero: HeroModel) {
      store.heroes = store.heroes.filter((ah) => ah.id !== hero.id);
    },

    getHeroesAction() {
      runInAction(() => {
        store.loading = true;
      });

      get(EndPoints.heroes)
        .pipe(
          map((data) => runInAction(() => (store.heroes = data))),
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

    deleteHeroAction(id: string) {
      const previousHeroes = store.heroes;
      store.heroes = store.heroes.filter((ah) => ah.id !== id);
      deleteById(EndPoints.heroes, id)
        .pipe(
          catchError((err) => {
            store.heroes = previousHeroes;
            console.log(err);
            return of([]);
          })
        )
        .subscribe();
    },

    postHeroAction(newHero: HeroModel) {
      post(EndPoints.heroes, newHero)
        .pipe(
          map((data) => runInAction(() => store.heroes.push(data))),
          catchError((err) => {
            console.log(err);
            return of([]);
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
