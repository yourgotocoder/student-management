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
  ELECTIVE_8_OPTIONS: Subject[];
  ELECTIVE_9_OPTIONS: Subject[];
  OPEN_ELECTIVE_2_OPTIONS: Subject[];
  setSubmitted: (value: boolean) => void;
};

const elective_8 = "elective_8";
const elective_9 = "elective_9";
const open_elective_2 = "open_elective_2";

const ElectiveForm_7thSem = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [id, setId] = useState<string>();

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    if (_id) {
      setId(_id);
    }
  }, []);

  const [elective_8_option_1, setElective8Option1] = useState<string>("");
  const [elective_8_option_2, setElective8Option2] = useState<string>("");
  const [elective_8_option_3, setElective8Option3] = useState<string>("");
  const [elective_8_option_4, setElective8Option4] = useState<string>("");
  const [elective_8_option_5, setElective8Option5] = useState<string>("");
  const [elective_8_option_6, setElective8Option6] = useState<string>("");

  const [elective_9_option_1, setElective9Option1] = useState<string>("");
  const [elective_9_option_2, setElective9Option2] = useState<string>("");
  const [elective_9_option_3, setElective9Option3] = useState<string>("");
  const [elective_9_option_4, setElective9Option4] = useState<string>("");
  const [elective_9_option_5, setElective9Option5] = useState<string>("");
  const [elective_9_option_6, setElective9Option6] = useState<string>("");

  const [open_elective_2_option_1, setOpenElective2Option1] =
    useState<string>("");
  const [open_elective_2_option_2, setOpenElective2Option2] =
    useState<string>("");
  const [open_elective_2_option_3, setOpenElective2Option3] =
    useState<string>("");
  const [open_elective_2_option_4, setOpenElective2Option4] =
    useState<string>("");
  const [open_elective_2_option_5, setOpenElective2Option5] =
    useState<string>("");
  const [open_elective_2_option_6, setOpenElective2Option6] =
    useState<string>("");
  const [open_elective_2_option_7, setOpenElective2Option7] =
    useState<string>("");
  const [open_elective_2_option_8, setOpenElective2Option8] =
    useState<string>("");

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
      case elective_9:
        switch (option_number) {
          case 1:
            setElective9Option1(event.target.value);
            break;
          case 2:
            setElective9Option2(event.target.value);
            break;
          case 3:
            setElective9Option3(event.target.value);
            break;
          case 4:
            setElective9Option4(event.target.value);
            break;
          case 5:
            setElective9Option5(event.target.value);
            break;
          case 6:
            setElective9Option6(event.target.value);
            break;
        }
        break;
      case elective_8:
        switch (option_number) {
          case 1:
            setElective8Option1(event.target.value);
            break;
          case 2:
            setElective8Option2(event.target.value);
            break;
          case 3:
            setElective8Option3(event.target.value);
            break;
          case 4:
            setElective8Option4(event.target.value);
            break;
          case 5:
            setElective8Option5(event.target.value);
            break;
          case 6:
            setElective8Option6(event.target.value);
            break;
        }
        break;
      case open_elective_2:
        switch (option_number) {
          case 1:
            setOpenElective2Option1(event.target.value);
            break;
          case 2:
            setOpenElective2Option2(event.target.value);
            break;
          case 3:
            setOpenElective2Option3(event.target.value);
            break;
          case 4:
            setOpenElective2Option4(event.target.value);
            break;
          case 5:
            setOpenElective2Option5(event.target.value);
            break;
          case 6:
            setOpenElective2Option6(event.target.value);
            break;
          case 7:
            setOpenElective2Option7(event.target.value);
            break;
          case 8:
            setOpenElective2Option8(event.target.value);
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
      ELECTIVE_8: {
        OPTION_1: selected_subject_transformer(elective_8_option_1),
        ...(props.ELECTIVE_8_OPTIONS.length >= 2 && {
          OPTION_2: selected_subject_transformer(elective_8_option_2),
        }),
        ...(props.ELECTIVE_8_OPTIONS.length >= 3 && {
          OPTION_3: selected_subject_transformer(elective_8_option_3),
        }),
        ...(props.ELECTIVE_8_OPTIONS.length >= 4 && {
          OPTION_4: selected_subject_transformer(elective_8_option_4),
        }),
        ...(props.ELECTIVE_8_OPTIONS.length >= 5 && {
          OPTION_5: selected_subject_transformer(elective_8_option_5),
        }),
        ...(props.ELECTIVE_8_OPTIONS.length >= 6 && {
          OPTION_6: selected_subject_transformer(elective_8_option_6),
        }),
      },
      ELECTIVE_9: {
        OPTION_1: selected_subject_transformer(elective_9_option_1),
        ...(props.ELECTIVE_9_OPTIONS.length >= 2 && {
          OPTION_2: selected_subject_transformer(elective_9_option_2),
        }),
        ...(props.ELECTIVE_9_OPTIONS.length >= 3 && {
          OPTION_3: selected_subject_transformer(elective_9_option_3),
        }),
        ...(props.ELECTIVE_9_OPTIONS.length >= 4 && {
          OPTION_4: selected_subject_transformer(elective_9_option_4),
        }),
        ...(props.ELECTIVE_9_OPTIONS.length >= 5 && {
          OPTION_5: selected_subject_transformer(elective_9_option_5),
        }),
        ...(props.ELECTIVE_9_OPTIONS.length >= 6 && {
          OPTION_6: selected_subject_transformer(elective_9_option_6),
        }),
      },
      OPEN_ELECTIVE_2: {
        OPTION_1: selected_subject_transformer(open_elective_2_option_1),
        ...(props.OPEN_ELECTIVE_2_OPTIONS.length >= 2 && {
          OPTION_2: selected_subject_transformer(open_elective_2_option_2),
        }),
        ...(props.OPEN_ELECTIVE_2_OPTIONS.length >= 3 && {
          OPTION_3: selected_subject_transformer(open_elective_2_option_3),
        }),
        ...(props.OPEN_ELECTIVE_2_OPTIONS.length >= 4 && {
          OPTION_4: selected_subject_transformer(open_elective_2_option_4),
        }),
        ...(props.OPEN_ELECTIVE_2_OPTIONS.length >= 5 && {
          OPTION_5: selected_subject_transformer(open_elective_2_option_5),
        }),
        ...(props.OPEN_ELECTIVE_2_OPTIONS.length >= 6 && {
          OPTION_6: selected_subject_transformer(open_elective_2_option_6),
        }),
        ...(props.OPEN_ELECTIVE_2_OPTIONS.length >= 7 && {
          OPTION_7: selected_subject_transformer(open_elective_2_option_7),
        }),
        ...(props.OPEN_ELECTIVE_2_OPTIONS.length >= 8 && {
          OPTION_8: selected_subject_transformer(open_elective_2_option_8),
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
      <Box sx={{ maxWidth: 600, minHeight: 900 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Elective IX</StepLabel>
            <StepContent>
              {/* Option 1 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 1
                </InputLabel>
                <Select
                  value={elective_9_option_1}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(elective_9, 1, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 1"
                >
                  {props.ELECTIVE_9_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          elective_9_option_1 === subjectName ||
                          elective_9_option_2 === subjectName ||
                          elective_9_option_3 === subjectName ||
                          elective_9_option_4 === subjectName ||
                          elective_9_option_5 === subjectName ||
                          elective_9_option_6 === subjectName
                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 2 */}
              {props.ELECTIVE_9_OPTIONS.length > 1 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 2
                  </InputLabel>
                  <Select
                    value={elective_9_option_2}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_9, 2, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 2"
                  >
                    {props.ELECTIVE_9_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_9_option_1 === subjectName ||
                            elective_9_option_2 === subjectName ||
                            elective_9_option_3 === subjectName ||
                            elective_9_option_4 === subjectName ||
                            elective_9_option_5 === subjectName ||
                            elective_9_option_6 === subjectName
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
              {props.ELECTIVE_9_OPTIONS.length > 2 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 3
                  </InputLabel>
                  <Select
                    value={elective_9_option_3}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_9, 3, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 3"
                  >
                    {props.ELECTIVE_9_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_9_option_1 === subjectName ||
                            elective_9_option_2 === subjectName ||
                            elective_9_option_3 === subjectName ||
                            elective_9_option_4 === subjectName ||
                            elective_9_option_5 === subjectName ||
                            elective_9_option_6 === subjectName
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
              {props.ELECTIVE_9_OPTIONS.length > 3 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 4
                  </InputLabel>
                  <Select
                    value={elective_9_option_4}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_9, 4, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 4"
                  >
                    {props.ELECTIVE_9_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_9_option_1 === subjectName ||
                            elective_9_option_2 === subjectName ||
                            elective_9_option_3 === subjectName ||
                            elective_9_option_4 === subjectName ||
                            elective_9_option_5 === subjectName ||
                            elective_9_option_6 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/*Option 5 */}
              {props.ELECTIVE_9_OPTIONS.length > 4 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 5
                  </InputLabel>
                  <Select
                    value={elective_9_option_5}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_9, 5, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.ELECTIVE_9_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_9_option_1 === subjectName ||
                            elective_9_option_2 === subjectName ||
                            elective_9_option_3 === subjectName ||
                            elective_9_option_4 === subjectName ||
                            elective_9_option_5 === subjectName ||
                            elective_9_option_6 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/*Option 6 */}
              {props.ELECTIVE_9_OPTIONS.length > 5 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 6
                  </InputLabel>
                  <Select
                    value={elective_9_option_6}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_9, 6, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 6"
                  >
                    {props.ELECTIVE_9_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_9_option_1 === subjectName ||
                            elective_9_option_2 === subjectName ||
                            elective_9_option_3 === subjectName ||
                            elective_9_option_4 === subjectName ||
                            elective_9_option_5 === subjectName ||
                            elective_9_option_6 === subjectName
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
                      elective_9_option_1 === "" ||
                      (props.ELECTIVE_9_OPTIONS.length > 1 &&
                        elective_9_option_2 === "") ||
                      (props.ELECTIVE_9_OPTIONS.length > 2 &&
                        elective_9_option_3 === "") ||
                      (props.ELECTIVE_9_OPTIONS.length > 3 &&
                        elective_9_option_4 === "") ||
                      (props.ELECTIVE_9_OPTIONS.length > 4 &&
                        elective_9_option_5 === "") ||
                      (props.ELECTIVE_9_OPTIONS.length > 5 &&
                        elective_9_option_6 === "")
                    }
                  >
                    {activeStep === 3 ? "Finish" : "Continue"}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Elective VIII</StepLabel>
            <StepContent>
              {/* Option 1 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 1
                </InputLabel>
                <Select
                  value={elective_8_option_1}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(elective_8, 1, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 1"
                >
                  {props.ELECTIVE_8_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          elective_8_option_1 === subjectName ||
                          elective_8_option_2 === subjectName ||
                          elective_8_option_3 === subjectName ||
                          elective_8_option_4 === subjectName ||
                          elective_8_option_5 === subjectName ||
                          elective_8_option_6 === subjectName
                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 2 */}
              {props.ELECTIVE_8_OPTIONS.length > 1 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 2
                  </InputLabel>
                  <Select
                    value={elective_8_option_2}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_8, 2, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 2"
                  >
                    {props.ELECTIVE_8_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_8_option_1 === subjectName ||
                            elective_8_option_2 === subjectName ||
                            elective_8_option_3 === subjectName ||
                            elective_8_option_4 === subjectName ||
                            elective_8_option_5 === subjectName ||
                            elective_8_option_6 === subjectName
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
              {props.ELECTIVE_8_OPTIONS.length > 2 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 3
                  </InputLabel>
                  <Select
                    value={elective_8_option_3}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_8, 3, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 3"
                  >
                    {props.ELECTIVE_8_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_8_option_1 === subjectName ||
                            elective_8_option_2 === subjectName ||
                            elective_8_option_3 === subjectName ||
                            elective_8_option_4 === subjectName ||
                            elective_8_option_5 === subjectName ||
                            elective_8_option_6 === subjectName
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
              {props.ELECTIVE_8_OPTIONS.length > 3 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 4
                  </InputLabel>
                  <Select
                    value={elective_8_option_4}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_8, 4, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 4"
                  >
                    {props.ELECTIVE_8_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_8_option_1 === subjectName ||
                            elective_8_option_2 === subjectName ||
                            elective_8_option_3 === subjectName ||
                            elective_8_option_4 === subjectName ||
                            elective_8_option_5 === subjectName ||
                            elective_8_option_6 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
              {/*Option 5*/}
              {props.ELECTIVE_8_OPTIONS.length > 4 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 5
                  </InputLabel>
                  <Select
                    value={elective_8_option_5}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_8, 5, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.ELECTIVE_8_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_8_option_1 === subjectName ||
                            elective_8_option_2 === subjectName ||
                            elective_8_option_3 === subjectName ||
                            elective_8_option_4 === subjectName ||
                            elective_8_option_5 === subjectName ||
                            elective_8_option_6 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/*Option 6*/}
              {props.ELECTIVE_8_OPTIONS.length > 5 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 6
                  </InputLabel>
                  <Select
                    value={elective_8_option_6}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_8, 6, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.ELECTIVE_8_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_8_option_1 === subjectName ||
                            elective_8_option_2 === subjectName ||
                            elective_8_option_3 === subjectName ||
                            elective_8_option_4 === subjectName ||
                            elective_8_option_5 === subjectName ||
                            elective_8_option_6 === subjectName
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
                      elective_8_option_1 === "" ||
                      (props.ELECTIVE_8_OPTIONS.length > 1 &&
                        elective_8_option_2 === "") ||
                      (props.ELECTIVE_8_OPTIONS.length > 2 &&
                        elective_8_option_3 === "") ||
                      (props.ELECTIVE_8_OPTIONS.length > 3 &&
                        elective_8_option_4 === "") ||
                      (props.ELECTIVE_8_OPTIONS.length > 4 &&
                        elective_8_option_5 === "") ||
                      (props.ELECTIVE_8_OPTIONS.length > 5 &&
                        elective_8_option_6 === "")
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

          <Step>
            <StepLabel>Open Elective II</StepLabel>
            <StepContent>
              {/* Option 1 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 1
                </InputLabel>
                <Select
                  value={open_elective_2_option_1}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(open_elective_2, 1, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 1"
                >
                  {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          open_elective_2_option_1 === subjectName ||
                          open_elective_2_option_2 === subjectName ||
                          open_elective_2_option_3 === subjectName ||
                          open_elective_2_option_4 === subjectName ||
                          open_elective_2_option_5 === subjectName ||
                          open_elective_2_option_6 === subjectName ||
                          open_elective_2_option_7 === subjectName ||
                          open_elective_2_option_8 === subjectName
                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 2 */}
              {props.OPEN_ELECTIVE_2_OPTIONS.length > 1 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 2
                  </InputLabel>
                  <Select
                    value={open_elective_2_option_2}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_2, 2, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 2"
                  >
                    {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_2_option_1 === subjectName ||
                            open_elective_2_option_2 === subjectName ||
                            open_elective_2_option_3 === subjectName ||
                            open_elective_2_option_4 === subjectName ||
                            open_elective_2_option_5 === subjectName ||
                            open_elective_2_option_6 === subjectName ||
                            open_elective_2_option_7 === subjectName ||
                            open_elective_2_option_8 === subjectName
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
              {props.OPEN_ELECTIVE_2_OPTIONS.length > 2 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 3
                  </InputLabel>
                  <Select
                    value={open_elective_2_option_3}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_2, 3, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 3"
                  >
                    {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_2_option_1 === subjectName ||
                            open_elective_2_option_2 === subjectName ||
                            open_elective_2_option_3 === subjectName ||
                            open_elective_2_option_4 === subjectName ||
                            open_elective_2_option_5 === subjectName ||
                            open_elective_2_option_6 === subjectName ||
                            open_elective_2_option_7 === subjectName ||
                            open_elective_2_option_8 === subjectName
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
              {props.OPEN_ELECTIVE_2_OPTIONS.length > 3 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 4
                  </InputLabel>
                  <Select
                    value={open_elective_2_option_4}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_2, 4, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 4"
                  >
                    {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_2_option_1 === subjectName ||
                            open_elective_2_option_2 === subjectName ||
                            open_elective_2_option_3 === subjectName ||
                            open_elective_2_option_4 === subjectName ||
                            open_elective_2_option_5 === subjectName ||
                            open_elective_2_option_6 === subjectName ||
                            open_elective_2_option_7 === subjectName ||
                            open_elective_2_option_8 === subjectName
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
              {props.OPEN_ELECTIVE_2_OPTIONS.length > 4 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 5
                  </InputLabel>
                  <Select
                    value={open_elective_2_option_5}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_2, 5, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_2_option_1 === subjectName ||
                            open_elective_2_option_2 === subjectName ||
                            open_elective_2_option_3 === subjectName ||
                            open_elective_2_option_4 === subjectName ||
                            open_elective_2_option_5 === subjectName ||
                            open_elective_2_option_6 === subjectName ||
                            open_elective_2_option_7 === subjectName ||
                            open_elective_2_option_8 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 6 */}
              {props.OPEN_ELECTIVE_2_OPTIONS.length > 5 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 6
                  </InputLabel>
                  <Select
                    value={open_elective_2_option_6}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_2, 6, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 6"
                  >
                    {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_2_option_1 === subjectName ||
                            open_elective_2_option_2 === subjectName ||
                            open_elective_2_option_3 === subjectName ||
                            open_elective_2_option_4 === subjectName ||
                            open_elective_2_option_5 === subjectName ||
                            open_elective_2_option_6 === subjectName ||
                            open_elective_2_option_7 === subjectName ||
                            open_elective_2_option_8 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 7 */}
              {props.OPEN_ELECTIVE_2_OPTIONS.length > 6 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 7
                  </InputLabel>
                  <Select
                    value={open_elective_2_option_7}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_2, 7, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 7"
                  >
                    {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_2_option_1 === subjectName ||
                            open_elective_2_option_2 === subjectName ||
                            open_elective_2_option_3 === subjectName ||
                            open_elective_2_option_4 === subjectName ||
                            open_elective_2_option_5 === subjectName ||
                            open_elective_2_option_6 === subjectName ||
                            open_elective_2_option_7 === subjectName ||
                            open_elective_2_option_8 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* Option 8 */}
              {props.OPEN_ELECTIVE_2_OPTIONS.length > 7 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 8
                  </InputLabel>
                  <Select
                    value={open_elective_2_option_8}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_2, 8, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 8"
                  >
                    {props.OPEN_ELECTIVE_2_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_2_option_1 === subjectName ||
                            open_elective_2_option_2 === subjectName ||
                            open_elective_2_option_3 === subjectName ||
                            open_elective_2_option_4 === subjectName ||
                            open_elective_2_option_5 === subjectName ||
                            open_elective_2_option_6 === subjectName ||
                            open_elective_2_option_7 === subjectName ||
                            open_elective_2_option_8 === subjectName
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
                      open_elective_2_option_1 === "" ||
                      (props.OPEN_ELECTIVE_2_OPTIONS.length > 1 &&
                        open_elective_2_option_2 === "") ||
                      (props.OPEN_ELECTIVE_2_OPTIONS.length > 2 &&
                        open_elective_2_option_3 === "") ||
                      (props.OPEN_ELECTIVE_2_OPTIONS.length > 3 &&
                        open_elective_2_option_4 === "") ||
                      (props.OPEN_ELECTIVE_2_OPTIONS.length > 4 &&
                        open_elective_2_option_5 === "") ||
                      (props.OPEN_ELECTIVE_2_OPTIONS.length > 5 &&
                        open_elective_2_option_6 === "") ||
                      (props.OPEN_ELECTIVE_2_OPTIONS.length > 6 &&
                        open_elective_2_option_7 === "") ||
                      (props.OPEN_ELECTIVE_2_OPTIONS.length > 7 &&
                        open_elective_2_option_8 === "")
                    }
                  >
                    Finish
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
        {activeStep === 3 && (
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

export default ElectiveForm_7thSem;
