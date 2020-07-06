import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMoreIcon";
import CloudUploadIcon from "@material-ui/icons/CloudUploadIcon";
import PhotoSizeSelectLargeIcon from "@material-ui/icons/PhotoSizeSelectLargeIcon";
import ControlCameraIcon from "@material-ui/icons/ControlCameraIcon";
import OpacityIcon from "@material-ui/icons/OpacityIcon";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

// Can switch to the accordion style help rather than the popover. The accordion takes up more space (when expanded), however. A popover, will fit in the screen overlayed on top of the over components if needed.
export default function HelpAccordion() {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Help</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <CloudUploadIcon fontSize="small" /> Upload a logo image.
          <br />
          <PhotoSizeSelectLargeIcon fontSize="small" /> Image can be resized
          using the slider below the image.
          <br />
          <ControlCameraIcon fontSize="small" /> Image can be dragged and moved.
          <br />
          <ControlCameraIcon fontSize="small" /> Sign in form can be dragged and
          moved.
          <br />
          <OpacityIcon fontSize="small" /> Sign in form's transparency can be
          changed using slider in sign in form.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
