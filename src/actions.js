import { fetchCocktailEnrichment } from './services/cocktailDBAPI.service';
import * as actionTypes from './actionTypes';

export const loadCocktails = payload => {
  return { type: actionTypes.LOAD_COCKTAILS, payload };
};

export const loadIngredients = payload => {
  return { type: actionTypes.LOAD_INGREDIENTS, payload };
};

export const loadGlasses = payload => {
  return { type: actionTypes.LOAD_GLASSES, payload };
};

export const updateFilter = payload => {
  return { type: actionTypes.UPDATE_FILTER, payload };
};

export const setBar = payload => {
  return { type: actionTypes.SET_BAR, payload };
};

export const activateFilterDialog = payload => {
  return { type: actionTypes.ACTIVATE_FILTER_DIALOG, payload };
};

export const closeFilterDialog = () => {
  return { type: actionTypes.CLOSE_FILTER_DIALOG };
};

export const updateFavourites = payload => {
  return { type: actionTypes.UPDATE_FAVOURITES, payload };
};

export const addToBar = payload => {
  return { type: actionTypes.ADD_TO_BAR, payload };
};

export const updateSettings = payload => {
  return { type: actionTypes.UPDATE_SETTINGS, payload };
};

export const togglePride = () => {
  return { type: actionTypes.TOGGLE_PRIDE };
};

export const toggleLingo = () => {
  return { type: actionTypes.TOGGLE_LINGO };
};

const startEnrichCocktail = cocktailName => {
  return { type: actionTypes.START_ENRICH_COCKTAIL, payload: cocktailName };
};

const failEnrichCocktail = (cocktailName, error) => {
  return {
    type: actionTypes.FAIL_ENRICH_COCKTAIL,
    payload: { cocktailName, error },
  };
};

const finishEnrichCocktail = (cocktailName, enrichment) => {
  return {
    type: actionTypes.FINISH_ENRICH_COCKTAIL,
    payload: {
      cocktailName,
      enrichment,
    },
  };
};

export const enrichCocktail = cocktail => {
  return async dispatch => {
    // don't re-enrich: this action only does something if a
    // cocktail has not already been enriched.
    const { enriched, enriching, enrichmentFailed } = cocktail;
    if (enriching || enriched || enrichmentFailed) return;

    dispatch(startEnrichCocktail(cocktail.name));
    try {
      const enrichment = await fetchCocktailEnrichment(cocktail);
      dispatch(finishEnrichCocktail(cocktail.name, enrichment));
    } catch (err) {
      dispatch(failEnrichCocktail(cocktail.name, err.message));
    }
  };
};
