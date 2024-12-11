import { useNavigate } from "react-router-dom";

import { AppBar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Header({ title, update = false, onDelete }) {
  const navigation = useNavigate();

  function navigateBack() {
    navigation("/");
  }

  return (
    <AppBar
      sx={{
        flexGrow: 1,
        padding: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#6c3baa",
      }}
    >
      <IconButton onClick={navigateBack}>
        <ArrowBackIcon sx={{ color: "white" }} />
      </IconButton>

      <Typography>{title}</Typography>
      <IconButton onClick={onDelete} sx={{ color: "white" }}>
        {update ? <DeleteOutlineIcon /> : ""}
      </IconButton>
    </AppBar>
  );
}
