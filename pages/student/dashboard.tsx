import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AuthContext, { Subject } from "../../contexts/AuthContext";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Dashboard.module.css";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";

type Props = {};

interface IOption {
  title: string;
  subjects: Subject[] | undefined;
}

const Dashboard = (props: Props) => {
  const { user, loading, logout } = useContext(AuthContext);
  const router = useRouter();

  const [options, setOptions] = useState<IOption[]>();
  const [selections, setSelections] = useState()

  useEffect(() => {
    const id = localStorage.getItem("_id");
    if (id === null) {
      router.replace("/");
    }
    if (!loading) {
      if (user) {
        if (user.CURRENT_SEM === 6) {
          setOptions([
            { title: "Elective IV", subjects: user.ELECTIVE_4_OPTIONS },
            { title: "ELECTIVE V", subjects: user.ELECTIVE_5_OPTIONS },
          ]);
        } else if (user.CURRENT_SEM === 4) {
          setOptions([
            { title: "Elective I", subjects: user.ELECTIVE_2_OPTIONS },
          ]);
        }
      }
    }
  }, [router, loading, user]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    //
  };

  const handleChange = () => {};

  let sideContent = <></>;
  let mainContent = <></>;

  if (loading) {
    mainContent = (
      <Card sx={{ padding: 1, maxHeight: "30rem", minHeight: "20rem" }}>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={30}></Skeleton>
          <Skeleton variant="rounded" height={30}></Skeleton>
          <Skeleton variant="rounded" height={30}></Skeleton>
          <Skeleton variant="rounded" height={30}></Skeleton>
          <Skeleton variant="rounded" height={30}></Skeleton>
        </Stack>
      </Card>
    );
    sideContent = (
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "3rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    );
  }

  if (!loading) {
    mainContent = (
      <Card
        sx={{ minHeight: "20rem", maxHeight: "30rem", padding: "1rem 2rem" }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {options &&
              options.map((option, index) => (
                <Step key={option.title}>
                  <StepLabel>{option.title}</StepLabel>
                  <StepContent>
                    {option.subjects &&
                      option.subjects.map((label, optionIndex) => (
                        <FormControl
                          sx={{ m: 1, minWidth: 320 }}
                          key={label.TITLE}
                        >
                          <InputLabel id="demo-simple-select-helper-label">
                            {`OPTION ${optionIndex + 1}`}
                          </InputLabel>
                          <Select
                            value={""}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            label="OPTION 1"
                          >
                            {option.subjects &&
                              option.subjects.map((subject) => (
                                <MenuItem value={`${subject.CODE} ${subject.TITLE}`} key={subject.CODE}>
                                  {`${subject.CODE} ${subject.TITLE}`}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      ))}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {options && index === options.length - 1
                            ? "Finish"
                            : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
          </Stepper>
          {options && activeStep === options.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleSubmit} sx={{ mt: 1, mr: 1 }}>
                Submit
              </Button>
            </Paper>
          )}
        </Box>
      </Card>
    );

    sideContent = (
      <Stack spacing={1} textAlign="center">
        <Typography variant="h5">Welcome</Typography>
        <Typography variant="body1">{user?.NAME}</Typography>
        <Typography variant="body2">Your CGPA in the database</Typography>
        <Typography variant={user?.CGPA ? "h4" : "body1"} fontWeight={500}>
          {user?.CGPA
            ? user?.CGPA?.toFixed(3)
            : "CGPA missing. Contact your TG. Electives can't be alloted to you"}
        </Typography>
        <Typography variant="body1">
          Elective will be allocated based on your CGPA
        </Typography>
      </Stack>
    );
  }

  return (
    <div className={styles.container}>
      {sideContent}
      {mainContent}
    </div>
  );
};

export default Dashboard;
