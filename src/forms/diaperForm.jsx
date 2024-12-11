import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Box, MenuItem, Select } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ButtonComponent from "../components/button/button";
import Header from "../components/header/header";
import TextFieldComponent from "../components/textField/textField";

import { useDataContext } from "../DataContext";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DiaperForm() {
  const [startDate, setStartDate] = useState(null);
  const [observation, setObservation] = useState("");
  const [mess, setMess] = useState("");

  const navigation = useNavigate();
  const { t } = useTranslation();

  const { saveDiaperData } = useDataContext();

  const handleStorage = async () => {
    if (!startDate || !mess) {
      alert(t("fill_required_fields"));
      return;
    }

    const data = {
      startdate: startDate ? startDate.toISOString() : null,
      observation,
      type: mess,
    };

    try {
      await saveDiaperData(data);

      setStartDate(null);
      setObservation("");

      navigation("/");
    } catch (error) {
      alert(error.message);
    }
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
        <Header title={t("diaper_header")} />
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
              onChange={(newValue) => {
                setStartDate(
                  newValue ? newValue.tz("America/Sao_Paulo", true) : null
                );
              }}
              value={startDate || null}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </LocalizationProvider>

          <Select
            value={mess}
            onChange={(e) => setMess(e.target.value)}
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
            {t("add_button")}
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
}
