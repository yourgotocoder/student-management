import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import styles from "../styles/Home.module.css";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Loading from "../components/UI/Loading";

export default function Home() {
  const { user, setUser, loading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user?.REGNO !== undefined) {
      router.replace("/student/dashboard");
    }
  }, [router, user?.REGNO]);

  const [regno, setRegno] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async () => {
    if (regno && password) {
      setSubmitting(true);
      const response = await fetch("/api/students/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regno, password }),
      });
      const data = await response.json();
      if (response.status === 200 && data.data._id) {
        localStorage.setItem("_id", data.data._id);
      }
      setUser(data.data);
      if (!response.ok) {
        setErrors(data.message);
      }
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CSE, SMIT</title>
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
          {!loading && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Box sx={{ width: "350px", margin: "auto", mb: 1 }}>
                <TextField
                  error={errors === "Regno not found"}
                  helperText={errors === "Regno not found" && "Regno not found"}
                  label="REGNO"
                  type="number"
                  onChange={(
                    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => setRegno(event.target.value)}
                ></TextField>
              </Box>
              <Box sx={{ width: "350px", margin: "auto", mb: 1 }}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    error={errors === "Invalid password"}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    onChange={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => setPassword(event.target.value)}
                  />
                  {errors === "Invalid password" && (
                    <FormHelperText sx={{ color: "red" }}>
                      Wrong Password!
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box sx={{ width: "350px", margin: "auto", mb: 1 }}>
                <Button
                  variant="outlined"
                  disabled={
                    (password && password.length < 10) ||
                    !regno ||
                    !password ||
                    (password && password.length > 10) ||
                    submitting
                  }
                  onClick={handleLogin}
                >
                  Login
                </Button>
                {submitting && <Loading title="Verifying"></Loading>}
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography>
                  Electives are alloted based on your CGPA
                </Typography>
              </Box>
            </Box>
          )}
        </Card>
        {/* <Card className={styles["login-box"]}>
          <LoginComponent />
        </Card> */}
        {/* <Card className={styles["info-box"]}>info</Card> */}
      </main>
    </div>
  );
}
