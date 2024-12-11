import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import dayjs from "dayjs";

export default function CardItem({ data, title, index, onEdit }) {
  const { t } = useTranslation();

  return (
    <Card
      key={index}
      sx={{
        marginBottom: 2,
        borderRadius: 3,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        position: "relative",
        backgroundColor: "#fff",
        width: "80%",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardContent>
        <Typography
          align="center"
          variant="h5"
          sx={{
            color: "#6c3baa",
            marginBottom: 1,
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <Box>
          {data.observation && (
            <Typography sx={{ color: "#333", textAlign: "center" }}>
              {data.observation}
            </Typography>
          )}
          {data.type && (
            <Typography sx={{ color: "#333", textAlign: "center" }}>
              {data.type}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 2,
            textAlign: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#6c3baa" }}>
            {t("start")}: {dayjs(data.startdate).format("HH:mm")}
          </Typography>
          {data.enddate && (
            <Typography variant="body2" sx={{ color: "#6c3baa" }}>
              {t("end")}: {dayjs(data.enddate).format("HH:mm")}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: "#6c3baa" }}>
            {t("date")}: {dayjs(data.startdate).format("DD/MM/YYYY")}
          </Typography>
        </Box>
      </CardContent>

      <IconButton
        onClick={onEdit}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#6c3baa",
          color: "white",
          boxShadow: 2,
          width: 35,
          height: 35,
          "&:hover": {
            backgroundColor: "#5b2e94",
          },
        }}
      >
        <EditIcon />
      </IconButton>
    </Card>
  );
}
