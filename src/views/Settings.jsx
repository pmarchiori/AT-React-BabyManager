import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "./../components/button/button";
import Header from "./../components/header/header";
import TypographyComponent from "./../components/typography/typography";

import { useLanguageContext } from "../services/LangContext";
import { useDataContext } from "../DataContext";
import { useAuthentication } from "../services/AuthContext";

import { Card, CardContent, TextField, Box } from "@mui/material";

export default function Settings() {
  const navigate = useNavigate();

  const { getBabyData, updateBabyData } = useDataContext();
  const { changeLanguage } = useLanguageContext();

  const { t } = useTranslation();

  const [babyName, setBabyName] = useState(getBabyData().name);
  const [babyWeight, setBabyWeight] = useState(getBabyData().weight);
  const [babyLength, setBabyLength] = useState(getBabyData().length);

  async function handleSignOut() {
    try {
      setSession(false);
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleSaveAll() {
    // Aqui, passamos um objeto com todos os dados do bebê
    const newBabyData = {};
    if (babyName) newBabyData.name = babyName;
    if (babyWeight) newBabyData.weight = babyWeight;
    if (babyLength) newBabyData.length = babyLength;

    // Atualiza os dados do bebê de uma vez
    updateBabyData(newBabyData);
  }

  const { signOut, setSession } = useAuthentication();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Header title={t("settings")} />

      <Card sx={{ width: "100%", marginBottom: 3, marginTop: 10 }}>
        <CardContent>
          <TypographyComponent
            variant="h5"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {t("language")}
          </TypographyComponent>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <ButtonComponent onClick={() => changeLanguage("en")}>
              {t("english")}
            </ButtonComponent>
            <ButtonComponent onClick={() => changeLanguage("pt")}>
              {t("portuguese")}
            </ButtonComponent>
            <ButtonComponent onClick={() => changeLanguage("es")}>
              {t("spanish")}
            </ButtonComponent>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ width: "100%" }}>
        <CardContent>
          <TypographyComponent
            variant="h5"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {t("baby_data")}
          </TypographyComponent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
            }}
          >
            <TextField
              placeholder={t("set_baby_name")}
              value={babyName}
              onChange={(event) => setBabyName(event.target.value)}
              fullWidth
            />
            <TextField
              placeholder={t("set_baby_weight")}
              value={babyWeight}
              onChange={(event) => setBabyWeight(event.target.value)}
              fullWidth
            />
            <TextField
              placeholder={t("set_baby_length")}
              value={babyLength}
              onChange={(event) => setBabyLength(event.target.value)}
              fullWidth
            />
            <ButtonComponent
              sx={{
                alignSelf: "center",
                padding: "10px 20px",
              }}
              onClick={handleSaveAll}
            >
              {t("save_all")}
            </ButtonComponent>
          </Box>
        </CardContent>
      </Card>

      <ButtonComponent
        sx={{
          marginTop: 2,
          backgroundColor: "#d32f2f",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#b71c1c",
          },
        }}
        onClick={handleSignOut}
      >
        {t("sign_out")}
      </ButtonComponent>
    </Box>
  );
}
