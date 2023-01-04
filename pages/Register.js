import { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
emailjs.init("service_aphv6dr", "usn3a_-geaQAWirYw");
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Email_confirm from "./Email_confirm";
import Alerta from "./Alerta";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const sendEmail = async (adress, mail) => {
    try {
      await emailjs.send("service_aphv6dr", "template_yzs53sh", {
        link: adress,
        email: mail,
      });
      console.log("Email successfully sent!");
      window.location.href = "/Email_confirm";
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setAlert(true);
      return;
    } else {
      setAlert(false);
    }

    // Send a POST request to the /api/register endpoint with the name, email, and password
    axios
      .post("/api/register", { name, email, password })
      .then((response) => {
        // If the registration is successful, set the JWT in a cookie
        document.cookie = `jwt=${response.data}`;
        let url = "http://localhost:3000/Login";
        // Redirect to the dashboard page
        //sendEmail(url, email);
        window.location.href = "/Login";
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
      {alert && <Alerta></Alerta>}
      <TextField
        sx={{
          width: "25ch",
          margin: "2px",
          padding: "2px",
          top: "200px",
          left: "600px",
        }}
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        variant="outlined"
        htmlFor="name"
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
        href="/Login"
      >
        Login
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
        Register
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
