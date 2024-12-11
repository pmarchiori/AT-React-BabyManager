import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";

import { useAuthentication } from "../services/AuthContext";

import ButtonComponent from "../components/button/button";
import babyFeet from "../assets/images/babyFeet.jpg";
import AvatarComponent from "../components/avatar/avatar";

export default function SignUp() {
  const navigation = useNavigate();
  const { t } = useTranslation();

  const { signUp } = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    try {
      await signUp(email, password);
      setLoading(false);
      navigation("/signin");
    } catch (error) {
      setLoading(false);
      alert(t("erro_registro"));
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <AvatarComponent
          src={babyFeet}
          sx={{
            width: 130,
            height: 123,
            margin: "0 auto",
            marginBottom: 2,
            borderRadius: 0,
          }}
        />
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, fontWeight: "bold", color: "#6c3baa" }}
        >
          {t("sign_up")}
        </Typography>

        <TextField
          label={t("email")}
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label={t("password")}
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label={t("confirm_password")}
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <ButtonComponent
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              mb: 2,
              height: 48,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("create_account_button")
            )}
          </ButtonComponent>

          <ButtonComponent
            sx={{
              width: "100%",
              height: 40,
              fontWeight: "bold",
              backgroundColor: "transparent",
              color: "#6c3baa",
              border: "1px solid #6c3baa",
            }}
            onClick={() => navigation("/signin")}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("has_account")
            )}
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
}
