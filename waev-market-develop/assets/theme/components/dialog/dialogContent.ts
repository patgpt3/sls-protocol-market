// Waev Dashboard Base Styles
import typography from '../../base/typography';
import borders from '../../base/borders';
import colors from '../../base/colors';

// Waev Dashboard Helper Functions
import pxToRem from '../../functions/pxToRem';

const { size } = typography;
const { text } = colors;
const { borderWidth, borderColor } = borders;

// types
type Types = any;

const dialogContent: Types = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.md,
      color: text.main,
    },

    dividers: {
      borderTop: `${borderWidth[1]} solid ${borderColor}`,
      borderBottom: `${borderWidth[1]} solid ${borderColor}`,
    },
  },
};

export default dialogContent;
