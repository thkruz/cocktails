import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getIngredientAndLabel } from '../IngredientDetail';
import { createMeasurementString } from '../../utilities/cocktail.utils';

const styles = theme => ({
  listItem: {
    backgroundColor: theme.palette.background.paper,
  },
  ingredients: {
    display: 'block',
    fontStyle: 'italic',
    marginBottom: theme.spacing(1),
  },
  preparation: {},
});

const formatIngredients = (ingredients, allIngredients, units, useLingo) => {
  let ingredientsString = '';

  ingredients.forEach(ingredient => {
    const { amount, unit } = ingredient;
    const measurementStr = createMeasurementString(amount, unit, units, useLingo);
    const ingredientAndLabel = getIngredientAndLabel(allIngredients, ingredient);
    ingredientsString += `${measurementStr} of ${ingredientAndLabel.label} - `;
  });

  // Remove trailing ' - '
  return ingredientsString.slice(0, -3);
};

const CocktailVariantLocal = ({
  cocktail: { name, image, category, glass, preparation, ingredients } = {},
  allIngredients,
  units,
  useLingo,
  classes,
}) => (
  <ListItem className={classes.listItem} alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt="Remy Sharp" src={image} />
    </ListItemAvatar>
    <ListItemText
      primary={name}
      secondary={
        <span>
          <span className={classes.ingredients}>{formatIngredients(ingredients, allIngredients, units, useLingo)}</span>

          <span className={classes.preparation}>{preparation}</span>
        </span>
      }
    />
  </ListItem>
);

const mapStateToProps = state => ({
  allIngredients: state.db.ingredients,
  units: state.settings.units,
  useLingo: state.settings.lingo,
});

export default withStyles(styles)(connect(mapStateToProps)(CocktailVariantLocal));
