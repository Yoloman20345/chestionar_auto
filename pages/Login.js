import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Alerta from "./Alerta";
import Error_user from "./Error_user";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert(true);
      return;
    } else {
      setAlert(false);
    }

    // Send a POST request to the /api/login endpoint with the email and password
    axios
      .post("/api/login", { email, password })
      .then((response) => {
        // If the login is successful, set the JWT in a cookie
        document.cookie = `jwt=${response.data}`;

        // Redirect to the dashboard page
        window.location.href = "/Dashboard";
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(!emailRegex.test(event.target.value));
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <Error_user props={error}></Error_user>}
      {alert && <Alerta></Alerta>}
      <TextField
        sx={{
          width: "25ch",
          margin: "2px",
          padding: "2px",
          top: "200px",
          left: "600px",
        }}
        type="email"
        value={email}
        onChange={handleEmailChange}
        htmlFor="email"
        id="email"
        label="Email"
        variant="outlined"
        error={emailError}
        helperText={emailError ? "Please enter a valid email" : ""}
      />
      <br />
      <TextField
        sx={{
          width: "25ch",
          margin: "2px",
          padding: "2px",
          top: "200px",
          left: "600px",
        }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        htmlFor="password"
        id="password"
        label="Password"
        variant="outlined"
      />

      <br />
      <Button
        variant="contained"
        sx={{
          width: "10ch",
          margin: "2px",
          padding: "2px",
          top: "200px",
          left: "600px",
        }}
        href="/Register"
      >
        Register
      </Button>

      <Button
        sx={{
          width: "10ch",
          margin: "2px",
          padding: "2px",
          top: "200px",
          left: "640px",
        }}
        type="submit"
        variant="contained"
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
