import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const Alerta = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">Please fill all fields</Alert>
    </Stack>
  );
};

export default Alerta;
