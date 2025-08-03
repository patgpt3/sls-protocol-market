// Waev Dashboard Base Styles
import boxShadows from '../../base/boxShadows';
import typography from '../../base/typography';
import colors from '../../base/colors';
import borders from '../../base/borders';

// Waev Dashboard Helper Functions
import pxToRem from '../../functions/pxToRem';

const { lg } = boxShadows;
const { size } = typography;
const { text, white } = colors;
const { borderRadius } = borders;

// types
type Types = any;

const menu: Types = {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(160),
      boxShadow: lg,
      padding: `${pxToRem(16)} ${pxToRem(8)}`,
      fontSize: size.sm,
      color: text.main,
      textAlign: 'left',
      backgroundColor: `${white.main} !important`,
      borderRadius: borderRadius.md,
    },
  },
};

export default menu;
