import { Typography } from "@mui/material";
import React from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import styles from "./Loading.module.css";

type Props = {
  title: string;
};

const Loading = (props: Props) => {
  return (
    <Typography
      sx={{
        mt: 1,
        color: "#0070F3",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <span>{props.title}</span>{" "}
      <AutorenewIcon className={styles.loading}></AutorenewIcon>
    </Typography>
  );
};

export default Loading;
