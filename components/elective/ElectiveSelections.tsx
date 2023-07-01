import { Box, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ElectiveAlloted from "./ElectiveAlloted";

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

  useEffect(() => {
    const fetchElectiveData = async () => {
      const response = await fetch(
        "/api/elective/allotment?sem=" + props.semester
      );
      const data: {
        size: number;
        data: AllotmentData[];
        error: boolean;
        message: string;
      } = await response.json();
      const studentData = data.data.find(
        (student) => student.REGNO === props.REGNO
      );
      switch (props.semester) {
        case 5:
          const ranking = data.data
            .filter((student) => student.ELECTIVE_3)
            .findIndex((student) => student.REGNO === props.REGNO);
          setCurrentRanking(ranking + 1);
          break;
        case 7:
          break;
      }
      setStudent(studentData);
    };
    fetchElectiveData();
  }, []);
  const createData = () => {
    const outerKeys = Object.keys(props.ELECTIVE_SELECTIONS);
    const innerKeys = outerKeys.map((elective) =>
      Object.keys(props.ELECTIVE_SELECTIONS[elective])
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
    } else if (props.semester === 7 || props.semester === 5) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          ...(props.ELECTIVE_SELECTIONS[outerKeys[0]][innerKeys[0][index]] && {
            SECOND_COLUMN:
              props.ELECTIVE_SELECTIONS[outerKeys[0]][innerKeys[0][index]],
          }),
          ...(props.ELECTIVE_SELECTIONS[outerKeys[1]][innerKeys[1][index]] && {
            THIRD_COLUMN:
              props.ELECTIVE_SELECTIONS[outerKeys[1]][innerKeys[1][index]],
          }),
        });
      }
    }
    return rows;
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      <Typography color="grey">
        **This is temporary data that is subject to changes based on selection
        data from other students**
      </Typography>
      {currentRanking && (
        <Chip label={`Current Ranking in database ${currentRanking}`}></Chip>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350, maxWidth: 750 }} aria-label="simple table">
          <TableHead>
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
                <TableCell align="left">Elective VII</TableCell>
              )}
              {props.semester === 7 && (
                <TableCell align="left">Elective VIII</TableCell>
              )}
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
    </Box>
  );
};

export default ElectiveSelections;
