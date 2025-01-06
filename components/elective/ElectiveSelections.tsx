import { Box, Button, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ElectiveAlloted from "./ElectiveAlloted";
import GitHubIcon from "@mui/icons-material/GitHub";

type Props = {
  semester: number | undefined;
  ELECTIVE_SELECTIONS: any;
  REGNO: number;
};
export interface AllotmentData {
  REGNO: number;
  CGPA: number;
  [key: string]:
    | {
        TITLE: string;
        CODE: string;
      }
    | number;
}
export interface AllocatedSubject {
  [key: string]: { TITLE: string; CODE: string };
}
const ElectiveSelections = (props: Props) => {
  const [student, setStudent] = useState<AllotmentData>();
  const [currentRanking, setCurrentRanking] = useState<number | undefined>();
  const [totalSubmission, setTotalSubmission] = useState<number | undefined>();

  useEffect(() => {
    const fetchElectiveData = async () => {
      const response = await fetch(
        "/api/elective/allotment?sem=" + props.semester,
      );
      const data: {
        size: number;
        data: AllotmentData[];
        error: boolean;
        message: string;
      } = await response.json();
      const studentData = data.data.find(
        (student) => student.REGNO === props.REGNO,
      );
      console.log(studentData);
      switch (props.semester) {
        case 3:
          const _3rdranking = data.data
            .filter((student) => student.ELECTIVE_1)
            .findIndex((student) => student.REGNO === props.REGNO);
          const _3rdsubmissions = data.data.filter(
            (student) => student.ELECTIVE_1,
          ).length;
          setTotalSubmission(_3rdsubmissions);
          setCurrentRanking(_3rdranking + 1);
          break;

        case 5:
          const ranking = data.data
            .filter((student) => student.ELECTIVE_2)
            .findIndex((student) => student.REGNO === props.REGNO);
          const submissions = data.data.filter(
            (student) => student.ELECTIVE_2,
          ).length;
          setTotalSubmission(submissions);
          setCurrentRanking(ranking + 1);
          break;
        case 7:
          const _7thRanking = data.data
            .filter((student) => student.ELECTIVE_8)
            .findIndex((student) => student.REGNO === props.REGNO);
          const _7thSubmissions = data.data.filter(
            (student) => student.ELECTIVE_8,
          ).length;
          setTotalSubmission(_7thSubmissions);
          setCurrentRanking(_7thRanking + 1);
          break;
        case 6:
          const _6thRanking = data.data
            .filter((student) => student.ELECTIVE_5)
            .findIndex((student) => student.REGNO === props.REGNO);
          const _6thSubmissions = data.data.filter(
            (student) => student.ELECTIVE_5,
          ).length;
          setTotalSubmission(_6thSubmissions);
          setCurrentRanking(_6thRanking + 1);
          break;
        case 4:
          const _4thRanking = data.data
            .filter((student) => student.ELECTIVE_1)
            .findIndex((student) => student.REGNO === props.REGNO);
          const _4thSubmissions = data.data.filter(
            (student) => student.ELECTIVE_1,
          ).length;
          setTotalSubmission(_4thSubmissions);
          setCurrentRanking(_4thRanking + 1);
          break;
      }
      setStudent(studentData);
    };
    fetchElectiveData();
  }, [props.REGNO, props.semester]);
  const createData = () => {
    const outerKeys = Object.keys(props.ELECTIVE_SELECTIONS);
    const innerKeys = outerKeys.map((elective) =>
      Object.keys(props.ELECTIVE_SELECTIONS[elective]),
    );
    const numberOfLoops = innerKeys.reduce((prev, cur) => {
      if (cur.length > prev) {
        prev = cur.length;
      }
      return prev;
    }, 0);
    const rows: any[] = [];
    console.log(numberOfLoops);
    if (props.semester === 3) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          SECOND_COLUMN:
            props.ELECTIVE_SELECTIONS["ELECTIVE_1"][`OPTION_${index + 1}`],
        });
      }
    } else if (props.semester === 4) {
      //Made changes here
      for (let index = 0; index < 7; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          SECOND_COLUMN:
            props.ELECTIVE_SELECTIONS["ELECTIVE_2"][`OPTION_${index + 1}`],
        });
      }
    } else if (props.semester === 5) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          ...(props.ELECTIVE_SELECTIONS["ELECTIVE_2"][
            `OPTION_${index + 1}`
          ] && {
            SECOND_COLUMN:
              props.ELECTIVE_SELECTIONS["ELECTIVE_2"][`OPTION_${index + 1}`],
          }),
          ...(props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE_2"][
            `OPTION_${index + 1}`
          ] && {
            THIRD_COLUMN:
              props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE_2"][
                `OPTION_${index + 1}`
              ],
          }),
        });
      }
    } else if (props.semester === 6) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          ...(props.ELECTIVE_SELECTIONS["ELECTIVE_3"][
            `OPTION_${index + 1}`
          ] && {
            SECOND_COLUMN:
              props.ELECTIVE_SELECTIONS["ELECTIVE_3"][`OPTION_${index + 1}`],
          }),
          ...(props.ELECTIVE_SELECTIONS["ELECTIVE_4"][
            `OPTION_${index + 1}`
          ] && {
            THIRD_COLUMN:
              props.ELECTIVE_SELECTIONS["ELECTIVE_4"][`OPTION_${index + 1}`],
          }),
        });
      }
    } else if (props.semester === 7) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          ...(props.ELECTIVE_SELECTIONS["ELECTIVE_8"][
            `OPTION_${index + 1}`
          ] && {
            SECOND_COLUMN:
              props.ELECTIVE_SELECTIONS["ELECTIVE_8"][`OPTION_${index + 1}`],
          }),
          ...(props.ELECTIVE_SELECTIONS["ELECTIVE_9"][
            `OPTION_${index + 1}`
          ] && {
            THIRD_COLUMN:
              props.ELECTIVE_SELECTIONS["ELECTIVE_9"][`OPTION_${index + 1}`],
          }),
          ...(props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE_2"] &&
            props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE_2"][
              `OPTION_${index + 1}`
            ] && {
              FOURTH_COLUMN:
                props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE_2"][
                  `OPTION_${index + 1}`
                ],
            }),
        });
      }
    } else if (props.semester === 8) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          ...(props.ELECTIVE_SELECTIONS["ELECTIVE_10"][
            `OPTION_${index + 1}`
          ] && {
            SECOND_COLUMN:
              props.ELECTIVE_SELECTIONS["ELECTIVE_10"][`OPTION_${index + 1}`],
          }),
          ...(props.ELECTIVE_SELECTIONS["ELECTIVE_11"][
            `OPTION_${index + 1}`
          ] && {
            THIRD_COLUMN:
              props.ELECTIVE_SELECTIONS["ELECTIVE_11"][`OPTION_${index + 1}`],
          }),
        });
      }
    }

    return rows;
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      {/* <>{currentRanking}</> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350, maxWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="center">
                Your selection data
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={120}></TableCell>
              {props.semester === 3 && (
                <TableCell align="left">Elective I</TableCell>
              )}

              {props.semester === 4 && (
                <TableCell align="left">Elective II</TableCell>
              )}

              {props.semester === 5 && (
                <TableCell align="left">Elective II</TableCell>
              )}
              {props.semester === 5 && (
                <TableCell align="left">Open Elective II</TableCell>
              )}
              {props.semester === 6 && (
                <TableCell align="left">Elective III</TableCell>
              )}
              {props.semester === 6 && (
                <TableCell align="left">Elective IV</TableCell>
              )}

              {props.semester === 7 &&
                props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE_2"] && (
                  <TableCell align="left">Open Elective II</TableCell>
                )}

              {props.semester === 7 && (
                <TableCell align="left">Elective VIII</TableCell>
              )}
              {props.semester === 7 && (
                <TableCell align="left">Elective IX</TableCell>
              )}
              {props.semester === 8 && (
                <TableCell align="left">Elective X</TableCell>
              )}
              {props.semester === 8 && (
                <TableCell align="left">Elective XI</TableCell>
              )}

              {/* {props.semester === 7 && ( */}
              {/*   <TableCell align="left">Elective VIII</TableCell> */}
              {/* )} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {createData().map((option) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={option.FIRST_COLUMN}
              >
                <TableCell component="th" scope="row">
                  {option.FIRST_COLUMN}
                </TableCell>
                {option.FOURTH_COLUMN && (
                  <TableCell component="th" scope="row">
                    <ElectiveAlloted
                      subject={option.FOURTH_COLUMN.TITLE as string}
                      semester={props.semester as number}
                      allotmentData={student as AllocatedSubject}
                    ></ElectiveAlloted>
                  </TableCell>
                )}

                {(option.SECOND_COLUMN && (
                  <TableCell component="th" scope="row">
                    <ElectiveAlloted
                      subject={option.SECOND_COLUMN.TITLE as string}
                      semester={props.semester as number}
                      allotmentData={student as AllocatedSubject}
                    ></ElectiveAlloted>
                  </TableCell>
                )) || <TableCell></TableCell>}
                {option.THIRD_COLUMN && (
                  <TableCell component="th" scope="row">
                    <ElectiveAlloted
                      subject={option.THIRD_COLUMN.TITLE as string}
                      semester={props.semester as number}
                      allotmentData={student as AllocatedSubject}
                    ></ElectiveAlloted>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box padding="2" margin={3}>
        <Typography>
          This is an open-source project. You can contribute at{" "}
          <a
            href="https://github.com/yourgotocoder/student-management"
            target="_blank"
            rel="noreferrer"
          >
            <Chip
              label="this repo"
              color="info"
              deleteIcon={<GitHubIcon color="action"></GitHubIcon>}
              onDelete={() => {}}
            ></Chip>
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default ElectiveSelections;
