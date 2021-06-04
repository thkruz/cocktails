import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import { connect } from 'react-redux';

export const colors = {
  blueGrey,
  grey,
  blue,
};

/**
 * override theme defaults here.
 */
function createTheme(color, theme) {
  return createMuiTheme({
    palette: {
      primary: colors[`${color}`],
      secondary: theme === 'light' ? blue : blue,
      type: theme,
    },
    typography: {
      useNextVariants: true,
    },
  });
}

const mapStateToProps = (state) => ({
  color: state.settings.color,
  theme: state.settings.theme,
});

const Theme = ({ color, theme, children }) => (
  <MuiThemeProvider theme={createTheme(color, theme)}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

export default connect(mapStateToProps)(Theme);
