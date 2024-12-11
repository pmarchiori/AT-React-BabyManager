import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    darkGreen: {
      main: "#6c3baa",
      contrastText: "white",
    },
  },
});

export default function ButtonComponent({
  children,
  variant = "contained",
  sx,
  size = "medium",
  fullWidth = false,
  onClick,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={sx}
        variant={variant}
        color="darkGreen"
        size={size}
        fullWidth={fullWidth}
        onClick={onClick}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}
