import { IconButton } from "@mui/material";

export default function IconButtonComponent({
  onClick,
  children,
  color = "#6c3baa",
}) {
  return (
    <IconButton onClick={onClick} color={color}>
      {children}
    </IconButton>
  );
}
