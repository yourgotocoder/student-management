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
      switch (props.semester) {
        case 5:
          const ranking = data.data
            .filter((student) => student.ELECTIVE_3)
            .findIndex((student) => student.REGNO === props.REGNO);
          const submissions = data.data.filter(
            (student) => student.ELECTIVE_3,
          ).length;
          setTotalSubmission(submissions);
          setCurrentRanking(ranking + 1);
          break;
        case 7:
          const _7thRanking = data.data
            .filter((student) => student.OPEN_ELECTIVE)
            .findIndex((student) => student.REGNO === props.REGNO);
          const _7thSubmissions = data.data.filter(
            (student) => student.OPEN_ELECTIVE,
          ).length;
          setTotalSubmission(_7thSubmissions);
          setCurrentRanking(_7thRanking + 1);
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

    if (props.semester === 4) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          SECOND_COLUMN:
            props.ELECTIVE_SELECTIONS[outerKeys[0]][innerKeys[0][index]],
        });
      }
    } else if (props.semester === 5) {
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
          ...(props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE"][
            `OPTION_${index + 1}`
          ] && {
            SECOND_COLUMN:
              props.ELECTIVE_SELECTIONS["OPEN_ELECTIVE"][`OPTION_${index + 1}`],
          }),
          // ...(props.ELECTIVE_SELECTIONS["ELECTIVE_8"][
          //   `OPTION_${index + 1}`
          // ] && {
          //   THIRD_COLUMN:
          //     props.ELECTIVE_SELECTIONS["ELECTIVE_8"][`OPTION_${index + 1}`],
          // }),
        });
      }
    }
    return rows;
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      {currentRanking && (
        <>
          <Chip
            label={`Final Ranking (${currentRanking} of ${totalSubmission}) submissions.`}
            color="info"
          ></Chip>
        </>
      )}
      <Typography>
        Updated the seat distribution. You can download the allotment data{" "}
        <a href={`/api/elective/allotment-xlsx?sem=${props.semester}`}>
          <Button>here</Button>
        </a>
      </Typography>
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
              {props.semester === 4 && (
                <TableCell align="left">Elective 1</TableCell>
              )}
              {props.semester === 5 && (
                <TableCell align="left">Elective II</TableCell>
              )}
              {props.semester === 5 && (
                <TableCell align="left">Elective III</TableCell>
              )}
              {props.semester === 6 && (
                <TableCell align="left">Elective IV</TableCell>
              )}
              {props.semester === 6 && (
                <TableCell align="left">Elective V</TableCell>
              )}
              {props.semester === 7 && (
                <TableCell align="left">Open Elective</TableCell>
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
