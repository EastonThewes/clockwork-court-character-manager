import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e07d1b", // Green for selected first dot
    },
    secondary: {
      main: "#FFC107", // Amber for selected second dot
    },
    error: {
      main: "#F44336", // Red for selected third dot
    },
    grey: {
      500: "#B0BEC5", // Default gray
    },
  },
});

export default theme;
