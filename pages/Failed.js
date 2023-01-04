import Button from "@mui/material/Button";
const Failed = () => {
  return (
    <div>
      <h1>Ati picat testul</h1>
      <Button
        sx={{ zIndex: 4, top: "20px" }}
        onClick={() => {
          window.location.href = "/Dashboard";
        }}
        variant="contained"
      >
        Try again
      </Button>
    </div>
  );
};

export default Failed;
