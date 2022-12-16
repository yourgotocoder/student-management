import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import styles from "../styles/Home.module.css";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import LoginComponent from "../components/Login.component";

export default function Home() {
  const { user, login } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user?.REGNO !== undefined) {
      router.replace("/student/dashboard");
    }
  }, [router, user?.REGNO]);

  const [regno, setRegno] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div className={styles.container}>
      <Head>
        <title>CSE, SMIT</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        u
        <meta
          name="description"
          content="Index page for CSE, SMIT (Computer Science & Engineering), Sikkim Mainpal Institute of Technology"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card
          className={styles["main-box"]}
          sx={{ mt: 20 }}
          variant="elevation"
        >
          <Box>
            <Typography
              variant="h3"
              gutterBottom
              component="h3"
              fontWeight={700}
              textAlign="center"
              sx={{ color: "#0070F3" }}
            >
              Welcome to CSE
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              component="h3"
              fontWeight={700}
              textAlign="center"
            >
              Please sign-in to continue
            </Typography>
          </Box>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Box sx={{ width: "350px", margin: "auto", mb: 1 }}>
              <TextField
                label="REGNO"
                type="number"
                onChange={(
                  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setRegno(event.target.value)}
              ></TextField>
            </Box>
            <Box sx={{ width: "350px", margin: "auto", mb: 1 }}>
              <TextField
                label="PASSWORD"
                type="password"
                onChange={(
                  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setPassword(event.target.value)}
              ></TextField>
            </Box>
            <Box sx={{ width: "350px", margin: "auto", mb: 1 }}>
              <Button
                variant="outlined"
                disabled={
                  (password && password.length < 10) ||
                  !regno ||
                  !password ||
                  (password && password.length > 10)
                }
              >
                Login
              </Button>
            </Box>
            {regno}
            {password}
          </Box>
        </Card>
        {/* <Card className={styles["login-box"]}>
          <LoginComponent />
        </Card> */}
        {/* <Card className={styles["info-box"]}>info</Card> */}
      </main>
    </div>
  );
}
