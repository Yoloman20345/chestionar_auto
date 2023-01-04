import Button from "@mui/material/Button";
const Success = (props) => {
  const value = props.prop;
  return (
    <div>
      <h1> Felicitari ai trecut testul! </h1>
      <h2> Ai raspuns corect la {value} intrebari </h2>
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
export default Success;
