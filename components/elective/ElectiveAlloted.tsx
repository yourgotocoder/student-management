import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import { AllocatedSubject } from "./ElectiveSelections";
type Props = {
  semester: number;
  subject: string;
  allotmentData: AllocatedSubject;
};

const ElectiveAlloted = (props: Props) => {
  let chip = <>{props.subject}</>;
  switch (props.semester) {
    case 5:
      if (
        props.allotmentData &&
        props.allotmentData.ELECTIVE_3 &&
        props.allotmentData.ELECTIVE_3.TITLE === props.subject
      ) {
        chip = (
          <Chip
            label={props.subject}
            deleteIcon={<DoneIcon />}
            onDelete={() => { }}
            color="success"
          ></Chip>
        );
      }
      if (
        props.allotmentData &&
        props.allotmentData.ELECTIVE_4 &&
        props.allotmentData.ELECTIVE_4.TITLE === props.subject
      ) {
        chip = (
          <Chip
            label={props.subject}
            deleteIcon={<DoneIcon />}
            onDelete={() => { }}
            color="success"
          ></Chip>
        );
      }
      break;
    case 7:
      if (
        props.allotmentData &&
        props.allotmentData.ELECTIVE_7 &&
        props.allotmentData.ELECTIVE_7.TITLE === props.subject
      ) {
        chip = (
          <Chip
            label={props.subject}
            deleteIcon={<DoneIcon />}
            onDelete={() => { }}
            color="success"
          ></Chip>
        );
      }
      if (
        props.allotmentData &&
        props.allotmentData.ELECTIVE_8 &&
        props.allotmentData.ELECTIVE_8.TITLE === props.subject
      ) {
        chip = (
          <Chip
            label={props.subject}
            deleteIcon={<DoneIcon />}
            onDelete={() => { }}
            color="success"
          ></Chip>
        );
      }
      break;
  }
  return <>{chip}</>;
};

export default ElectiveAlloted;
