import { Box } from "@mui/material";

export default function BoxComponent({
  component = "div",
  children,
  sx = {},
  ...props
}) {
  return (
    <Box
      component={component}
      sx={{
        borderRadius: "8px",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
