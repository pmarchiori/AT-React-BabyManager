import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";

import { useAuthentication } from "../services/AuthContext";
import AvatarComponent from "../components/avatar/avatar";
import ButtonComponent from "../components/button/button";

import babyFeet from "../assets/images/babyFeet.jpg";

export default function SignIn() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, setSession } = useAuthentication();

  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setLoading(true);

    signIn(email, password)
      .then(() => {
        setSession(true);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
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
          {t("welcome")}
        </Typography>

        <TextField
          label={t("email_label")}
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label={t("password_label")}
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("sign_in")
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
            onClick={() => navigate("/signup")}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("dont_have_account")
            )}
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
}
