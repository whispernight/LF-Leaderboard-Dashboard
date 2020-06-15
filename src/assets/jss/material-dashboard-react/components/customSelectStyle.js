import {
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    grayColor,
    defaultFont
  } from "assets/jss/material-dashboard-react.js";
  
  const customSelectStyle = {
    disabled: {
      "&:before": {
        backgroundColor: "transparent !important"
      }
    },
    underline: {
      "&:hover:not($disabled):before,&:before": {
        borderColor: grayColor[4] + " !important",
        borderWidth: "1px !important"
      },
      "&:after": {
        borderColor: warningColor[0]
      }
    },
    underlineError: {
      "&:after": {
        borderColor: dangerColor[0]
      }
    },
    underlineSuccess: {
      "&:after": {
        borderColor: successColor[0]
      }
    },
    labelRoot: {
      ...defaultFont,
      color: grayColor[3] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      letterSpacing: "unset"
    },
    labelRootError: {
      color: dangerColor[0]
    },
    labelRootSuccess: {
      color: successColor[0]
    },
    feedback: {
      position: "absolute",
      top: "18px",
      right: "0",
      zIndex: "2",
      display: "block",
      width: "24px",
      height: "24px",
      textAlign: "center",
      pointerEvents: "none"
    },
    marginTop: {
      marginTop: "16px"
    },
    formControl: {
      paddingBottom: "10px",
      margin: "27px 0 0 0",
      position: "relative",
      verticalAlign: "unset"
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: warningColor,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        // Use the system font instead of the default Roboto font.
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
        '&:focus': {
          borderRadius: 4,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      }
  };
  
  export default customSelectStyle;
  