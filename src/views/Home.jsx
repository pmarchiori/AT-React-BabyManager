import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import CribIcon from "@mui/icons-material/Crib";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlatwareIcon from "@mui/icons-material/Flatware";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Grid2, IconButton, Typography } from "@mui/material";

import CardItem from "../components/cardItem/cardItem";
import AvatarComponent from "../components/avatar/avatar";

import babyImage from "../assets/images/baby.jpg";

import { useDataContext } from "../DataContext";

export default function Home() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [items, setItems] = useState([]);

  const { getBabyData } = useDataContext();
  const { getFeedData, getDiaperData, getSleepData } = useDataContext();

  useEffect(() => {
    const fetchData = async () => {
      const sleepData = await getSleepData();
      const feedData = await getFeedData();
      const diaperData = await getDiaperData();

      setItems([
        { type: "sleep", data: sleepData },
        { type: "feed", data: feedData },
        { type: "diaper", data: diaperData },
      ]);
    };

    fetchData();
  }, [getSleepData, getFeedData, getDiaperData, t]);

  return (
    <Box sx={{ margin: "0 auto", backgroundColor: "#f8f6fc" }}>
      <Grid2
        container
        justifyContent="space-evenly"
        alignItems="flex-end"
        marginBottom={3}
      >
        <Grid2 textAlign="center" padding={1}>
          <IconButton
            sx={{
              marginBottom: 1,
              border: 1,
              backgroundColor: "#e6dff3",
              color: "#6c3baa",
              "&:hover": {
                backgroundColor: "#d0c1e8",
              },
            }}
            onClick={() => navigate("/dashboard")}
          >
            <DashboardIcon sx={{ fontSize: 48 }} />
          </IconButton>
          <Typography variant="h6">{getBabyData().length} cm</Typography>
          <Typography variant="body2">{t("length")}</Typography>
        </Grid2>

        <Grid2 textAlign="center" padding={1}>
          <IconButton
            sx={{
              marginBottom: 1,
              backgroundColor: "#e6dff3",
              "&:hover": {
                backgroundColor: "#d0c1e8",
              },
            }}
          >
            <AvatarComponent
              src={babyImage}
              sx={{
                width: 90,
                height: 90,
              }}
            />
          </IconButton>
          <Typography variant="h5" sx={{ color: "#6c3baa" }}>
            {getBabyData().name}
          </Typography>
        </Grid2>

        <Grid2 textAlign="center" padding={1}>
          <IconButton
            sx={{
              marginBottom: 1,
              border: 1,
              backgroundColor: "#e6dff3",
              color: "#6c3baa",
              "&:hover": {
                backgroundColor: "#d0c1e8",
              },
            }}
            onClick={() => navigate("/settings")}
          >
            <SettingsIcon sx={{ fontSize: 48 }} />
          </IconButton>
          <Typography variant="h6">{getBabyData().weight} kg</Typography>
          <Typography variant="body2">{t("weight_label")}</Typography>
        </Grid2>
      </Grid2>

      <Grid2
        container
        spacing={1}
        justifyContent="space-evenly"
        marginBottom={5}
      >
        {[
          {
            icon: <CribIcon sx={{ fontSize: 35 }} />,
            label: t("go_to_sleep_form"),
            type: "sleep",
          },
          {
            icon: <FlatwareIcon sx={{ fontSize: 35 }} />,
            label: t("go_to_feed_form"),
            type: "eat",
          },
          {
            icon: <BabyChangingStationIcon sx={{ fontSize: 35 }} />,
            label: t("go_to_diaper_form"),
            type: "diaper",
          },
        ].map((item, index) => (
          <Grid2
            key={index}
            minWidth={105}
            backgroundColor="white"
            textAlign="center"
            boxShadow={1}
            padding={1}
            borderRadius={2}
            sx={{
              position: "relative",
              paddingBottom: 5,
            }}
          >
            <IconButton
              color="primary"
              sx={{
                marginBottom: 1,
                color: "#6c3baa",
                backgroundColor: "#e6dff3",
                "&:hover": {
                  backgroundColor: "#d0c1e8",
                },
              }}
            >
              {item.icon}
            </IconButton>
            <Typography variant="body1">{item.label}</Typography>

            <IconButton
              color="secondary"
              size="small"
              sx={{
                position: "absolute",
                bottom: -20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 45,
                height: 45,
                backgroundColor: "#6c3baa",
                color: "#fff",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#5b2e94",
                },
              }}
              onClick={() => navigate(`/form?type=${item.type}`)}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                +
              </Typography>
            </IconButton>
          </Grid2>
        ))}
      </Grid2>

      <Box>
        {items.map(
          (item, index) =>
            item.data.length > 0 && (
              <Box key={index} sx={{ marginBottom: 2 }}>
                {item.data
                  .slice()
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((data, dataIndex) => (
                    <CardItem
                      index={dataIndex}
                      key={dataIndex}
                      title={t(`go_to_${item.type}_form`)}
                      data={data}
                      onEdit={() =>
                        navigate(`/form?type=${item.type}&id=${data.id}`)
                      }
                    />
                  ))}
              </Box>
            )
        )}

        {items.every((item) => item.data.length === 0) && (
          <Typography variant="h5" color="grey" align="center" marginTop={10}>
            {t("no_data")}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
