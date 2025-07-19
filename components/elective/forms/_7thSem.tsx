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
  OPEN_ELECTIVE_4_OPTIONS: Subject[];
  setSubmitted: (value: boolean) => void;
};

const open_elective_4 = "open_elective_4";

const ElectiveForm_7thSem = (props: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [id, setId] = useState<string>();

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    if (_id) {
      setId(_id);
    }
  }, []);

  const [open_elective_4_option_1, setOpenElective4Option1] =
    useState<string>("");
  const [open_elective_4_option_2, setOpenElective4Option2] =
    useState<string>("");
  const [open_elective_4_option_3, setOpenElective4Option3] =
    useState<string>("");
  const [open_elective_4_option_4, setOpenElective4Option4] =
    useState<string>("");
  const [open_elective_4_option_5, setOpenElective4Option5] =
    useState<string>("");
  const [open_elective_4_option_6, setOpenElective4Option6] =
    useState<string>("");
  const [open_elective_4_option_7, setOpenElective4Option7] =
    useState<string>("");
  const [open_elective_4_option_8, setOpenElective4Option8] =
    useState<string>("");
  const [open_elective_4_option_9, setOpenElective4Option9] =
    useState<string>("");
  const [open_elective_4_option_10, setOpenElective4Option10] =
    useState<string>("");
  const [open_elective_4_option_11, setOpenElective4Option11] =
    useState<string>("");
  const [open_elective_4_option_12, setOpenElective4Option12] =
    useState<string>("");
  const [open_elective_4_option_13, setOpenElective4Option13] =
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
      case open_elective_4:
        switch (option_number) {
          case 1:
            setOpenElective4Option1(event.target.value);
            break;
          case 2:
            setOpenElective4Option2(event.target.value);
            break;
          case 3:
            setOpenElective4Option3(event.target.value);
            break;
          case 4:
            setOpenElective4Option4(event.target.value);
            break;
          case 5:
            setOpenElective4Option5(event.target.value);
            break;
          case 6:
            setOpenElective4Option6(event.target.value);
            break;
          case 7:
            setOpenElective4Option7(event.target.value);
            break;
          case 8:
            setOpenElective4Option8(event.target.value);
            break;
          case 9:
            setOpenElective4Option9(event.target.value);
            break;
          case 10:
            setOpenElective4Option10(event.target.value);
            break;
          case 11:
            setOpenElective4Option11(event.target.value);
            break;
          case 12:
            setOpenElective4Option12(event.target.value);
            break;
          case 13:
            setOpenElective4Option13(event.target.value);
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
      ...(props.OPEN_ELECTIVE_4_OPTIONS && {
        OPEN_ELECTIVE_4: {
          OPTION_1: selected_subject_transformer(open_elective_4_option_1),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 2 && {
            OPTION_2: selected_subject_transformer(open_elective_4_option_2),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 3 && {
            OPTION_3: selected_subject_transformer(open_elective_4_option_3),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 4 && {
            OPTION_4: selected_subject_transformer(open_elective_4_option_4),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 5 && {
            OPTION_5: selected_subject_transformer(open_elective_4_option_5),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 6 && {
            OPTION_6: selected_subject_transformer(open_elective_4_option_6),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 7 && {
            OPTION_7: selected_subject_transformer(open_elective_4_option_7),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 8 && {
            OPTION_8: selected_subject_transformer(open_elective_4_option_8),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 9 && {
            OPTION_9: selected_subject_transformer(open_elective_4_option_9),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 10 && {
            OPTION_10: selected_subject_transformer(open_elective_4_option_10),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 11 && {
            OPTION_11: selected_subject_transformer(open_elective_4_option_11),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 12 && {
            OPTION_12: selected_subject_transformer(open_elective_4_option_12),
          }),
          ...(props.OPEN_ELECTIVE_4_OPTIONS.length >= 13 && {
            OPTION_13: selected_subject_transformer(open_elective_4_option_13),
          }),

        },
      }),
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
          {props.OPEN_ELECTIVE_4_OPTIONS && (
            <Step>
              <StepLabel>Open Elective IV</StepLabel>
              <StepContent>
                {/* Option 1 */}
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    OPTION 1
                  </InputLabel>
                  <Select
                    value={open_elective_4_option_1}
                    onChange={(e: SelectChangeEvent) =>
                      handleChange(open_elective_4, 1, e)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    label="OPTION 1"
                  >
                    {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                      const subjectName = `${option.CODE} ${option.TITLE}`;
                      return (
                        <MenuItem
                          value={subjectName}
                          key={option.CODE}
                          disabled={
                            open_elective_4_option_1 === subjectName ||
                            open_elective_4_option_2 === subjectName ||
                            open_elective_4_option_3 === subjectName ||
                            open_elective_4_option_4 === subjectName ||
                            open_elective_4_option_5 === subjectName ||
                            open_elective_4_option_6 === subjectName ||
                            open_elective_4_option_7 === subjectName ||
                            open_elective_4_option_8 === subjectName ||
                            open_elective_4_option_9 === subjectName ||
                            open_elective_4_option_10 === subjectName ||
                            open_elective_4_option_11 === subjectName ||
                            open_elective_4_option_12 === subjectName ||
                            open_elective_4_option_13 === subjectName
                          }
                        >
                          {subjectName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {/* Option 2 */}
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 1 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 2
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_2}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 2, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 2"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
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
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 2 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 3
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_3}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 3, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 3"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
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
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 3 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 4
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_4}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 4, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 4"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
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
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 4 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 5
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_5}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 5, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 5"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
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
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 5 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 6
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_6}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 6, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 6"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
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
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 6 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 7
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_7}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 7, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 7"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
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
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 7 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 8
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_8}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 8, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 8"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
                            }
                          >
                            {subjectName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {/* Option 9 */}
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 8 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 9
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_9}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 9, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 9"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
                            }
                          >
                            {subjectName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {/* Option 10 */}
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 9 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 10
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_10}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 10, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 10"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
                            }
                          >
                            {subjectName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {/* Option 11 */}
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 10 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 11
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_11}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 11, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 11"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
                            }
                          >
                            {subjectName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {/* Option 12 */}
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 11 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 12
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_12}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 12, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 12"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
                            }
                          >
                            {subjectName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {/* Option 13 */}
                {props.OPEN_ELECTIVE_4_OPTIONS.length > 12 && (
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      OPTION 13
                    </InputLabel>
                    <Select
                      value={open_elective_4_option_13}
                      onChange={(e: SelectChangeEvent) =>
                        handleChange(open_elective_4, 13, e)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      label="OPTION 13"
                    >
                      {props.OPEN_ELECTIVE_4_OPTIONS.map((option) => {
                        const subjectName = `${option.CODE} ${option.TITLE}`;
                        return (
                          <MenuItem
                            value={subjectName}
                            key={option.CODE}
                            disabled={
                              open_elective_4_option_1 === subjectName ||
                              open_elective_4_option_2 === subjectName ||
                              open_elective_4_option_3 === subjectName ||
                              open_elective_4_option_4 === subjectName ||
                              open_elective_4_option_5 === subjectName ||
                              open_elective_4_option_6 === subjectName ||
                              open_elective_4_option_7 === subjectName ||
                              open_elective_4_option_8 === subjectName ||
                              open_elective_4_option_9 === subjectName ||
                              open_elective_4_option_10 === subjectName ||
                              open_elective_4_option_11 === subjectName ||
                              open_elective_4_option_12 === subjectName ||
                              open_elective_4_option_13 === subjectName
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
                        open_elective_4_option_1 === "" ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 1 &&
                          open_elective_4_option_2 === "") ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 2 &&
                          open_elective_4_option_3 === "") ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 3 &&
                          open_elective_4_option_4 === "") ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 4 &&
                          open_elective_4_option_5 === "") ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 5 &&
                          open_elective_4_option_6 === "") ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 6 &&
                          open_elective_4_option_7 === "") ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 7 &&
                          open_elective_4_option_8 === "") ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 8 &&
                          open_elective_4_option_9 === "")
                        ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 9 &&
                          open_elective_4_option_10 === "")
                        ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 10 &&
                          open_elective_4_option_11 === "")
                        ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 11 &&
                          open_elective_4_option_12 === "")
                        ||
                        (props.OPEN_ELECTIVE_4_OPTIONS.length > 12 &&
                          open_elective_4_option_13 === "")
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
          )}
        </Stepper>
        {!props.OPEN_ELECTIVE_4_OPTIONS && activeStep === 1 && (
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
        {props.OPEN_ELECTIVE_4_OPTIONS && activeStep === 1 && (
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
