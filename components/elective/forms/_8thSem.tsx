import React, { useEffect, useState } from "react";
import { Subject } from "../../../contexts/AuthContext";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Loading from "../../UI/Loading";

type Props = {
  ELECTIVE_10_OPTIONS: Subject[];
  ELECTIVE_11_OPTIONS: Subject[];
  setSubmitted: (value: boolean) => void;
};

const elective_10 = "elective_10";
const elective_11 = "elective_11";

const ElectiveForm_8thSem = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [id, setId] = useState<string>();

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    if (_id) {
      setId(_id);
    }
  }, []);

  const [elective_10_option_1, setElective10Option1] = useState<string>("");
  const [elective_10_option_2, setElective10Option2] = useState<string>("");
  const [elective_10_option_3, setElective10Option3] = useState<string>("");
  const [elective_10_option_4, setElective10Option4] = useState<string>("");
  const [elective_10_option_5, setElective10Option5] = useState<string>("");

  const [elective_11_option_1, setElective11Option1] = useState<string>("");
  const [elective_11_option_2, setElective11Option2] = useState<string>("");
  const [elective_11_option_3, setElective11Option3] = useState<string>("");
  const [elective_11_option_4, setElective11Option4] = useState<string>("");
  const [elective_11_option_5, setElective11Option5] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (
    elective: string,
    option_number: number,
    event: SelectChangeEvent,
  ) => {
    switch (elective) {
      case elective_10:
        switch (option_number) {
          case 1:
            setElective10Option1(event.target.value);
            break;
          case 2:
            setElective10Option2(event.target.value);
            break;
          case 3:
            setElective10Option3(event.target.value);
            break;
          case 4:
            setElective10Option4(event.target.value);
            break;
          case 5:
            setElective10Option5(event.target.value);
            break;
        }
        break;
      case elective_11:
        switch (option_number) {
          case 1:
            setElective11Option1(event.target.value);
            break;
          case 2:
            setElective11Option2(event.target.value);
            break;
          case 3:
            setElective11Option3(event.target.value);
            break;
          case 4:
            setElective11Option4(event.target.value);
            break;
          case 5:
            setElective11Option5(event.target.value);
            break;
        }
        break;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const selected_subject_transformer = (subject: string) => {
      const separatedWordsArray = subject.split(" ");
      const subjectName = [...separatedWordsArray];
      subjectName.splice(0, 1);
      const subjectTitle = subjectName.join(" ");

      const transformed_selection = {
        CODE: separatedWordsArray[0],
        TITLE: subjectTitle,
      };
      return transformed_selection;
    };

    const elective_selections = {
      ELECTIVE_10: {
        OPTION_1: selected_subject_transformer(elective_10_option_1),
        ...(props.ELECTIVE_10_OPTIONS.length >= 2 && {
          OPTION_2: selected_subject_transformer(elective_10_option_2),
        }),
        ...(props.ELECTIVE_10_OPTIONS.length >= 3 && {
          OPTION_3: selected_subject_transformer(elective_10_option_3),
        }),
        ...(props.ELECTIVE_10_OPTIONS.length >= 4 && {
          OPTION_4: selected_subject_transformer(elective_10_option_4),
        }),
        ...(props.ELECTIVE_10_OPTIONS.length >= 5 && {
          OPTION_5: selected_subject_transformer(elective_10_option_5),
        }),
      },
      ELECTIVE_11: {
        OPTION_1: selected_subject_transformer(elective_11_option_1),
        ...(props.ELECTIVE_11_OPTIONS.length >= 2 && {
          OPTION_2: selected_subject_transformer(elective_11_option_2),
        }),
        ...(props.ELECTIVE_11_OPTIONS.length >= 3 && {
          OPTION_3: selected_subject_transformer(elective_11_option_3),
        }),
        ...(props.ELECTIVE_11_OPTIONS.length >= 4 && {
          OPTION_4: selected_subject_transformer(elective_11_option_4),
        }),
        ...(props.ELECTIVE_11_OPTIONS.length >= 5 && {
          OPTION_5: selected_subject_transformer(elective_11_option_5),
        }),
      },
    };

    const response = await fetch("/api/elective/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ elective_selections, _id: id }),
    });
    const data = await response.json();

    if (response.ok && data) {
      props.setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Box sx={{ maxWidth: 600 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Elective X</StepLabel>
            <StepContent>
              {/* Option 1 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 1
                </InputLabel>
                <Select
                  value={elective_10_option_1}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(elective_10, 1, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 1"
                >
                  {props.ELECTIVE_10_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          elective_10_option_1 === subjectName ||
                          elective_10_option_2 === subjectName ||
                          elective_10_option_3 === subjectName ||
                          elective_10_option_4 === subjectName ||
                          elective_10_option_5 === subjectName
                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 2 */}
              {props.ELECTIVE_10_OPTIONS.length > 1 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 2
                  </InputLabel>
                  <Select
                    value={elective_10_option_2}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_10, 2, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 2"
                  >
                    {props.ELECTIVE_10_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_10_option_1 === subjectName ||
                            elective_10_option_2 === subjectName ||
                            elective_10_option_3 === subjectName ||
                            elective_10_option_4 === subjectName ||
                            elective_10_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 3 */}
              {props.ELECTIVE_10_OPTIONS.length > 2 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 3
                  </InputLabel>
                  <Select
                    value={elective_10_option_3}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_10, 3, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 3"
                  >
                    {props.ELECTIVE_10_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_10_option_1 === subjectName ||
                            elective_10_option_2 === subjectName ||
                            elective_10_option_3 === subjectName ||
                            elective_10_option_4 === subjectName ||
                            elective_10_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 4 */}
              {props.ELECTIVE_10_OPTIONS.length > 3 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 4
                  </InputLabel>
                  <Select
                    value={elective_10_option_4}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_10, 4, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 4"
                  >
                    {props.ELECTIVE_10_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_10_option_1 === subjectName ||
                            elective_10_option_2 === subjectName ||
                            elective_10_option_3 === subjectName ||
                            elective_10_option_4 === subjectName ||
                            elective_10_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 5 */}
              {props.ELECTIVE_10_OPTIONS.length > 4 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 5
                  </InputLabel>
                  <Select
                    value={elective_10_option_5}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_10, 5, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.ELECTIVE_10_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_10_option_1 === subjectName ||
                            elective_10_option_2 === subjectName ||
                            elective_10_option_3 === subjectName ||
                            elective_10_option_4 === subjectName ||
                            elective_10_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={
                      elective_10_option_1 === "" ||
                      (props.ELECTIVE_10_OPTIONS.length > 1 &&
                        elective_10_option_2 === "") ||
                      (props.ELECTIVE_10_OPTIONS.length > 2 &&
                        elective_10_option_3 === "") ||
                      (props.ELECTIVE_10_OPTIONS.length > 3 &&
                        elective_10_option_4 === "") ||
                      (props.ELECTIVE_10_OPTIONS.length > 4 &&
                        elective_10_option_5 === "")
                    }
                  >
                    {activeStep === 2 ? "Finish" : "Continue"}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Elective XI</StepLabel>
            <StepContent>
              {/* Option 1 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 1
                </InputLabel>
                <Select
                  value={elective_11_option_1}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(elective_11, 1, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 1"
                >
                  {props.ELECTIVE_11_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          elective_11_option_1 === subjectName ||
                          elective_11_option_2 === subjectName ||
                          elective_11_option_3 === subjectName ||
                          elective_11_option_4 === subjectName ||
                          elective_11_option_5 === subjectName
                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 2 */}
              {props.ELECTIVE_11_OPTIONS.length > 1 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 2
                  </InputLabel>
                  <Select
                    value={elective_11_option_2}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_11, 2, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 2"
                  >
                    {props.ELECTIVE_11_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_11_option_1 === subjectName ||
                            elective_11_option_2 === subjectName ||
                            elective_11_option_3 === subjectName ||
                            elective_11_option_4 === subjectName ||
                            elective_11_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 3 */}
              {props.ELECTIVE_11_OPTIONS.length > 2 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 3
                  </InputLabel>
                  <Select
                    value={elective_11_option_3}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_11, 3, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 3"
                  >
                    {props.ELECTIVE_11_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_11_option_1 === subjectName ||
                            elective_11_option_2 === subjectName ||
                            elective_11_option_3 === subjectName ||
                            elective_11_option_4 === subjectName ||
                            elective_11_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 4 */}
              {props.ELECTIVE_11_OPTIONS.length > 3 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 4
                  </InputLabel>
                  <Select
                    value={elective_11_option_4}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_11, 4, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 4"
                  >
                    {props.ELECTIVE_11_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_11_option_1 === subjectName ||
                            elective_11_option_2 === subjectName ||
                            elective_11_option_3 === subjectName ||
                            elective_11_option_4 === subjectName ||
                            elective_11_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 5 */}
              {props.ELECTIVE_11_OPTIONS.length > 4 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 5
                  </InputLabel>
                  <Select
                    value={elective_11_option_5}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_11, 5, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.ELECTIVE_11_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_11_option_1 === subjectName ||
                            elective_11_option_2 === subjectName ||
                            elective_11_option_3 === subjectName ||
                            elective_11_option_4 === subjectName ||
                            elective_11_option_5 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={
                      elective_11_option_1 === "" ||
                      (props.ELECTIVE_11_OPTIONS.length > 1 &&
                        elective_11_option_2 === "") ||
                      (props.ELECTIVE_11_OPTIONS.length > 2 &&
                        elective_11_option_3 === "") ||
                      (props.ELECTIVE_11_OPTIONS.length > 3 &&
                        elective_11_option_4 === "") ||
                      (props.ELECTIVE_11_OPTIONS.length > 4 &&
                        elective_11_option_5 === "")
                    }
                  >
                    Continue
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        {activeStep === 2 && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Button
              onClick={handleSubmit}
              sx={{ mt: 1, mr: 1 }}
              variant="outlined"
              disabled={submitting}
            >
              Submit
            </Button>
            <Button
              variant="text"
              onClick={handleBack}
              sx={{ mt: 1, mr: 1 }}
              disabled={submitting}
            >
              Back
            </Button>
            {submitting && <Loading title="Submitting" />}
          </Paper>
        )}
      </Box>
    </>
  );
};

export default ElectiveForm_8thSem;
