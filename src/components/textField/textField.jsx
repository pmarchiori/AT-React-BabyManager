import { TextField } from "@mui/material";

export default function TextFieldComponent({
  label,
  value,
  onChange,
  type,
  variant,
  fullWidth,
  helperText,
  sx,
}) {
  return (
    <TextField
      sx={sx}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      variant={variant}
      helperText={helperText}
    />
  );
}
