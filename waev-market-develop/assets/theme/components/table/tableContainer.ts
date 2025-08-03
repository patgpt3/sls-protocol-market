// Waev Dashboard Base Styles
import colors from '../../base/colors';
import boxShadows from '../../base/boxShadows';
import borders from '../../base/borders';

const { white } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

// types
type Types = any;

const tableContainer: Types = {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: md,
      borderRadius: borderRadius.xl,
    },
  },
};

export default tableContainer;
