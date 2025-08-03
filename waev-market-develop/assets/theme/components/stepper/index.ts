// Waev Dashboard Base Styles
import colors from '../../base/colors';
import borders from '../../base/borders';
import boxShadows from '../../base/boxShadows';

// Waev Dashboard Helper Functions
import pxToRem from '../../functions/pxToRem';
import linearGradient from '../../functions/linearGradient';

const { transparent, gradients } = colors;
const { borderRadius } = borders;
const { colored } = boxShadows;

// types
type Types = any;

const stepper: Types = {
  styleOverrides: {
    root: {
      background: linearGradient(gradients.info.main, gradients.info.state),
      padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
      borderRadius: borderRadius.lg,
      boxShadow: colored.info,

      '&.MuiPaper-root': {
        backgroundColor: transparent.main,
      },
    },
  },
};

export default stepper;
