import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AuthContext, { Subject } from "../../contexts/AuthContext";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Dashboard.module.css";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";

import { Box, Button, Chip } from "@mui/material";
import ElectiveForm_6thSem from "../../components/elective/forms/_6thSem";
import ElectiveForm_3rdSem from "../../components/elective/forms/_3rdSem";
import ElectiveForm_4thSem from "../../components/elective/forms/_4thSem";
import ElectiveSelections from "../../components/elective/ElectiveSelections";
import ElectiveForm_7thSem from "../../components/elective/forms/_7thSem";
import ElectiveForm_5thSem from "../../components/elective/forms/_5thSem";
import RefreshIcon from "@mui/icons-material/Refresh";
import ElectiveForm_7thSem_Open from "../../components/elective/forms/_7thSemOpen";
import ElectiveForm_8thSem from "../../components/elective/forms/_8thSem";
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
        if (user.CURRENT_SEM === 7) {
          setOptions([
            { title: "Elective VIII", subjects: user.ELECTIVE_8_OPTIONS },
            { title: "ELECTIVE IX", subjects: user.ELECTIVE_9_OPTIONS },
            { title: "Open Elective", subjects: user.OPEN_ELECTIVE_2_OPTIONS },
          ]);
        } else if (user.CURRENT_SEM === 5) {
          setOptions([
            { title: "Elective III", subjects: user.ELECTIVE_3_OPTIONS },
          ]);
        } else if (user.CURRENT_SEM === 4) {
          setOptions([
            {
              title: "Elective II",
              subjects: user.ELECTIVE_2_OPTIONS,
            },
            {
              title: "Open Elective II",
              subjects: user.OPEN_ELECTIVE_2_OPTIONS,
            },
          ]);
        } else if (user.CURRENT_SEM === 6) {
          setOptions([
            { title: "Elective IV", subjects: user.OPEN_ELECTIVE_3_OPTIONS },
          ]);
        } else if (user.CURRENT_SEM === 8) {
          setOptions([
            { title: "Elective X", subjects: user.ELECTIVE_10_OPTIONS },
            { title: "Elective XI", subjects: user.ELECTIVE_11_OPTIONS },
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
        sx={{
          minHeight: "20rem",
          maxHeight: "50rem",
          overflow: "scroll",
          padding: "1rem 0.4rem",
        }}
      >
        {/* {user && */}
        {/*   user.CURRENT_SEM === 5 && */}
        {/*   (!user.ELECTIVE_SELECTIONS || */}
        {/*     (user.ELECTIVE_SELECTIONS && */}
        {/*       !user.ELECTIVE_SELECTIONS.ELECTIVE_2)) && ( */}
        {/*     <Typography> */}
        {/*       You missed the slot to apply for electives online */}
        {/*     </Typography> */}
        {/*   )} */}
        {/* {user && */}
        {/*   user.CURRENT_SEM === 7 && */}
        {/*   (!user.ELECTIVE_SELECTIONS || */}
        {/*     (user.ELECTIVE_SELECTIONS && */}
        {/*       !user.ELECTIVE_SELECTIONS.OPEN_ELECTIVE_OPTIONS)) && ( */}
        {/*     <Typography> */}
        {/*       You missed the slot to apply for electives online */}
        {/*     </Typography> */}
        {/*   )} */}
        {user && user.CURRENT_SEM === 5 && user.ELECTIVE_2 && (
          <Typography variant="h6" textAlign="center">
            Your final electives are {"  "}
            <br />
            <Chip label={user.ELECTIVE_2.TITLE} color="success"></Chip> {"  "}
          </Typography>
        )}
        {user &&
          user.CURRENT_SEM === 7 &&
          user.ELECTIVE_8 &&
          user.ELECTIVE_9 && (
            <>
              <Typography variant="h6" textAlign="center">
                Your final electives are {"  "}
                <br />
                <Chip label={user.ELECTIVE_8.TITLE} color="success"></Chip>{" "}
                {"  "},{"  "}
                <Chip label={user.ELECTIVE_9.TITLE} color="success"></Chip>{" "}
              </Typography>
            </>
          )}

        {/* {user && */}
        {/*   user.CURRENT_SEM === 7 && */}
        {/*   user.OPEN_ELECTIVE_OPTIONS && */}
        {/*   ((user.ELECTIVE_SELECTIONS && */}
        {/*     !user.ELECTIVE_SELECTIONS.OPEN_ELECTIVE) || */}
        {/*     !user.ELECTIVE_SELECTIONS) && */}
        {/*   !submitted && <Typography>Sorry, time is up</Typography>} */}
        {/* <ElectiveForm_7thSem_Open */}
        {/*   OPEN_ELECTIVE_OPTIONS={user.OPEN_ELECTIVE_OPTIONS} */}
        {/*   // ELECTIVE_8_OPTIONS={user.ELECTIVE_8_OPTIONS} */}
        {/*   setSubmitted={(value) => setSubmitted(value)} */}
        {/* /> */}

        {user &&
          user.CURRENT_SEM === 6 &&
          user.OPEN_ELECTIVE_3_OPTIONS &&
          ((user.ELECTIVE_SELECTIONS &&
            !user.ELECTIVE_SELECTIONS.OPEN_ELECTIVE_3) ||
            !user.ELECTIVE_SELECTIONS) &&
          !submitted && (
            <ElectiveForm_6thSem
              OPEN_ELECTIVE_3_OPTIONS={user.OPEN_ELECTIVE_3_OPTIONS}
              setSubmitted={(value) => setSubmitted(value)}
            />
          )}
        {user &&
          user.CURRENT_SEM === 4 &&
          user.OPEN_ELECTIVE_2_OPTIONS &&
          user.ELECTIVE_2_OPTIONS &&
          ((user.ELECTIVE_SELECTIONS && !user.ELECTIVE_SELECTIONS.ELECTIVE_2) ||
            !user.ELECTIVE_SELECTIONS) &&
          !submitted && (
            <ElectiveForm_4thSem
              setSubmitted={(value) => setSubmitted(value)}
              ELECTIVE_2_OPTIONS={user.ELECTIVE_2_OPTIONS}
              OPEN_ELECTIVE_2_OPTIONS={user.OPEN_ELECTIVE_2_OPTIONS}
            />
          )}

        {user &&
          user.CURRENT_SEM === 8 &&
          user.ELECTIVE_10_OPTIONS &&
          user.ELECTIVE_11_OPTIONS &&
          ((user.ELECTIVE_SELECTIONS &&
            !user.ELECTIVE_SELECTIONS.ELECTIVE_10) ||
            !user.ELECTIVE_SELECTIONS) &&
          !submitted && (
            <ElectiveForm_8thSem
              setSubmitted={(value) => setSubmitted(value)}
              ELECTIVE_10_OPTIONS={user.ELECTIVE_10_OPTIONS}
              ELECTIVE_11_OPTIONS={user.ELECTIVE_11_OPTIONS}
            />
          )}

        {user &&
          user.CURRENT_SEM === 3 &&
          user.ELECTIVE_1_OPTIONS &&
          user.SPECIALIZATION_OPTIONS &&
          !user.ELECTIVE_SELECTIONS &&
          !submitted && (
            <ElectiveForm_3rdSem
              setSubmitted={(value) => setSubmitted(value)}
              ELECTIVE_1_OPTIONS={user.ELECTIVE_1_OPTIONS}
              SPECIALIZATION_OPTIONS={user.SPECIALIZATION_OPTIONS}
            />
          )}

        {user &&
          user.CURRENT_SEM === 7 &&
          user.ELECTIVE_8_OPTIONS &&
          ((user.ELECTIVE_SELECTIONS && !user.ELECTIVE_SELECTIONS.ELECTIVE_8) ||
            !user.ELECTIVE_SELECTIONS) &&
          !submitted && (
            <ElectiveForm_7thSem
              setSubmitted={(value) => setSubmitted(value)}
              ELECTIVE_8_OPTIONS={user.ELECTIVE_8_OPTIONS!}
              ELECTIVE_9_OPTIONS={user.ELECTIVE_9_OPTIONS!}
              OPEN_ELECTIVE_2_OPTIONS={user.OPEN_ELECTIVE_2_OPTIONS!}
            />
          )}
        {user &&
          user.CURRENT_SEM === 5 &&
          user.ELECTIVE_3_OPTIONS &&
          ((user.ELECTIVE_SELECTIONS && !user.ELECTIVE_SELECTIONS.ELECTIVE_3) ||
            !user.ELECTIVE_SELECTIONS) &&
          !submitted && (
            <ElectiveForm_5thSem
              setSubmitted={(value) => setSubmitted(value)}
              ELECTIVE_3_OPTIONS={user.ELECTIVE_3_OPTIONS!}
            />
          )}

        {user &&
          ((user.ELECTIVE_SELECTIONS &&
            (!user.ELECTIVE_SELECTIONS.OPEN_ELECTIVE ||
              !user.ELECTIVE_SELECTIONS.ELECTIVE_5)) ||
            !user.ELECTIVE_SELECTIONS) &&
          submitted && (
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
                Electives will be allocated soon.{" "}
              </Typography>
            </Box>
          )}

        {user &&
          user.CURRENT_SEM === 3 &&
          user.ELECTIVE_SELECTIONS &&
          user.ELECTIVE_SELECTIONS.ELECTIVE_1 && (
            <p>Elective will be allocated soon</p>
          )}

        {user &&
          user.CURRENT_SEM === 7 &&
          user.ELECTIVE_SELECTIONS &&
          user.ELECTIVE_SELECTIONS.ELECTIVE_9 && (
            <ElectiveSelections
              REGNO={user.REGNO!}
              semester={user.CURRENT_SEM}
              ELECTIVE_SELECTIONS={user.ELECTIVE_SELECTIONS}
            />
          )}
        {user &&
          user.CURRENT_SEM === 5 &&
          user.ELECTIVE_SELECTIONS &&
          user.ELECTIVE_SELECTIONS.ELECTIVE_3 && (
            <p>Electives will be allocated soon</p>)}

        {user &&
          user.CURRENT_SEM === 6 &&
          user.ELECTIVE_SELECTIONS &&
          user.ELECTIVE_SELECTIONS.OPEN_ELECTIVE_3 && (
            <ElectiveSelections
              REGNO={user.REGNO!}
              semester={user.CURRENT_SEM}
              ELECTIVE_SELECTIONS={user.ELECTIVE_SELECTIONS}
            />
          )}
        {user &&
          user.CURRENT_SEM === 4 &&
          user.ELECTIVE_SELECTIONS &&
          user.ELECTIVE_SELECTIONS.ELECTIVE_2 && (
            <ElectiveSelections
              REGNO={user.REGNO!}
              semester={user.CURRENT_SEM}
              ELECTIVE_SELECTIONS={user.ELECTIVE_SELECTIONS}
            />
          )}
        {user &&
          user.CURRENT_SEM === 8 &&
          user.ELECTIVE_SELECTIONS &&
          user.ELECTIVE_SELECTIONS.ELECTIVE_10 && (
            <ElectiveSelections
              REGNO={user.REGNO!}
              semester={user.CURRENT_SEM}
              ELECTIVE_SELECTIONS={user.ELECTIVE_SELECTIONS}
            />
          )}

        {/* {user && */}
        {/*   user.CURRENT_SEM === 5 && */}
        {/*   user.ELECTIVE_SELECTIONS && */}
        {/*   user.ELECTIVE_SELECTIONS.ELECTIVE_3 && ( */}
        {/*     <ElectiveSelections */}
        {/*       semester={user.CURRENT_SEM} */}
        {/*       ELECTIVE_SELECTIONS={user.ELECTIVE_SELECTIONS} */}
        {/*     /> */}
        {/*   )} */}
      </Card>
    );

    sideContent = (
      <Stack spacing={1} textAlign="center">
        <Typography variant="h5">Welcome</Typography>
        <Typography variant="body1">{user?.NAME}</Typography>
        <Typography variant="body2">Your CGPA in the database</Typography>
        <Typography variant={user?.CGPA ? "h4" : "body1"} fontWeight={500}>
          {user?.CGPA ? (
            user?.CGPA?.toFixed(3)
          ) : (
            <Typography variant="h5" color="red">
              CGPA missing. Contact your TG. Electives cannot be alloted to you
            </Typography>
          )}
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
