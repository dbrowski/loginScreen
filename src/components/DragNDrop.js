import React, { useState, useRef, withStyles } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { ColorExtractor } from "react-color-extractor";
import ReactAvatarEditor from "react-avatar-editor";
import Slider from "@material-ui/core/Slider";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";

export default function DragNDrop({ ...props }) {
  const [file, setFile] = useState(0);
  const [scale, setScale] = useState(120);
  const [colors, setColors] = useState([]);
  const editor = useRef();
  const [img, setImg] = useState();
  const [signInColor, setSignInColor] = useState("transparent");

  // Get the window height and width to use for the canvas size
  const w = window.innerWidth - 2;
  const h = window.innerHeight - 2;

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      backgroundColor: signInColor,
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
    slider: {
      width: "100%",
      backgroundColor: "transparent",
      borderColor: "transparent",
      boxShadow: "none",
    },
  }));

  const classes = useStyles();

  const getColors = (c) => {
    setColors(c);
  };

  // if need canvas, use here
  const onClickSave = () => {
    if (editor) {
      const ed = editor.current;
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.

      const canvas = ed.getImage();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = ed.getImageScaledToCanvas();
    }
  };

  const onClick = (e) => {
    const bgColor = e.target.style.backgroundColor;
    console.log(bgColor);
    props.setSignInColor(bgColor);
  };

  const renderSwatches = () => {
    if (colors) {
      return colors.map((color, id) => {
        return (
          <Grid item xs={1} key={id}>
            <Button
              onClick={onClick}
              style={{
                backgroundColor: color,
                width: "1rem",
                height: "1rem",
              }}
            ></Button>
          </Grid>
        );
      });
    }
  };

  const onDropzoneChange = (acceptedFiles) => {
    // Do something with the files
    let newFile = { ...file };
    let uploadedFile = acceptedFiles[acceptedFiles.length - 1];
    if (uploadedFile) {
      newFile = URL.createObjectURL(uploadedFile);
      setFile(newFile);
    }
  };

  // Change effect func for the scale slider below the image.
  const handleSliderChange = (event, newValue) => {
    setScale(newValue);
  };


  const imgOrDropzone = () => {
    if (file) {
      return (
        <Grid
          item
          container
          display="flex"
          style={{ height: "100%", maxHeight: "100%" }}
        >
          <Grid
            item
            xs={12}
            style={{
              height: "80%",
              maxHeight: "80%",
            }}
          >
            <ReactAvatarEditor
              ref={editor}
              classes={classes.image}
              onLoadSuccess={onClickSave}
              image={file}
              width={w}
              height={h}
              border={0}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={scale / 100}
              rotate={0}
            />
          </Grid>
          <Grid item xs={12}>
            <Fab className={classes.slider}>
              <Slider
                value={scale}
                onChange={handleSliderChange}
                min={10}
                max={300}
                aria-labelledby="continuous-slider"
              />
            </Fab>
          </Grid>

          {/* Color extraction boxes */}
          <Grid item container xs={12}>
            <ColorExtractor src={file} getColors={getColors} />

            <Grid item container xs={12}>
              {renderSwatches()}
            </Grid>
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
        onChange={!file ? onDropzoneChange : null}
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
          container
          xs={12}
          style={{
            // overflow: "hidden",
            position: "relative",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          {imgOrDropzone()}
        </Grid>
      </Grid>
    </Container>
  );
}
