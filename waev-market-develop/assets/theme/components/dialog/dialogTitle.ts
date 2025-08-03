// Waev Dashboard Base Styles
import typography from '../../base/typography';

// Waev Dashboard Helper Functions
import pxToRem from '../../functions/pxToRem';

const { size } = typography;

// types
type Types = any;

const dialogTitle: Types = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.xl,
    },
  },
};

export default dialogTitle;
