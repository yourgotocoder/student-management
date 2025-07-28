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
  ELECTIVE_1_OPTIONS: Subject[];
  SPECIALIZATION_OPTIONS: Subject[];
  setSubmitted: (value: boolean) => void;
};

const elective_1 = "elective_1";
const specialization = "specialization";

const ElectiveForm_3rdSem = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [id, setId] = useState<string>();

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    if (_id) {
      setId(_id);
    }
  }, []);

  const [elective_1_option_1, setElective1Option1] = useState<string>("");
  const [elective_1_option_2, setElective1Option2] = useState<string>("");
  const [elective_1_option_3, setElective1Option3] = useState<string>("");
  const [elective_1_option_4, setElective1Option4] = useState<string>("");
  const [elective_1_option_5, setElective1Option5] = useState<string>("");
  const [elective_1_option_6, setElective1Option6] = useState<string>("");

  const [specialization_option_1, setSpecializationOption1] =
    useState<string>("");
  const [specialization_option_2, setSpecializationOption2] =
    useState<string>("");
  const [specialization_option_3, setSpecializationOption3] =
    useState<string>("");
  const [specialization_option_4, setSpecializationOption4] =
    useState<string>("");
  const [specialization_option_5, setSpecializationOption5] =
    useState<string>("");
  const [specialization_option_6, setSpecializationOption6] =
    useState<string>("");
  const [specialization_option_7, setSpecializationOption7] =
    useState<string>("");
  const [specialization_option_8, setSpecializationOption8] =
    useState<string>("");
  const [specialization_option_9, setSpecializationOption9] =
    useState<string>("");
  const [specialization_option_10, setSpecializationOption10] =
    useState<string>("");
  const [specialization_option_11, setSpecializationOption11] =
    useState<string>("");
  const [specialization_option_12, setSpecializationOption12] =
    useState<string>("");
  const [specialization_option_13, setSpecializationOption13] =
    useState<string>("");
  const [specialization_option_14, setSpecializationOption14] =
    useState<string>("");
  const [specialization_option_15, setSpecializationOption15] =
    useState<string>("");
  const [specialization_option_16, setSpecializationOption16] =
    useState<string>("");
  const [specialization_option_17, setSpecializationOption17] =
    useState<string>("");
  const [specialization_option_18, setSpecializationOption18] =
    useState<string>("");
  const [specialization_option_19, setSpecializationOption19] =
    useState<string>("");
  const [specialization_option_20, setSpecializationOption20] =
    useState<string>("");
  const [specialization_option_21, setSpecializationOption21] =
    useState<string>("");
  const [specialization_option_22, setSpecializationOption22] =
    useState<string>("");
  const [specialization_option_23, setSpecializationOption23] =
    useState<string>("");
  const [specialization_option_24, setSpecializationOption24] =
    useState<string>("");
  const [specialization_option_25, setSpecializationOption25] =
    useState<string>("");
  const [specialization_option_26, setSpecializationOption26] =
    useState<string>("");
  const [specialization_option_27, setSpecializationOption27] =
    useState<string>("");
  const [specialization_option_28, setSpecializationOption28] =
    useState<string>("");
  const [specialization_option_29, setSpecializationOption29] =
    useState<string>("");
  const [specialization_option_30, setSpecializationOption30] =
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
      case elective_1:
        switch (option_number) {
          case 1:
            setElective1Option1(event.target.value);
            break;
          case 2:
            setElective1Option2(event.target.value);
            break;
          case 3:
            setElective1Option3(event.target.value);
            break;
          case 4:
            setElective1Option4(event.target.value);
            break;
          case 5:
            setElective1Option5(event.target.value);
            break;
          case 6:
            setElective1Option6(event.target.value);
            break;

        }
        break;
      case specialization:
        switch (option_number) {
          case 1:
            setSpecializationOption1(event.target.value);
            break;
          case 2:
            setSpecializationOption2(event.target.value);
            break;
          case 3:
            setSpecializationOption3(event.target.value);
            break;
          case 4:
            setSpecializationOption4(event.target.value);
            break;
          case 5:
            setSpecializationOption5(event.target.value);
            break;
          case 6:
            setSpecializationOption6(event.target.value);
            break;
          case 7:
            setSpecializationOption7(event.target.value);
            break;
          case 8:
            setSpecializationOption8(event.target.value);
            break;
          case 9:
            setSpecializationOption9(event.target.value);
            break;
          case 10:
            setSpecializationOption10(event.target.value);
            break;
          case 11:
            setSpecializationOption11(event.target.value);
            break;
          case 12:
            setSpecializationOption12(event.target.value);
            break;
          case 13:
            setSpecializationOption13(event.target.value);
            break;
          case 14:
            setSpecializationOption14(event.target.value);
            break;
          case 15:
            setSpecializationOption15(event.target.value);
            break;
          case 16:
            setSpecializationOption16(event.target.value);
            break;
          case 17:
            setSpecializationOption17(event.target.value);
            break;
          case 18:
            setSpecializationOption18(event.target.value);
            break;
          case 19:
            setSpecializationOption19(event.target.value);
            break;
          case 20:
            setSpecializationOption20(event.target.value);
            break;
          case 21:
            setSpecializationOption21(event.target.value);
            break;
          case 22:
            setSpecializationOption22(event.target.value);
            break;
          case 23:
            setSpecializationOption23(event.target.value);
            break;
          case 24:
            setSpecializationOption24(event.target.value);
            break;
          case 25:
            setSpecializationOption25(event.target.value);
            break;
          case 26:
            setSpecializationOption26(event.target.value);
            break;
          case 27:
            setSpecializationOption27(event.target.value);
            break;
          case 28:
            setSpecializationOption28(event.target.value);
            break;
          case 29:
            setSpecializationOption29(event.target.value);
            break;
          case 30:
            setSpecializationOption30(event.target.value);
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
      ELECTIVE_1: {
        OPTION_1: selected_subject_transformer(elective_1_option_1),
        ...(props.ELECTIVE_1_OPTIONS.length >= 2 && {
          OPTION_2: selected_subject_transformer(elective_1_option_2),
        }),
        ...(props.ELECTIVE_1_OPTIONS.length >= 3 && {
          OPTION_3: selected_subject_transformer(elective_1_option_3),
        }),
        ...(props.ELECTIVE_1_OPTIONS.length >= 4 && {
          OPTION_4: selected_subject_transformer(elective_1_option_4),
        }),
        ...(props.ELECTIVE_1_OPTIONS.length >= 5 && {
          OPTION_5: selected_subject_transformer(elective_1_option_5),
        }),
        ...(props.ELECTIVE_1_OPTIONS.length >= 6 && {
          OPTION_6: selected_subject_transformer(elective_1_option_6),
        }),

      },
      SPECIALIZATION: {
        OPTION_1: selected_subject_transformer(specialization_option_1),
        ...(props.SPECIALIZATION_OPTIONS.length >= 2 && {
          OPTION_2: selected_subject_transformer(specialization_option_2),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 3 && {
          OPTION_3: selected_subject_transformer(specialization_option_3),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 4 && {
          OPTION_4: selected_subject_transformer(specialization_option_4),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 5 && {
          OPTION_5: selected_subject_transformer(specialization_option_5),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 6 && {
          OPTION_6: selected_subject_transformer(specialization_option_6),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 7 && {
          OPTION_7: selected_subject_transformer(specialization_option_7),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 8 && {
          OPTION_8: selected_subject_transformer(specialization_option_8),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 9 && {
          OPTION_9: selected_subject_transformer(specialization_option_9),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 10 && {
          OPTION_10: selected_subject_transformer(specialization_option_10),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 11 && {
          OPTION_11: selected_subject_transformer(specialization_option_11),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 12 && {
          OPTION_12: selected_subject_transformer(specialization_option_12),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 13 && {
          OPTION_13: selected_subject_transformer(specialization_option_13),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 14 && {
          OPTION_14: selected_subject_transformer(specialization_option_14),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 15 && {
          OPTION_15: selected_subject_transformer(specialization_option_15),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 16 && {
          OPTION_16: selected_subject_transformer(specialization_option_16),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 17 && {
          OPTION_17: selected_subject_transformer(specialization_option_17),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 18 && {
          OPTION_18: selected_subject_transformer(specialization_option_18),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 19 && {
          OPTION_19: selected_subject_transformer(specialization_option_19),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 20 && {
          OPTION_20: selected_subject_transformer(specialization_option_20),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 21 && {
          OPTION_21: selected_subject_transformer(specialization_option_21),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 22 && {
          OPTION_22: selected_subject_transformer(specialization_option_22),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 23 && {
          OPTION_23: selected_subject_transformer(specialization_option_23),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 24 && {
          OPTION_24: selected_subject_transformer(specialization_option_24),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 25 && {
          OPTION_25: selected_subject_transformer(specialization_option_25),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 26 && {
          OPTION_26: selected_subject_transformer(specialization_option_26),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 27 && {
          OPTION_27: selected_subject_transformer(specialization_option_27),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 28 && {
          OPTION_28: selected_subject_transformer(specialization_option_28),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 29 && {
          OPTION_29: selected_subject_transformer(specialization_option_29),
        }),
        ...(props.SPECIALIZATION_OPTIONS.length >= 30 && {
          OPTION_30: selected_subject_transformer(specialization_option_30),
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
    console.log(data);
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
            <StepLabel>ELECTIVE I</StepLabel>
            <StepContent>
              {/* Option 1 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 1
                </InputLabel>
                <Select
                  value={elective_1_option_1}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(elective_1, 1, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 1"
                >
                  {props.ELECTIVE_1_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          elective_1_option_1 === subjectName ||
                          elective_1_option_2 === subjectName ||
                          elective_1_option_3 === subjectName ||
                          elective_1_option_4 === subjectName ||
                          elective_1_option_5 === subjectName ||
                          elective_1_option_6 === subjectName

                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 2 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 2
                </InputLabel>
                <Select
                  value={elective_1_option_2}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(elective_1, 2, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 2"
                >
                  {props.ELECTIVE_1_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          elective_1_option_1 === subjectName ||
                          elective_1_option_2 === subjectName ||
                          elective_1_option_3 === subjectName ||
                          elective_1_option_4 === subjectName ||
                          elective_1_option_5 === subjectName ||
                          elective_1_option_6 === subjectName

                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 3 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 3
                </InputLabel>
                <Select
                  value={elective_1_option_3}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(elective_1, 3, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 3"
                >
                  {props.ELECTIVE_1_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          elective_1_option_1 === subjectName ||
                          elective_1_option_2 === subjectName ||
                          elective_1_option_3 === subjectName ||
                          elective_1_option_4 === subjectName ||
                          elective_1_option_5 === subjectName ||
                          elective_1_option_6 === subjectName

                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 4 */}
              {props.ELECTIVE_1_OPTIONS.length > 3 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 4
                  </InputLabel>
                  <Select
                    value={elective_1_option_4}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_1, 4, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 4"
                  >
                    {props.ELECTIVE_1_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_1_option_1 === subjectName ||
                            elective_1_option_2 === subjectName ||
                            elective_1_option_3 === subjectName ||
                            elective_1_option_4 === subjectName ||
                            elective_1_option_5 === subjectName ||
                            elective_1_option_6 === subjectName

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
              {props.ELECTIVE_1_OPTIONS.length > 4 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 5
                  </InputLabel>
                  <Select
                    value={elective_1_option_5}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_1, 5, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.ELECTIVE_1_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_1_option_1 === subjectName ||
                            elective_1_option_2 === subjectName ||
                            elective_1_option_3 === subjectName ||
                            elective_1_option_4 === subjectName ||
                            elective_1_option_5 === subjectName ||
                            elective_1_option_6 === subjectName

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
              {props.ELECTIVE_1_OPTIONS.length > 5 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 6
                  </InputLabel>
                  <Select
                    value={elective_1_option_6}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(elective_1, 6, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 6"
                  >
                    {props.ELECTIVE_1_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            elective_1_option_1 === subjectName ||
                            elective_1_option_2 === subjectName ||
                            elective_1_option_3 === subjectName ||
                            elective_1_option_4 === subjectName ||
                            elective_1_option_5 === subjectName ||
                            elective_1_option_6 === subjectName
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
                      elective_1_option_1 === "" ||
                      (props.ELECTIVE_1_OPTIONS.length > 1 &&
                        elective_1_option_2 === "") ||
                      (props.ELECTIVE_1_OPTIONS.length > 2 &&
                        elective_1_option_3 === "") ||
                      (props.ELECTIVE_1_OPTIONS.length > 3 &&
                        elective_1_option_4 === "") ||
                      (props.ELECTIVE_1_OPTIONS.length > 4 &&
                        elective_1_option_5 === "") ||
                      (props.ELECTIVE_1_OPTIONS.length > 5 &&
                        elective_1_option_6 === "")

                    }
                  >
                    Continue
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          {/* Specialization */}
          <Step>
            <StepLabel>Specialization</StepLabel>
            <StepContent>
              {/* Option 1 */}
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  OPTION 1
                </InputLabel>
                <Select
                  value={specialization_option_1}
                  onChange={(e: SelectChangeEvent) =>
                    handleChange(specialization, 1, e)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  label="OPTION 1"
                >
                  {props.SPECIALIZATION_OPTIONS.map((option) => {
                    const subjectName = `${option.CODE} ${option.TITLE}`;
                    return (
                      <MenuItem
                        value={subjectName}
                        key={option.CODE}
                        disabled={
                          specialization_option_1 === subjectName ||
                          specialization_option_2 === subjectName ||
                          specialization_option_3 === subjectName ||
                          specialization_option_4 === subjectName ||
                          specialization_option_5 === subjectName ||
                          specialization_option_6 === subjectName ||
                          specialization_option_7 === subjectName ||
                          specialization_option_8 === subjectName ||
                          specialization_option_9 === subjectName ||
                          specialization_option_10 === subjectName ||
                          specialization_option_11 === subjectName ||
                          specialization_option_12 === subjectName ||
                          specialization_option_13 === subjectName ||
                          specialization_option_14 === subjectName ||
                          specialization_option_15 === subjectName ||
                          specialization_option_16 === subjectName ||
                          specialization_option_17 === subjectName ||
                          specialization_option_18 === subjectName ||
                          specialization_option_19 === subjectName ||
                          specialization_option_20 === subjectName ||
                          specialization_option_21 === subjectName ||
                          specialization_option_22 === subjectName ||
                          specialization_option_23 === subjectName ||
                          specialization_option_24 === subjectName ||
                          specialization_option_25 === subjectName ||
                          specialization_option_26 === subjectName ||
                          specialization_option_27 === subjectName ||
                          specialization_option_28 === subjectName ||
                          specialization_option_29 === subjectName ||
                          specialization_option_30 === subjectName
                        }
                      >
                        {subjectName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* Option 2 */}
              {props.SPECIALIZATION_OPTIONS.length > 1 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 2
                  </InputLabel>
                  <Select
                    value={specialization_option_2}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 2, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 2"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
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
              {props.SPECIALIZATION_OPTIONS.length > 2 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 3
                  </InputLabel>
                  <Select
                    value={specialization_option_3}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 3, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 3"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
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
              {props.SPECIALIZATION_OPTIONS.length > 3 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 4
                  </InputLabel>
                  <Select
                    value={specialization_option_4}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 4, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 4"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 5 */}
              {props.SPECIALIZATION_OPTIONS.length > 4 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 5
                  </InputLabel>
                  <Select
                    value={specialization_option_5}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 5, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 5"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 6 */}
              {props.SPECIALIZATION_OPTIONS.length > 5 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 6
                  </InputLabel>
                  <Select
                    value={specialization_option_6}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 6, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 6"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 7 */}
              {props.SPECIALIZATION_OPTIONS.length > 6 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 7
                  </InputLabel>
                  <Select
                    value={specialization_option_7}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 7, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 7"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 8 */}
              {props.SPECIALIZATION_OPTIONS.length > 7 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 8
                  </InputLabel>
                  <Select
                    value={specialization_option_8}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 8, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 8"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 9 */}
              {props.SPECIALIZATION_OPTIONS.length > 8 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 9
                  </InputLabel>
                  <Select
                    value={specialization_option_9}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 9, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 9"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 10 */}
              {props.SPECIALIZATION_OPTIONS.length > 9 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 10
                  </InputLabel>
                  <Select
                    value={specialization_option_10}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 10, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 10"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 11 */}
              {props.SPECIALIZATION_OPTIONS.length > 10 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 11
                  </InputLabel>
                  <Select
                    value={specialization_option_11}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 11, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 11"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 12 */}
              {props.SPECIALIZATION_OPTIONS.length > 11 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 12
                  </InputLabel>
                  <Select
                    value={specialization_option_12}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 12, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 12"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 13 */}
              {props.SPECIALIZATION_OPTIONS.length > 12 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 13
                  </InputLabel>
                  <Select
                    value={specialization_option_13}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 13, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 13"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 14 */}
              {props.SPECIALIZATION_OPTIONS.length > 13 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 14
                  </InputLabel>
                  <Select
                    value={specialization_option_14}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 14, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 14"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 15 */}
              {props.SPECIALIZATION_OPTIONS.length > 14 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 15
                  </InputLabel>
                  <Select
                    value={specialization_option_15}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 15, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 15"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 16 */}
              {props.SPECIALIZATION_OPTIONS.length > 15 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 16
                  </InputLabel>
                  <Select
                    value={specialization_option_16}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 16, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 16"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 17 */}
              {props.SPECIALIZATION_OPTIONS.length > 16 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 17
                  </InputLabel>
                  <Select
                    value={specialization_option_17}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 17, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 17"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 18 */}
              {props.SPECIALIZATION_OPTIONS.length > 17 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 18
                  </InputLabel>
                  <Select
                    value={specialization_option_18}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 18, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 18"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 19 */}
              {props.SPECIALIZATION_OPTIONS.length > 18 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 19
                  </InputLabel>
                  <Select
                    value={specialization_option_19}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 19, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 19"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 20 */}
              {props.SPECIALIZATION_OPTIONS.length > 19 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 20
                  </InputLabel>
                  <Select
                    value={specialization_option_20}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 20, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 20"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 21 */}
              {props.SPECIALIZATION_OPTIONS.length > 20 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 21
                  </InputLabel>
                  <Select
                    value={specialization_option_21}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 21, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 21"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 22 */}
              {props.SPECIALIZATION_OPTIONS.length > 21 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 22
                  </InputLabel>
                  <Select
                    value={specialization_option_22}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 22, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 22"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 23 */}
              {props.SPECIALIZATION_OPTIONS.length > 22 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 23
                  </InputLabel>
                  <Select
                    value={specialization_option_23}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 23, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 23"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 24 */}
              {props.SPECIALIZATION_OPTIONS.length > 23 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 24
                  </InputLabel>
                  <Select
                    value={specialization_option_24}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 24, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 24"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 25 */}
              {props.SPECIALIZATION_OPTIONS.length > 24 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 25
                  </InputLabel>
                  <Select
                    value={specialization_option_25}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 25, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 25"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 26 */}
              {props.SPECIALIZATION_OPTIONS.length > 25 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 26
                  </InputLabel>
                  <Select
                    value={specialization_option_26}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 26, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 26"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 27 */}
              {props.SPECIALIZATION_OPTIONS.length > 26 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 27
                  </InputLabel>
                  <Select
                    value={specialization_option_27}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 27, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 27"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 28 */}
              {props.SPECIALIZATION_OPTIONS.length > 27 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 28
                  </InputLabel>
                  <Select
                    value={specialization_option_28}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 28, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 28"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 29 */}
              {props.SPECIALIZATION_OPTIONS.length > 28 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 29
                  </InputLabel>
                  <Select
                    value={specialization_option_29}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 29, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 29"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              {/* OPTION 30 */}
              {props.SPECIALIZATION_OPTIONS.length > 29 && (
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 30
                  </InputLabel>
                  <Select
                    value={specialization_option_30}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(specialization, 30, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 30"
                  >
                    {props.SPECIALIZATION_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            specialization_option_1 === subjectName ||
                            specialization_option_2 === subjectName ||
                            specialization_option_3 === subjectName ||
                            specialization_option_4 === subjectName ||
                            specialization_option_5 === subjectName ||
                            specialization_option_6 === subjectName ||
                            specialization_option_7 === subjectName ||
                            specialization_option_8 === subjectName ||
                            specialization_option_9 === subjectName ||
                            specialization_option_10 === subjectName ||
                            specialization_option_11 === subjectName ||
                            specialization_option_12 === subjectName ||
                            specialization_option_13 === subjectName ||
                            specialization_option_14 === subjectName ||
                            specialization_option_15 === subjectName ||
                            specialization_option_16 === subjectName ||
                            specialization_option_17 === subjectName ||
                            specialization_option_18 === subjectName ||
                            specialization_option_19 === subjectName ||
                            specialization_option_20 === subjectName ||
                            specialization_option_21 === subjectName ||
                            specialization_option_22 === subjectName ||
                            specialization_option_23 === subjectName ||
                            specialization_option_24 === subjectName ||
                            specialization_option_25 === subjectName ||
                            specialization_option_26 === subjectName ||
                            specialization_option_27 === subjectName ||
                            specialization_option_28 === subjectName ||
                            specialization_option_29 === subjectName ||
                            specialization_option_30 === subjectName
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
                      specialization_option_1 === "" ||
                      (props.SPECIALIZATION_OPTIONS.length > 1 &&
                        specialization_option_2 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 2 &&
                        specialization_option_3 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 3 &&
                        specialization_option_4 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 4 &&
                        specialization_option_5 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 5 &&
                        specialization_option_6 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 6 &&
                        specialization_option_7 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 7 &&
                        specialization_option_8 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 8 &&
                        specialization_option_9 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 9 &&
                        specialization_option_10 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 10 &&
                        specialization_option_11 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 11 &&
                        specialization_option_12 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 12 &&
                        specialization_option_13 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 13 &&
                        specialization_option_14 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 14 &&
                        specialization_option_15 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 15 &&
                        specialization_option_16 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 16 &&
                        specialization_option_17 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 17 &&
                        specialization_option_18 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 18 &&
                        specialization_option_19 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 19 &&
                        specialization_option_20 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 20 &&
                        specialization_option_21 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 21 &&
                        specialization_option_22 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 22 &&
                        specialization_option_23 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 23 &&
                        specialization_option_24 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 24 &&
                        specialization_option_25 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 25 &&
                        specialization_option_26 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 26 &&
                        specialization_option_27 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 27 &&
                        specialization_option_28 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 28 &&
                        specialization_option_29 === "") ||
                      (props.SPECIALIZATION_OPTIONS.length > 29 &&
                        specialization_option_30 === "")
                    }
                  >
                    Continue
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

export default ElectiveForm_3rdSem;
