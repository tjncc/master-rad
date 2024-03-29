import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
export const appColors = createTheme({
  palette: {
    lightBeige: createColor('#fdfaf0'),
    beige: createColor('#FAF2DA'),
    lightGreen: createColor('#8E9775'),
    darkGreen: createColor('#4A503D'),
    peach: createColor('#E28F83'),
    red: createColor('#880808')
  },
});