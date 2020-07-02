import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DragNDrop from "./DragNDrop";
import EmailInput from "./InputForm/EmailInput";
import PasswordInput from "./InputForm/PasswordInput";
import ForgotPassword from "./InputForm/ForgotPassword";
import NoAccount from "./InputForm/NoAccount";
import Copyright from "./InputForm/Copyright";
import Slider from "@material-ui/core/Slider";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    fontWeight: 500,
    fontColor: "white"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    // backgroundColor: "transparent",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInPage({
  handleUsernameUpdate,
  handlePasswordUpdate,
  handleSubmit,
  handleForgotPassword,
  handlePasswordReset,
  handleRegister,
}) {
  const classes = useStyles();
  const [opacity, setOpacity] = useState(100);

  const handleChange = (event, newValue) => {
    setOpacity(newValue);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        lg={8}
        xl={9}
        style={{ maxHeight: "100%" }}
      >
        <DragNDrop />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        xl={3}
        component={Paper}
        elevation={24}
        square
        style={{
          maxHeight: "90%",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, " + opacity / 100 + ")",
        }}
      >
        <div
          className={classes.paper}
          style={{
            backgroundColor:
              "rgba(255, 255, 255, " + (opacity - 70) / 100 + ")",
          }}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            color={opacity / 100 < 0.4 ? "secondary" : "primary"}
          >
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <EmailInput
              color={opacity / 100 < 0.4 ? "secondary" : "primary"}
              handleUsernameUpdate={handleUsernameUpdate}
            />
            <PasswordInput
              color={opacity / 100 < 0.4 ? "secondary" : "primary"}
              handlePasswordUpdate={handlePasswordUpdate}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              data-id="user-credentials-submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid item container>
              <Grid item xs={6}>
                <ForgotPassword handleForgotPassword={handleForgotPassword} />
              </Grid>
              <Grid item xs={6}>
                <NoAccount handleRegister={handleRegister} />
              </Grid>
            </Grid>

            <Grid
              container
              item
              direction="column"
              height="20vh"
              maxHeight="20vh"
              justify="space-around"
              style={{ height: "25vh", maxHeight: "100%" }}
            >
              <Grid item>
                <Fab style={{ width: "100%" }}>
                  <Slider
                    value={opacity}
                    onChange={handleChange}
                    min={0}
                    max={100}
                    aria-labelledby="continuous-slider"
                    style={{backgroundColor: "transparent"}}
                  />
                </Fab>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
