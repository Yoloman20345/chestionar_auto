import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Failed from "./Failed";
import Success from "./Success";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
let random = [];
let index = 3;

function pickRandomNumbers(min, max, count) {
  // Create an array with all the numbers in the interval
  const numbers = Array.from(Array(max - min + 1), (_, i) => i + min);

  // Shuffle the array randomly
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Return the first `count` elements of the shuffled array
  return numbers.slice(0, count);
}
export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(1800);
  const [corecte, setCorecte] = useState(0);
  const [gresite, setGresite] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [nrq, setNrq] = useState(0);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  function func() {
    random = pickRandomNumbers(0, questions.length - 1, 26);
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/questions");
      setQuestions(res.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(interval);
          window.location.href = "/Failed";
        }
        return time - 1;
      });
    }, 1500);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitDisabled(true);
    // Get the answers from the form
    const answers = Array.from(event.target.elements).reduce((acc, element) => {
      if (element.type === "checkbox" && element.checked) {
        acc[element.name] = element.name;
      }
      return acc;
    }, {});
    let rez = [];

    for (let key in answers) {
      rez.push(answers[key]);
    }
    console.log(rez);
    questions.slice(random[nrq], random[nrq] + 1).forEach((question) => {
      // Check if the answer is correct

      let cnt = 0;

      for (let i = 0; i < question.correct.length; i++) {
        for (let j = 0; j < rez.length; j++) {
          if (rez[j] !== question.correct[i]) {
            cnt++;
            console.log("gresit");
          } else {
            console.log("corect");
          }
        }
      }
      if (cnt === rez.length * question.correct.length - 1 && cnt !== 0) {
        setGresite(gresite + 1);
      } else if (cnt === rez.length * question.correct.length && cnt !== 0) {
        setGresite(gresite + 1);
      } else {
        setCorecte(corecte + 1);
        console.log(cnt);
      }
    });
    setNrq(nrq + 1);
    if (corecte + gresite === 26) {
      setSuccess(true);
    }
    if (gresite === 4) {
      setFailed(true);
    }
  };
  const handleChange = (event) => {
    // Check if at least one checkbox is checked
    const isAtLeastOneChecked = event.target.form.querySelector(
      "input[type=checkbox]:checked"
    );
    setIsSubmitDisabled(!isAtLeastOneChecked);
  };
  if (random.length === 0) func();
  if (failed) {
    return <Failed></Failed>;
  } else if (success) {
    return <Success prop={corecte}></Success>;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>Intreabari corecte {corecte}</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>Intrebari gresite {gresite}</Item>
            </Grid>
          </Grid>
        </Box>

        <div>Time: {Math.floor(time / 60) + ":" + (time % 60)}</div>
        <div>Sunteti la intrebarea {nrq + 1} / 26</div>
        {questions
          .slice(random[nrq], random[nrq] + 1)
          .map((question, index) => {
            console.log(random);
            console.log(index);
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  padding: "20px",
                  border: "1px solid black",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  minHeight: "200px",
                  maxHeight: "500px",
                  overflow: "auto",
                }}
                key={question.questionId}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  {question.question}
                </h3>
                <img src={question.image}></img>
                {question.answers.map((answer) => (
                  <div key={answer.text}>
                    <label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        name={answer.text}
                        value={answer.text}
                      />
                      {answer.text}
                    </label>
                  </div>
                ))}
                <Button
                  sx={{ zIndex: 4, top: "20px" }}
                  disabled={isSubmitDisabled}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            );
          })}
      </form>
    );
  }
}
