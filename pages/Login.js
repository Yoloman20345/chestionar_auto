import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <form onSubmit={handleSubmit}>
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
        onChange={(e) => setEmail(e.target.value)}
        htmlFor="email"
        id="email"
        label="Email"
        variant="outlined"
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
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
