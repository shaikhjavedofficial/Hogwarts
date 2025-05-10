import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import App from "../App";
import { AppStateSelector } from "../redux/AppSlice";

interface LayoutProps extends PropFromRedux {}

class Layout extends Component<LayoutProps> {
  render() {
    const theme = createTheme({
      palette: {
        mode: this.props.getTheme,
      },
      typography: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue','sans-serif','serif'",
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              color: "#fff",
              backgroundColor: "#7D0A0A",
              textTransform: "capitalize",
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              color: this.props.getTheme === "dark" ? "#fff" : "#000",
              backgroundColor: this.props.getTheme === "dark" ? "#333" : "#fff",
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFD600",
                borderWidth: 2,
              },
            },
          },
        },
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => {
  const getTheme = AppStateSelector(state);
  return {
    getTheme,
  };
};

const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropFromRedux = ConnectedProps<typeof connector>;
export default connector(Layout);
