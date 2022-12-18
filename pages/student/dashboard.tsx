import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AuthContext, { Subject } from "../../contexts/AuthContext";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Dashboard.module.css";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import { Box, Button } from "@mui/material";
import ElectiveForm_6thSem from "../../components/elective/forms/_6thSem";
import ElectiveForm_4thSem from "../../components/elective/forms/_4thSem";
import ElectiveSelections from "../../components/elective/ElectiveSelections";

type Props = {};

interface IOption {
  title: string;
  subjects: Subject[] | undefined;
}

const Dashboard = (props: Props) => {
  const { user, loading, logout } = useContext(AuthContext);
  const router = useRouter();

  const [options, setOptions] = useState<IOption[]>();

  const [submitted, setSubmitted] = useState<boolean>(false);

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
        sx={{ minHeight: "20rem", maxHeight: "30rem", padding: "1rem 0.4rem" }}
      >
        {user &&
          user.CURRENT_SEM === 6 &&
          user.ELECTIVE_4_OPTIONS &&
          user.ELECTIVE_5_OPTIONS &&
          !user.ELECTIVE_SELECTIONS &&
          !submitted && (
            <ElectiveForm_6thSem
              ELECTIVE_4_OPTIONS={user.ELECTIVE_4_OPTIONS}
              ELECTIVE_5_OPTIONS={user.ELECTIVE_5_OPTIONS}
              setSubmitted={(value) => setSubmitted(value)}
            />
          )}
        {user &&
          user.CURRENT_SEM === 4 &&
          user.ELECTIVE_2_OPTIONS &&
          !user.ELECTIVE_SELECTIONS &&
          !submitted && (
            <ElectiveForm_4thSem
              ELECTIVE_2_OPTIONS={user.ELECTIVE_2_OPTIONS}
              setSubmitted={(value) => setSubmitted(value)}
            />
          )}
        {user && !user.ELECTIVE_SELECTIONS && submitted && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h4">Thank you for your time.</Typography>
            <Typography variant="h5">
              You'll be given your electives soon.
            </Typography>
          </Box>
        )}
        {user && user.ELECTIVE_SELECTIONS && (
          <ElectiveSelections
            semester={user.CURRENT_SEM}
            ELECTIVE_SELECTIONS={user.ELECTIVE_SELECTIONS}
          />
        )}
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
        <Typography>Priority Order</Typography>
        <Typography variant="body2">{`OPTION 1 > OPTION 2 >... OPTION N`}</Typography>
        <Box>
          <Button color="warning" onClick={logout}>
            <LogoutIcon /> Exit
          </Button>
        </Box>
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
