import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const Error_user = (prop) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">{prop.props}</Alert>
    </Stack>
  );
};

export default Error_user;
