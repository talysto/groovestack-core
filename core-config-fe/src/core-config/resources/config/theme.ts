// import { indigo, red } from '@mui/material/colors'
import { grey } from '@mui/material/colors'
import { defaultTheme } from 'react-admin'
// import { createTheme } from '@mui/material';

// const darkTheme = createTheme({
//   ...defaultTheme, palette: { mode: 'dark' },
// });

// https://www.color-hex.com/color-palette/44580
export const theme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,

    // MuiTextField: {
    //   defaultProps: {
    //       variant: 'outlined',
    //   },
    // },
    // MuiFormControl: {
    //     defaultProps: {
    //         variant: 'outlined',
    //     },
    // },
    MuiToolbar: {
      styleOverrides: {
        root: { alignItems: 'center !important' },
      },
    },
    RaFilterForm: {
      styleOverrides: {
        root: { alignItems: 'center' },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          '& .RaDatagrid-headerCell': {
            lineHeight: '1.0em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: grey[700],
          },
        },
      },
    },
    RaLayout: {
      styleOverrides: {
        root: {
          '& .RaLayout-content': {
            backgroundColor: 'white',
            padding: 20,
            // paddingLeft: 20,
            // paddingRight: 20
            // padding: 0
          },
          '& .RaLayout-appFrame': {
            // marginTop: '48px',
          },
        },
      },
    },
    RaShow: {
      styleOverrides: {
        root: {
          // backgroundColor: "white",
          '& .RaShow-card': { boxShadow: 'none' },
          '& .RaShow-main': { flexWrap: 'wrap' },
          // '& .MuiTabs-flexContainer': { flexWrap: 'wrap' }
        },
      },
    },
    RaEdit: {
      styleOverrides: {
        root: {
          // backgroundColor: "white",
          '& .RaEdit-card': {
            boxShadow: 'none',
          },
        },
      },
    },
    RaCreate: {
      styleOverrides: {
        root: {
          // backgroundColor: "white",
          '& .RaCreate-card': {
            boxShadow: 'none',
          },
        },
      },
    },
  },

  // ...darkTheme,
  // palette: {
  //   type: 'light',
  //   primary: {
  //     main: '#0a568f',
  //   },
  //   secondary: {
  //     main: '#d90522',
  //   },
  //   warning: {
  //     main: '#f7b20e',
  //   },
  //   info: {
  //     main: '#fb5105',
  //   },
  //   background: {
  //     default: '#e5e5ec',
  //   },
  // },
  typography: {
    h2: {
      fontWeight: 800,
    },
    body1: {
      fontWeight: 300,
    },
  },
}

export default theme

// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#0a568f',
//     },
//     secondary: {
//       main: '#d90522',
//     },
//     warning: {
//       main: '#f7b20e',
//     },
//     info: {
//       main: '#fb5105',
//     },
//     background: {
//       default: '#e5e5ec',
//     },
//   },
//   typography: {
//     h2: {
//       fontWeight: 800,
//     },
//     body1: {
//       fontWeight: 200,
//     },
//   },
// };