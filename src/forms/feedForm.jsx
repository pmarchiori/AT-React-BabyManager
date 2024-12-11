import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ButtonComponent from "../components/button/button";
import Header from "../components/header/header";
import TextFieldComponent from "../components/textField/textField";

import { useDataContext } from "../DataContext";

export default function FeedForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [observation, setObservation] = useState("");
  const navigation = useNavigate();
  const { t } = useTranslation();

  const { saveFeedData } = useDataContext();

  const handleStorage = async () => {
    if (!startDate || !endDate) {
      alert(t("fill_required_fields"));
      return;
    }

    const data = {
      startdate: startDate.toISOString(),
      enddate: endDate.toISOString(),
      observation,
    };

    try {
      await saveFeedData(data);
      setStartDate(null);
      setEndDate(null);
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
        <Header title={t("eat_header")} />
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
              onChange={(newValue) => setStartDate(newValue)}
              value={startDate || null}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <DateTimePicker
              label={t("end_time")}
              onChange={(newValue) => setEndDate(newValue)}
              value={endDate || null}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </LocalizationProvider>

          <TextFieldComponent
            label={t("observation")}
            value={observation}
            onChange={(event) => setObservation(event.target.value)}
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
