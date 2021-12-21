import React from 'react';
import { Typography, List, Divider, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CocktailVariant from './CocktailVariant';
import CocktailVariantLocal from './CocktailVariantLocal';

const styles = theme => ({
  divider: {
    margin: theme.spacing(3, 0),
  },
});

const CocktailVariantList = ({ cocktail, classes }) => {
  const { enriched, enrichment } = cocktail;
  let variants = cocktail.variants || [];

  // If no local variants or encrichment variants then stop
  if (variants.length === 0 && (!enriched || !enrichment.variants || !enrichment.variants.length)) return null;

  return (
    <>
      <Divider className={classes.divider} />

      <Typography variant="h5" gutterBottom>
        Variants
      </Typography>

      <Paper>
        <List className={classes.list}>
          {variants.length > 0 &&
            variants.map((variant, idx) => {
              return (
                <React.Fragment key={variant.name}>
                  <CocktailVariantLocal cocktail={variant} />
                  {idx !== variants.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          {(enrichment?.variants?.length > 0 &&
            enrichment.variants.map((variant, idx) => {
              return (
                <React.Fragment key={variant.name}>
                  <CocktailVariant cocktail={variant} />
                  {idx !== enrichment.variants.length - 1 && <Divider />}
                </React.Fragment>
              );
            })) ||
            null}
        </List>
      </Paper>
    </>
  );
};

export default withStyles(styles)(CocktailVariantList);
