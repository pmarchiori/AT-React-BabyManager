import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Box, MenuItem, Select } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ButtonComponent from "../components/button/button";
import Header from "../components/header/header";
import TextFieldComponent from "../components/textField/textField";

import { useDataContext } from "../DataContext";

import dayjs from "dayjs";

export default function EditForm() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const navigation = useNavigate();
  const { t } = useTranslation();

  const {
    getFeedData,
    getSleepData,
    getDiaperData,

    updateFeedData,
    updateSleepData,
    updateDiaperData,

    deleteFeedData,
    deleteSleepData,
    deleteDiaperData,
  } = useDataContext();

  const [formData, setFormData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [observation, setObservation] = useState("");

  const [diaperType, setDiaperType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let data;

      switch (type) {
        case "sleep":
          data = await getSleepData();
          break;
        case "eat":
          data = await getFeedData();
          break;
        case "diaper":
          data = await getDiaperData();
          break;

        default:
          navigation("/");
          break;
      }

      const editItem = data.find(
        (item) => item.id === Number(id) && !isNaN(Number(id))
      );

      if (editItem) {
        setFormData(editItem);
        setStartDate(editItem.startdate ? dayjs(editItem.startdate) : null);
        setEndDate(editItem.enddate ? dayjs(editItem.enddate) : null);
        setObservation(editItem.observation || "");
      } else {
        alert("Item não encontrado!");
        navigation("/");
      }
    };

    fetchData();
  }, [type, id, navigation]);

  const handleStorage = async () => {
    let data;

    if (type === "eat") {
      data = {
        startdate: startDate.toISOString(),
        enddate: endDate.toISOString(),
        observation,
      };
      await updateFeedData(id, data);
    } else if (type === "sleep") {
      data = {
        startdate: startDate.toISOString(),
        enddate: endDate.toISOString(),
        observation,
      };
      await updateSleepData(id, data);
    } else if (type === "diaper") {
      data = {
        startdate: startDate.toISOString(),
        observation,
        type: diaperType,
      };
      await updateDiaperData(id, data);
    }

    navigation("/");
  };

  const handleDelete = async () => {
    if (type === "eat") {
      await deleteFeedData(id);
    } else if (type === "sleep") {
      await deleteSleepData(id);
    } else if (type === "diaper") {
      await deleteDiaperData(id);
    }

    navigation("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <Header title={t("edit_header")} update onDelete={handleDelete} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minWidth: 300,
            maxWidth: 400,
            margin: "0 auto",
            marginTop: 5,
            padding: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label={t("start_time")}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            {type !== "diaper" && (
              <DateTimePicker
                label={t("end_time")}
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            )}
            {type === "diaper" && (
              <Select
                value={diaperType}
                label={t("diaper_type")}
                onChange={(e) => setDiaperType(e.target.value)}
                sx={{
                  height: 50,
                  width: "100%",
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                  },
                  borderRadius: "8px",
                }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  {t("mess_type")}
                </MenuItem>
                <MenuItem value={t("poop")}>{t("poop")}</MenuItem>
                <MenuItem value={t("pee")}>{t("pee")}</MenuItem>
                <MenuItem value={t("both")}>{t("both")}</MenuItem>
              </Select>
            )}
          </LocalizationProvider>

          <TextFieldComponent
            label={t("observation")}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          <ButtonComponent
            onClick={handleStorage}
            sx={{
              height: "50px",
              width: "100%",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            {t("save_button")}
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
}
