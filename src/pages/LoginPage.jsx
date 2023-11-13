import { useState, useContext } from "react";
import Signup from "../components/Signup/Signup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext, AuthProviderWrapper } from "../context/auth.context";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Let's Shoot {""}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data);
        storeToken(response.data);
        authenticateUser();
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <AuthProviderWrapper>
      <ThemeProvider theme={theme}>
        <Container className="positionCenter" component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ padding: "50px" }}>
              <svg
                width="263.76999206542973"
                height="46.149396088370985"
                viewBox="0 0 370.18518518518516 64.76787826918662"
                class="css-1j8o68f"
              >
                <defs id="SvgjsDefs3573"></defs>
                <g
                  id="SvgjsG3574"
                  featurekey="PG4fjM-0"
                  transform="matrix(0.5621406435966492,0,0,0.5621406435966492,-2.6420613271160245,-2.632781452243679)"
                  fill="#49beb7"
                >
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path d="M74.4,84.2H50.3c-0.4,0-0.7-0.2-0.9-0.5l-12-20.8c-0.2-0.3-0.2-0.7,0-1l12-20.8c0.2-0.3,0.5-0.5,0.9-0.5h24.1         c0.4,0,0.7,0.2,0.9,0.5l12,20.8c0.2,0.3,0.2,0.7,0,1l-12,20.8C75,84,74.7,84.2,74.4,84.2z M50.9,82.2h22.9l11.5-19.8         L73.8,42.5H50.9L39.4,62.3L50.9,82.2z"></path>

                    <path d="M62.3,119.9c-31.8,0-57.6-25.8-57.6-57.6c0-7.3,1.4-14.4,4-21.2c0.2-0.4,0.5-0.6,0.9-0.6h62.8L53,6.8         c-0.2-0.3-0.2-0.6,0-0.9c0.1-0.3,0.4-0.5,0.8-0.6c2.8-0.4,5.7-0.6,8.6-0.6c31.8,0,57.6,25.8,57.6,57.6S94.1,119.9,62.3,119.9         z M10.4,42.5c-2.4,6.3-3.6,13-3.6,19.8c0,30.7,24.9,55.6,55.6,55.6s55.6-25,55.6-55.6S93,6.7,62.3,6.7         c-2.3,0-4.6,0.1-6.8,0.4L75,41c0.2,0.3,0.2,0.7,0,1c-0.2,0.3-0.5,0.5-0.9,0.5H10.4z"></path>

                    <path d="M74.2,42.5H9.7c-0.3,0-0.6-0.2-0.8-0.4c-0.2-0.3-0.2-0.6-0.1-0.9c7.5-19.1,24.8-32.8,45-35.8c0.4-0.1,0.8,0.1,1,0.5         L75,41c0.2,0.3,0.2,0.7,0,1C74.9,42.3,74.5,42.5,74.2,42.5z M11.2,40.5h61.3L53.3,7.4C34.6,10.5,18.6,23,11.2,40.5z"></path>

                    <path d="M18,98.5c-0.3,0-0.6-0.1-0.8-0.4C4.5,82.1,1.2,60.3,8.7,41.3c0.2-0.4,0.5-0.6,0.9-0.6h40.6c0.4,0,0.7,0.2,0.9,0.5         c0.2,0.3,0.2,0.7,0,1L18.8,98C18.7,98.3,18.4,98.5,18,98.5C18,98.5,18,98.5,18,98.5z M10.3,42.7c-6.7,17.7-3.8,37.9,7.6,53.1         l30.6-53.1H10.3z"></path>

                    <path d="M62.4,119.9c-17.4,0-34.1-7.9-45.1-21.7c-0.3-0.3-0.3-0.8-0.1-1.1L37.5,62c0.4-0.6,1.4-0.6,1.7,0l32.3,55.9         c0.2,0.3,0.2,0.6,0,0.9s-0.4,0.5-0.8,0.6C68,119.7,65.2,119.9,62.4,119.9z M19.3,97.5c12,14.7,30.9,22.3,49.7,20L38.4,64.5         L19.3,97.5z"></path>

                    <path d="M70.8,119.3c-0.4,0-0.7-0.2-0.9-0.5L49.6,83.6c-0.2-0.3-0.2-0.7,0-1c0.2-0.3,0.5-0.5,0.9-0.5H115         c0.3,0,0.6,0.2,0.8,0.4c0.2,0.3,0.2,0.6,0.1,0.9c-7.5,19.1-24.8,32.8-45,35.8C70.9,119.3,70.8,119.3,70.8,119.3z M52.2,84.1         l19.1,33.1c18.7-3,34.7-15.6,42.2-33.1H52.2z"></path>

                    <path d="M115,84H74.4c-0.4,0-0.7-0.2-0.9-0.5c-0.2-0.3-0.2-0.7,0-1l32.3-55.9c0.2-0.3,0.5-0.5,0.8-0.5c0.3,0,0.7,0.1,0.9,0.4         c12.7,16.1,16,37.8,8.5,56.9C115.8,83.7,115.4,84,115,84z M76.1,82h38.2c6.7-17.7,3.8-37.9-7.6-53.1L76.1,82z"></path>

                    <path d="M86.3,63.2c-0.4,0-0.7-0.2-0.9-0.5L53.1,6.8c-0.2-0.3-0.2-0.6,0-0.9s0.4-0.5,0.8-0.6c20.3-3,40.8,5.1,53.5,21         c0.3,0.3,0.3,0.8,0.1,1.1L87.1,62.7C87,63,86.6,63.2,86.3,63.2z M55.6,7.1l30.6,53.1l19.1-33.1C93.4,12.4,74.5,4.8,55.6,7.1z         "></path>
                  </g>
                </g>
                <g
                  id="SvgjsG3575"
                  featurekey="jxYttZ-0"
                  transform="matrix(2.7992265224456787,0,0,2.7992265224456787,81.08108133875969,-2.9961323553931223)"
                  fill="#49beb7"
                >
                  <path d="M3.62 18.16 l7.56 0 l0 1.84 l-9.78 0 l0 -15 l2.22 0 l0 13.16 z M22.5 15.08 l0 0.74 l-7.78 0 c0 1.82 1.74 2.7 3.02 2.7 c0.94 0 1.98 -0.5 2.54 -1.3 l1.42 1.28 c-0.66 0.9 -1.74 1.7 -3.96 1.7 c-3.2 0 -5.16 -2.18 -5.16 -5.12 s1.9 -5.14 4.96 -5.14 s4.46 1.7 4.88 4.18 c0.06 0.32 0.08 0.64 0.08 0.96 z M14.76 14.120000000000001 l5.58 0 c0 -1.6 -1.28 -2.48 -2.8 -2.48 s-2.78 1.02 -2.78 2.48 z M28.3 18.36 c0.64 0.26 1.14 0.08 1.44 -0.06 l0 1.6 c-0.26 0.16 -0.64 0.3 -1.18 0.3 c-1.18 0 -2.22 -0.38 -2.86 -1.42 c-0.6 -1 -0.6 -1.54 -0.6 -3.1 l0 -3.88 l-1.2 0 l0 -1.68 l1.2 0 l0 -3.12 l2.06 0 l0 3.12 l2.58 0 l0 1.68 l-2.58 0 l0 3.88 c0 1.64 0.16 2.24 1.14 2.68 z M34.94 7.18 c0 0.32 -0.08 0.6 -0.24 0.82 l-1.88 2.72 l-0.68 0 l0.74 -2.28 c-0.44 -0.24 -0.74 -0.7 -0.74 -1.26 c0 -0.76 0.62 -1.38 1.38 -1.38 c0.8 0 1.42 0.62 1.42 1.38 z M44.08 16.16 c0.04 0.12 0.38 1.1 -0.04 2.1 c-0.52 1.18 -1.9 1.94 -3.62 1.94 l-0.02 0 c-1.38 0 -2.64 -0.58 -3.58 -1.5 l1.34 -1.34 c0.56 0.72 1.36 1.08 2.24 1.08 c0.98 0 1.8 -0.36 2.02 -0.88 c0.14 -0.36 0.02 -0.74 0.02 -0.78 c-0.24 -0.6 -1.12 -0.72 -2.12 -0.94 c-1.34 -0.3 -2.68 -0.64 -3.2 -2.04 c-0.26 -0.72 -0.18 -1.56 0.18 -2.26 c0.82 -1.54 2.86 -1.6 3.1 -1.6 c1.38 0 2.68 0.52 3.6 1.46 l-1.34 1.34 c-0.56 -0.72 -1.38 -1.04 -2.26 -1.04 c-0.02 0 -1.2 0.02 -1.54 0.68 c-0.12 0.2 -0.18 0.54 -0.08 0.82 c0.2 0.56 1.1 0.74 2.06 0.96 c1.3 0.3 2.72 0.6 3.24 2 z M59.48 16.16 c0.04 0.12 0.38 1.1 -0.04 2.1 c-0.52 1.18 -1.9 1.94 -3.62 1.94 l-0.02 0 c-1.38 0 -2.64 -0.58 -3.58 -1.5 l1.34 -1.34 c0.56 0.72 1.36 1.08 2.24 1.08 c0.98 0 1.8 -0.36 2.02 -0.88 c0.14 -0.36 0.02 -0.74 0.02 -0.78 c-0.24 -0.6 -1.12 -0.72 -2.12 -0.94 c-1.34 -0.3 -2.68 -0.64 -3.2 -2.04 c-0.26 -0.72 -0.18 -1.56 0.18 -2.26 c0.82 -1.54 2.86 -1.6 3.1 -1.6 c1.38 0 2.68 0.52 3.6 1.46 l-1.34 1.34 c-0.56 -0.72 -1.38 -1.04 -2.26 -1.04 c-0.02 0 -1.2 0.02 -1.54 0.68 c-0.12 0.2 -0.18 0.54 -0.08 0.82 c0.2 0.56 1.1 0.74 2.06 0.96 c1.3 0.3 2.72 0.6 3.24 2 z M71.28 14.3 l0 5.7 l-2.06 0 l0 -5.5 c0 -2 -0.62 -2.88 -2.32 -2.88 c-1.92 0 -2.7 1.34 -2.7 3.08 l0 5.3 l-2.06 0 l0 -15 l2.06 0 l0 6.72 c0.28 -0.88 1.52 -1.68 2.7 -1.76 c2.68 -0.2 4.38 1.1 4.38 4.34 z M78.61999999999999 11.64 c-1.7 0 -3.08 1.42 -3.08 3.44 c0 2 1.38 3.44 3.08 3.44 s3.08 -1.44 3.08 -3.44 c0 -2.02 -1.38 -3.44 -3.08 -3.44 z M78.61999999999999 9.94 c2.84 0 5.14 2.2 5.14 5.14 s-2.3 5.12 -5.14 5.12 s-5.14 -2.18 -5.14 -5.12 s2.3 -5.14 5.14 -5.14 z M90.69999999999999 11.64 c-1.7 0 -3.08 1.42 -3.08 3.44 c0 2 1.38 3.44 3.08 3.44 s3.08 -1.44 3.08 -3.44 c0 -2.02 -1.38 -3.44 -3.08 -3.44 z M90.69999999999999 9.94 c2.84 0 5.14 2.2 5.14 5.14 s-2.3 5.12 -5.14 5.12 s-5.14 -2.18 -5.14 -5.12 s2.3 -5.14 5.14 -5.14 z M101.83999999999999 18.36 c0.64 0.26 1.14 0.08 1.44 -0.06 l0 1.6 c-0.26 0.16 -0.64 0.3 -1.18 0.3 c-1.18 0 -2.22 -0.38 -2.86 -1.42 c-0.6 -1 -0.6 -1.54 -0.6 -3.1 l0 -3.88 l-1.2 0 l0 -1.68 l1.2 0 l0 -3.12 l2.06 0 l0 3.12 l2.58 0 l0 1.68 l-2.58 0 l0 3.88 c0 1.64 0.16 2.24 1.14 2.68 z"></path>
                </g>
              </svg>
            </div>
            {/* <Typography component="h1" variant="h5">
              Log in
            </Typography> */}
            <Box component="form" noValidate onSubmit={handleLoginSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePassword}
                  />
                </Grid>
              </Grid>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log in
              </Button>
              <Grid container justifyContent="center">
                <Grid item>Don't have an account?</Grid>
                <br></br>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="signup-button"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </AuthProviderWrapper>
  );
}

export default LogIn;
