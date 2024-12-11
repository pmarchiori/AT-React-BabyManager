import { Grid2 as Grid } from "@mui/material";

export default function GridComponent({
  isContainer = false,
  spacing = 2,
  size,
  direction = "row",
  alignItems = "stretch",
  justifyContent = "flex-start",
  children,
  sx = {},
  ...props
}) {
  const gridProps = {
    container: isContainer,
    spacing,
    direction,
    alignItems,
    justifyContent,
    sx,
    ...props,
  };

  return isContainer ? (
    <Grid {...gridProps}>{children}</Grid>
  ) : (
    <Grid item xs={size} sx={sx} {...props}>
      {children}
    </Grid>
  );
}
