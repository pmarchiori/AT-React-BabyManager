import { Avatar } from "@mui/material";

export default function AvatarComponent({
  src,
  alt = "avatar",
  sx = {},
  ...props
}) {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        ...sx,
      }}
      {...props}
    />
  );
}
