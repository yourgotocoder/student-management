import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
  semester: number | undefined;
  ELECTIVE_SELECTIONS: any;
};

const ElectiveSelections = (props: Props) => {
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

    if (props.semester === 5) {
      for (let index = 0; index < numberOfLoops; index++) {
        rows.push({
          FIRST_COLUMN: `OPTION ${index + 1}`,
          SECOND_COLUMN:
            props.ELECTIVE_SELECTIONS[outerKeys[0]][innerKeys[0][index]],
        });
      }
    } else if (props.semester === 7) {
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350, maxWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={120}></TableCell>
              {props.semester === 4 && (
                <TableCell align="left">Elective 1</TableCell>
              )}
              {props.semester === 6 && (
                <TableCell align="left">Elective IV</TableCell>
              )}
              {props.semester === 6 && (
                <TableCell align="left">Elective V</TableCell>
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
                    {option.SECOND_COLUMN.TITLE}
                  </TableCell>
                )) || <TableCell></TableCell>}
                {option.THIRD_COLUMN && (
                  <TableCell component="th" scope="row">
                    {option.THIRD_COLUMN.TITLE}
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
