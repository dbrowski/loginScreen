import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { ColorExtractor } from "react-color-extractor";
import ReactAvatarEditor from "react-avatar-editor";
import Slider from "@material-ui/core/Slider";
import Fab from "@material-ui/core/Fab";

export default function DragNDrop({ ...props }) {
  const [file, setFile] = useState(0);
  const [scale, setScale] = useState(120);
  const [colors, setColors] = useState(0);

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
    },
    dropzoneArea: {
      height: "100%",
      maxHeight: "100%",
      width: "100%",
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
      width: "100%",
    },
  }));

  const classes = useStyles();

  const onDrop = (acceptedFiles) => {
    // Do something with the files
    let newFile = { ...file };
    let uploadedFile = acceptedFiles[acceptedFiles.length - 1];
    if (uploadedFile) {
      newFile = URL.createObjectURL(uploadedFile);
      setFile(newFile);
    }
  };

  // Change effect func for the scale slider below the image.
  const handleChange = (event, newValue) => {
    setScale(newValue);
  };

  // Get the window height and width to use for the canvas size
  const w = (window.innerWidth - 2);
  const h = window.innerHeight - 2;

  const imgOrDropzone = () => {
    if (file) {
      return (
        <Grid item container display="flex" style={{ height: "100%" }}>
          <Grid
            item
            xs={12}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "95%",
              maxHeight: "95%",
            }}
          >
            <ReactAvatarEditor
              classes={classes.image}
              image={file}
              width={w}
              height={h}
              border={0}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={scale / 100}
              rotate={0}
              style={{
                minHeight: "100%",
                minWidth: "100%",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ height: "5%", maxHeight: "5%" }}>
            <Fab style={{ width: "100%" }}>
              <Slider
                value={scale}
                onChange={handleChange}
                min={10}
                max={300}
                aria-labelledby="continuous-slider"
              />
            </Fab>
          </Grid>
        </Grid>
      );
    }
    return (
      <DropzoneArea
        dropzoneClass={classes.dropzoneArea}
        dropzoneParagraphClass={"color: #000000, fontSize: 2rem"}
        showPreviews={false}
        showPreviewsInDropzone={false}
        acceptedFiles={["image/*"]}
        filesLimit={1}
        maxFileSize={50000000} // ~5GB
        onChange={onDrop}
        dropzoneText="Upload a Logo Image Here. Drag Image to Rearrange."
      />
    );
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
        <Grid
          item
          xs={12}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          {imgOrDropzone()}
        </Grid>
      </Grid>
    </Container>
  );
}
