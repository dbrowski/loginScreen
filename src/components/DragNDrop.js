import React, { useState} from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { ColorExtractor } from "react-color-extractor";
import ReactAvatarEditor from "react-avatar-editor";

export default function DragNDrop({ ...props }) {
  const [file, setFile] = useState(0);
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

  const onDrop = (acceptedFiles) => {
    // Do something with the files
    let newFile = { ...file };
    let uploadedFile = acceptedFiles[acceptedFiles.length - 1];
    if (uploadedFile) {
      console.log(uploadedFile);
      newFile = URL.createObjectURL(uploadedFile);
      setFile(newFile);
    }
  };

  const imgOrDropzone = () => {
    if (file) {
      return (
        <ReactAvatarEditor
          image={file}
          width={500}
          height={500}
          border={0}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
          style={{ minHeight: "100%", minWidth: "100%" }}
        />
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
        <Grid item xs={12} style={{ overflow: "hidden" }}>
          {imgOrDropzone()}
        </Grid>
      </Grid>
    </Container>
  );
}
