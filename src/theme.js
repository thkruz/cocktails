import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';

import { connect } from 'react-redux';

export const colors = {
  blueGrey,
  grey,
  blue,
  lightBlue,
};

/**
 * override theme defaults here.
 */
const createTheme = (color, theme) => {
  return createMuiTheme({
    palette: {
      primary: colors[`${color}`],
      secondary: theme === 'light' ? lightBlue : lightBlue,
      type: theme,
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      useNextVariants: true,
      h1: {
        fontWeight: 400,
      },
    },
  });
};

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
