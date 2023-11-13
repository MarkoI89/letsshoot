import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

function Register() {
  const navigate = useNavigate();
  const [infos, setInfos] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleUsername = (e) =>
    setInfos({ ...infos, username: e.target.value });
  const handleFirstName = (e) =>
    setInfos({ ...infos, firstName: e.target.value });
  const handleLastName = (e) =>
    setInfos({ ...infos, lastName: e.target.value });
  const handleEmail = (e) => setInfos({ ...infos, email: e.target.value });
  const handlePassword = (e) =>
    setInfos({ ...infos, password: e.target.value });
  const handleRole = (event) => {
    setInfos({ ...infos, role: event.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, infos)
      .then((response) => {
        console.log(response);
        // setShowModal(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className="registerContainer">
      <h2>Create an account!</h2>
      <form onSubmit={handleSignupSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={infos.username}
              onChange={handleUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              autoComplete="first name"
              value={infos.firstName}
              onChange={handleFirstName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              autoComplete="last name"
              value={infos.lastName}
              onChange={handleLastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={infos.email}
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
              value={infos.password}
              onChange={handlePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={infos.role}
                label="Age"
                onChange={handleRole}
                input={<OutlinedInput label="Age" />}
              >
                <MenuItem value={"photographer"}>photographer</MenuItem>
                <MenuItem value={"model"}>model</MenuItem>
                <MenuItem value={"makeup artist"}>makeup artist</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Grid>{" "}
        <br />
        <Button
          type="submit"
          halfwidth="true"
          variant="contained"
          className="signup-button"
        >
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
