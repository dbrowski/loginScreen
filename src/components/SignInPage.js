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
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import HelpPopover from "./InputForm/HelpPopover";
import AddIcon from "@material-ui/icons/Add";
import PanToolIcon from "@material-ui/icons/PanTool";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Tooltip from "@material-ui/core/Tooltip";

export default function SignInPage({
  handleUsernameUpdate,
  handlePasswordUpdate,
  handleSubmit,
  handleForgotPassword,
  handlePasswordReset,
  handleRegister,
}) {
  const [opacity, setOpacity] = useState(100);
  const [signInBGColor, setSignInBGColor] = useState("rgb(255, 255, 255)");
  const [colorWithoutAlpha, setColorWithoutAlpha] = useState("rgb(255, 255, 255, ");

  // handles bg color change when opacity slider is used
  useEffect(() => {
    const opacityScaled = Number(opacity) / 100;
    const newBGColor = colorWithoutAlpha + opacityScaled + ")";
    setSignInBGColor(newBGColor);
    console.log("opacity change");
  });

  const adjustRGBOpacity = (color) => {
    // expects color in the form of rgb(###, ###, ###)
    if (color) {
      const colors = color.split(",");
      // includes "rgb(", will need to chop it off before using
      const first = colors[0];
      const second = colors[1];
      // strip off the ")"
      const third = colors[2].split(")")[0];
      // make sure we get a number for the color values
      // chop off "rgb(" from the front
      const r = parseInt(first.slice(4));
      const g = parseInt(second);
      const b = parseInt(third);
      if (r < 0) {
        console.err("r is not a positive number");
        const adjWhite = "rgba(255, 255, 255, " + opacity;
        setSignInBGColor(adjWhite);
        return adjWhite;
      }
      if (g < 0) {
        console.err("g is not a positive number");
        const adjWhite = "rgba(255, 255, 255, " + opacity;
        setSignInBGColor(adjWhite);
        return adjWhite;
      }
      if (b < 0) {
        console.err("b is not a positive number");
        const adjWhite = "rgba(255, 255, 255, " + opacity;
        setSignInBGColor(adjWhite);
        return adjWhite;
      }

      const opacityScaled = Number(opacity) / 100;
      const adjColor = "rgba(" + r + ", " + g + ", " + b + ", " + opacityScaled + ")";
      setColorWithoutAlpha("rgba(" + r + ", " + g + ", " + b + ", ");
      console.log(adjColor);

      setSignInBGColor(adjColor);
      return adjColor;
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      fontWeight: 500,
      fontColor: "white",
      backgroundColor: signInBGColor,
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // backgroundColor: signInBGColor,
      backgroundColor: "transparent",
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
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    extraSection: {
      maxHeight: "30%",
      height: "30%",
      paddingTop: "1rem",
    },
    slider: {
      width: "100%",
      minWidth: "20vw",
      backgroundColor: "transparent",
      borderColor: "transparent",
      boxShadow: "none",
    },
  }));

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setOpacity(newValue);
  };

  const handleOnClick = (newValue) => {
    setSignInBGColor(adjustRGBOpacity(newValue));
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
        <DragNDrop setSignInColor={handleOnClick} />
      </Grid>
      <Draggable
        axis="both"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[5, 5]}
        scale={1}
        handle=".handle"
        bounds="parent"
      >
        <Grid
          item
          container
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={3}
          component={Paper}
          elevation={24}
          square
          direction="column"
          wrap="nowrap"
          justify="space-around"
          alignItems="center"
          style={{
            maxHeight: "80vh",
            zIndex: 1,
            backgroundColor: signInBGColor,
          }}
        >
          <Grid
            item
            className={classes.paper}
            height="90%"
            style={{ maxHeight: "90%" }}
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
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                  />
                }
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
                justify="space-around"
                wrap="nowrap"
                alignItems="center"
                spacing={1}
                className={classes.extraSection}
              >
                {/* Transparency Slider */}
                <Grid item container justify="center" alignContent="center">
                  <Fab className={classes.slider}>
                    <Slider
                      value={opacity}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                      aria-labelledby="continuous-slider"
                    />
                  </Fab>
                </Grid>
                {/* Copyright line */}
                <Grid item container justify="center" alignContent="center">
                  <Copyright />
                </Grid>
                {/* Move sign in form handle */}
                <Grid
                  item
                  container
                  justify="center"
                  alignContent="center"
                  className="handle"
                  height="1vh"
                >
                  <Tooltip title="Drag Me!">
                    <Fab size="small" color="primary" aria-label="add">
                      <PanToolIcon />
                    </Fab>
                  </Tooltip>
                </Grid>
                {/* Help button */}
                <Grid
                  item
                  container
                  justify="center"
                  alignContent="center"
                  height="10%"
                  width="100%"
                >
                  {/* */}
                  <HelpPopover />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Draggable>
    </Grid>
  );
}
