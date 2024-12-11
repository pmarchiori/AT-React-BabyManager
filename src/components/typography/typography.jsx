import { Typography } from "@mui/material";

export default function TypographyComponent({
  children,
  variant = "body1",
  color = "textPrimary",
  align = "left",
  sx = {},
  gutterBottom = false,
  paragraph = false,
  fontSize = "inherit",
  fontWeight = "normal",
  ...props
}) {
  return (
    <Typography
      variant={variant}
      color={color}
      align={align}
      gutterBottom={gutterBottom}
      sx={{
        fontSize,
        fontWeight,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
