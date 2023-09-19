import { useTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import { shadeColor } from './shadeColor';
// import { shadeColor } from './shadeColor.js';


// import romaTheme from './roma.project.json'
// import { echartsThemeFromMui } from './echartsThemeFromMui'
// echarts.registerTheme('roma', romaTheme.theme)

// const shadeColor = (color: string, percent: number) => {
//   const num = parseInt(color.slice(1), 16);
//   const amt = Math.round(2.55 * percent);
//   const R = (num >> 16) + amt;
//   const G = (num >> 8 & 0x00FF) + amt;
//   const B = (num & 0x0000FF) + amt;

//   return `#${(1 << 24) + (R << 16) + (G << 8) + B.toString(16).slice(1)}`;
// }

// const muiShade = (color: string, value: number) => {
//   const shadeMap: Record<number, number> = {
//     100: -10,
//     200: -20,
//     300: -30,
//     400: -40,
//     500: 0,
//     600: 10,
//     700: 20,
//     800: 30,
//     900: 40
//   };
//   return shadeColor(color, shadeMap[value]);
// }

// const showShadedColors = (baseColor: string) => {
//   const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];
//   const result: Record<number, string> = {};
//   shades.forEach(shade => {
//     result[shade] = muiShade(baseColor, shade);
//   });
//   return result;
// }

// Test
// const baseColor = "#3498db"; // You can change this to any other color
// console.log(showShadedColors(baseColor));


export function echartsThemeFromMui(baseColor: string = '#3498db') {
  // const theme = useTheme();

  // const baseColor = theme.palette.primary.main; //purple;

  const theme = {
    // backgroundColor: baseColor,

    color: [
      baseColor,
      shadeColor(baseColor, .8),
      shadeColor(baseColor, .6),
      shadeColor(baseColor, .4),
      shadeColor(baseColor, .2),
      // shadeColor(baseColor, .6),
      // shadeColor(baseColor, .4),
      // shadeColor(baseColor, .3),



      // baseColor[900],
      // baseColor[700],
      // baseColor[500],
      // baseColor[300],
      // baseColor[100],
      // baseColor[800],
      // baseColor[600],
      // baseColor[400],
      // baseColor[200],
      // baseColor[50],
    ],
  };

  console.debug('theme', theme)

  return theme
}
