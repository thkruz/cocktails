import cocktails from '../data/cocktails.json';
import ingredients from '../data/ingredients.json';
import glasses from '../data/glasses.json';

export const fetchCocktails = () => {
  return Promise.resolve(
    cocktails.map(cocktail => {
      // calculate the slug
      const slug = cocktail.name.toLowerCase().replace(/ /, '-');

      // calculate if the cocktail is vegan
      const vegan = !cocktail.ingredients
        .filter(i => i.ingredient)
        .some(i => {
          return ingredients[i.ingredient] && ingredients[i.ingredient].vegan === false;
        });

      // force colors to be an array
      const colors = Array.isArray(cocktail.colors) ? cocktail.colors : [cocktail.colors];

      return { ...cocktail, slug, vegan, colors };
    })
  );
};

export const fetchIngredients = () => Promise.resolve(ingredients);
export const fetchGlasses = () => Promise.resolve(glasses);
