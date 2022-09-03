import * as colors from '@mui/material/colors';
import { black, white } from './colors';

const palette = {
  common: {
    white,
    black,
    neutral: '#E4E7EB',
  },
  primary: {
    contrastText: white,
    main: '#00BCD4',
  },
  secondary: {
    contrastText: white,
    main: '#FF4081',
  },
  error: {
    contrastText: white,
    main: '#FF5263',
    light: '#ffedef',
    dark: '',
  },
  success: {
    contrastText: white,
    main: '#45B880',
    light: '#F1FAF5',
    dark: '#00783E',
  },
  info: {
    contrastText: white,
    main: '#1070CA',
  },
  warning: {
    contrastText: white,
    main: '#E69F22',
  },
  danger: {
    contrastText: white,
    main: '#ED4740',
  },
  discarded: {
    contrastText: black,
    main: colors.red['200'],
    light: colors.red['100'],
    dark: colors.red['300'],
  },
  text: {
    primary: '#12161B',
    secondary: '#66788A',
    disabled: '#A6B1BB',
  },
  background: {
    paper: white,
    default: colors.grey[100],
  },
  contrastThreshold: 3,
  tonalOffset: 0.1,
};

export default palette;
