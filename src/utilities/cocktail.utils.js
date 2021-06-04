import { map, compact } from 'lodash';

// Given a list of cocktails, this returns the counts of the ingredients
// "appearances" in the list (e.g. Gin: 4, Brandy: 2...)
export function countIngredients(cocktails = []) {
  const counts = cocktails.reduce((acc, cocktail) => {
    cocktail.ingredients.forEach(({ ingredient }) => {
      if (!ingredient) return;
      acc[`${ingredient}`]
        ? (acc[`${ingredient}`] = acc[`${ingredient}`] + 1)
        : (acc[`${ingredient}`] = 1);
    });
    return acc;
  }, {});

  return map(counts, (count, name) => {
    return { count, name };
  }).sort((a, b) => (a.count < b.count ? 1 : -1));
}

export function getIngredientKeys(cocktail) {
  return compact(cocktail.ingredients.map((i) => i.ingredient));
}

// We store all ingredient quantities in cl. This function converts
// that to another format should the user want to.
export function convertMeasurementFromCl(amount, unit) {
  switch (unit) {
    case 'ml':
      return amount * 10;
    case 'oz':
      return Math.round(amount * 0.351951 * 2) / 2;
    default:
      return amount;
  }
}

export function oz2cl(oz) {
  return oz * 2.95735;
}

export function oz2ml(oz) {
  return oz * 29.5735;
}

export function ml2oz(ml) {
  return ml / 29.5735;
}

export function ml2cl(ml) {
  return ml / 29.5735;
}

export function cl2oz(cl) {
  return cl / 2.95735;
}

export function cl2ml(cl) {
  return cl / 10;
}

function getFlooredFixed(v, d) {
  let fixedAmt = (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  return parseFloat(fixedAmt) === parseInt(fixedAmt) ? parseInt(fixedAmt) : parseFloat(fixedAmt);
}

// pass in amount in cl, returns any "bar lingo" covered by that amount.
function lingoForOzMeasure(amount, outputUnits) {
  switch (outputUnits) {
    case 'ml':
      amount = ml2oz(amount);
      break;
    case 'cl':
      amount = cl2oz(amount);
      break;
    default:
      break;
  }

  amount = getFlooredFixed(amount, 2);

  if (amount.toFixed(5) === (1 / 32).toFixed(5)) return 'A Dash of'; // 1/32 oz
  if (amount.toFixed(5) === (1 / 5).toFixed(5)) return 'A Splash of'; // 1/32 oz
  if (amount.toFixed(5) === (1 / 6).toFixed(5)) return 'A Teaspoon of';
  if (amount.toFixed(5) === (1 / 2).toFixed(5)) return 'A Tablespoon of';
  if (amount === 1) return '1 Pony';
  if (amount === 1.5) return '1 Jigger';
  if (amount === 2) return '2 Ponies';
  if (amount === 3) return '1 Snit';
  if (amount === 4) return '1 Gill';
  if (amount === 4.5) return '3 Jiggers';
  if (amount === 5) return '5 Ponies';
  if (amount === 6) return '2 Snits';
  if (amount === 8) return '2 Gill';
}

// returns a string representing amount/units, including lingo
export function createMeasurementString(amount, units, outputUnits, useLingo) {
  if (typeof amount == 'string' || typeof amount == 'undefined') return;
  switch (units) {
    case 'ml':
      switch (outputUnits) {
        case 'cl':
          amount = ml2cl(amount);
          break;
        case 'oz':
          amount = ml2oz(amount);
          break;
        default:
          break;
      }
      break;
    case 'cl':
      switch (outputUnits) {
        case 'ml':
          amount = cl2ml(amount);
          break;
        case 'oz':
          amount = cl2oz(amount);
          break;
        default:
          break;
      }
      break;
    case 'oz':
      switch (outputUnits) {
        case 'cl':
          amount = oz2cl(amount);
          break;
        case 'ml':
          amount = oz2ml(amount);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return (
    (useLingo && lingoForOzMeasure(amount, outputUnits)) ||
    `${getFlooredFixed(amount, 2)} ${outputUnits}`
  );
}
