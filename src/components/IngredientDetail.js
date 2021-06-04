import React from 'react';
import { Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compact from 'lodash/compact';
import { createMeasurementString } from '../utilities/cocktail.utils';
const styles = {
  tooltip: {
    cursor: 'pointer',
  },
};

export function getIngredientAndLabel(allIngredients, item) {
  // Simple Ingredient

  if (typeof allIngredients[item.ingredient]['Generic'] === 'undefined') {
    return {
      ingredient: allIngredients[item.ingredient],
      label: `${item.ingredient}`,
    };
  }

  let label;
  let ingredientByType;
  let ingredientByBrand;

  // Complex Ingredient

  if (typeof allIngredients[item.ingredient][item.type] !== 'undefined') {
    ingredientByType = allIngredients[item.ingredient][item.type];
    label = `${item.type} ${item.ingredient}`;
  } else {
    ingredientByType = allIngredients[item.ingredient]['Generic'];
    label = `${item.ingredient}`;
  }

  if (typeof ingredientByType[item.brand] !== 'undefined') {
    ingredientByBrand = ingredientByType[item.brand];
    label = `${item.brand} ${item.ingredient}`;
  } else {
    ingredientByBrand = ingredientByType['Generic'];
  }

  return {
    ingredient: ingredientByBrand,
    label: label,
  };
}

const IngredientDetail = ({ item, units, useLingo, allIngredients, classes }) => {
  if (item.special) return <span>{item.special}</span>;

  const { ingredient, label } = getIngredientAndLabel(allIngredients, item);
  const { taste, abv, vegan } = ingredient || {};

  const toolTipContent = [];
  toolTipContent.push(abv > 0 ? abv + '% abv' : 'Non-alcoholic');
  toolTipContent.push(vegan === false ? 'Non-Vegan' : '');
  toolTipContent.push(taste);

  return (
    <span>
      {createMeasurementString(item.amount, item.unit, units, useLingo)}{' '}
      <Tooltip
        className={classes.tooltip}
        title={compact(toolTipContent).join(', ')}
        placement="top"
      >
        <strong>{item.label || label}</strong>
      </Tooltip>
    </span>
  );
};

const mapStateToProps = (state) => ({
  allIngredients: state.db.ingredients,
  units: state.settings.units,
  useLingo: state.settings.lingo,
});

export default withStyles(styles)(connect(mapStateToProps)(IngredientDetail));
