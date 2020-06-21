import React, { useState, useCallback } from "react";
import Container from "./Container";
import CustomDragLayer from "./CustomDragLayer";
import Grid from "@material-ui/core/Grid";
export const DragBox = ({ img }) => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(true);

  return (
    <Grid item style={{width: "100%", maxWidth: "100%", height: "100%", maxHeight: "100%"}}>
      <Container snapToGrid={snapToGridAfterDrop} img={img} />
      <CustomDragLayer snapToGrid={snapToGridWhileDragging} img={img} />
    </Grid>
  );
};
