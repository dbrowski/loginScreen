import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";
import PhotoSizeSelectLargeIcon from "@material-ui/icons/PhotoSizeSelectLarge";
import OpacityIcon from "@material-ui/icons/Opacity";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

// Default is to use the popover over the accordion for help, but the accordion is available in another file if desired.
export default function HelpPopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="outlined"
        color="primary"
        onClick={handleClick}
      >
        Help
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography} >
          <CloudUploadIcon fontSize="small" /> Upload a logo image.
          <br />
          <PhotoSizeSelectLargeIcon fontSize="small" /> Image can be resized
          using the slider below the image.
          <br />
          <ControlCameraIcon fontSize="small" /> Image can be dragged and moved by clicking and dragging the image.
          <br />
          <ControlCameraIcon fontSize="small" /> Sign in form can be dragged and
          moved by clicking and dragging the hand.
          <br />
          <OpacityIcon fontSize="small" /> Sign in form's transparency can be
          changed using slider in sign in form.
        </Typography>
      </Popover>
    </>
  );
}
