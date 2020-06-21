import React, { useCallback, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { ColorExtractor } from "react-color-extractor";
import { Example } from "./Example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Resizer from "react-image-file-resizer";

export default function DragNDrop({ ...props }) {
  const [file, setFile] = useState(0);
  const [colors, setColors] = useState(0);

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
    },
    dropzoneArea: {
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: file ? "0" : "100%",
      maxHeight: file ? "0" : "100%",
      width: file ? "0" : "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dropzoneAreaText: {
      color: "#000000",
      fontSize: "2rem",
    },
    image: {
      backgroundImage: file,
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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

  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    let newFile = acceptedFiles[acceptedFiles.length - 1];
    let uploadedFileUrl = URL.createObjectURL(newFile);
    if (uploadedFileUrl) {
      setFile(uploadedFileUrl);
    }
  }, []);

  const imgOrText = () => {
    if (!file) {
      return (
        <Grid item xs={12}>
          <DropzoneArea
            dropzoneClass={classes.dropzoneArea}
            dropzoneParagraphClass={"color: #000000, fontSize: 2rem"}
            showPreviews={false}
            showPreviewsInDropzone={false}
            acceptedFiles={["image/*"]}
            filesLimit={1}
            maxFileSize={50000000} // ~5GB
            onDrop={onDrop}
            dropzoneText="Upload a Logo Image Here. Drag Image to Rearrange."
          />
        </Grid>
      );
    }
  };

  return (
    <Container className={classes.root} maxWidth={false} disableGutters>
      <Grid
        container
        display="flex"
        wrap="wrap"
        spacing={0}
        justify="flex-start"
        alignItems="stretch"
        style={{ height: "100%", maxHeight: "100%" }}
      >
        <Grid item xs={12} style={{overflow: "hidden"}}>
            <DropzoneArea
              dropzoneClass={classes.dropzoneArea}
              dropzoneParagraphClass={"color: #000000, fontSize: 2rem"}
              showPreviews={false}
              showPreviewsInDropzone={false}
              acceptedFiles={["image/*"]}
              filesLimit={1}
              maxFileSize={50000000} // ~5GB
              onDrop={onDrop}
              dropzoneText="Upload a Logo Image Here. Drag Image to Rearrange."
            />
          <DndProvider backend={HTML5Backend}>
            <Example img={file} />
          </DndProvider>
        </Grid>
      </Grid>
    </Container>
  );
}