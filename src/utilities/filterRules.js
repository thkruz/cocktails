import { arrayContainsArray } from './util';
import { getIngredientKeys } from './cocktail.utils';

/**
 * Cocktail filtering rules
 *
 * each rule basically needs to return 'true' if the cocktail should
 * be returned. Adding an export here will automatically make it
 * applyable as a filter so long as an equivalent entry exists
 * in the 'filterConfig'.
 *
 */

export const nameIncludes = (cocktail, { searchText }) => {
  return cocktail.name.toLowerCase().includes(searchText.toLowerCase());
};

// cocktail will be returned if the passed-in property is truthy
export const mustHaveTruthyProperty = (cocktail, { property }) => {
  return !!cocktail[property.toString()];
};

// cocktail will be returned if it includes all of the ingredients
// in the filter - NONE can be missing.
export const makeableFrom = (cocktail, { ingredients }) => {
  const cocktailIngredients = getIngredientKeys(cocktail);
  if (ingredients.length === 0) return false;
  return arrayContainsArray(ingredients, cocktailIngredients);
};

// cocktail will be returned if it includes all of the
// ingredients in the filter - SOME can be missing.
export const mustInclude = (cocktail, { ingredients }) => {
  const cocktailIngredients = getIngredientKeys(cocktail);
  if (ingredients.length === 0) return true;
  return arrayContainsArray(cocktailIngredients, ingredients);
};

// cocktail will be returned if it contains any of the
// ingredients from the filter.
export const canInclude = (cocktail, { ingredients }) => {
  const cocktailIngredients = getIngredientKeys(cocktail);
  if (ingredients.length === 0) return true;
  return cocktailIngredients.some(i => ingredients.includes(i));
};

// cocktail will be returned if it contains NONE of the ingredients
// from the filter.
export const mustNotInclude = (cocktail, { ingredients }) => {
  return !canInclude(cocktail, { ingredients });
};

export const inGlass = (cocktail, { glasses }) => {
  return glasses.length === 0 || glasses.includes(cocktail.glass);
};

export const inCategory = (cocktail, { categories }) => {
  return categories.length === 0 || categories.includes(cocktail.category);
};

export const isFavourite = (cocktail, { favourites }) => {
  return favourites.includes(cocktail.slug);
};
