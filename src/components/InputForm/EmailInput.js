import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EmailInput(props) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="username"
      color={props.color}
      label="Username"
      name="username"
      autoComplete="email"
      autoFocus
      size="small"
      onChange={props.handleUsernameUpdate}
      style={{backgroundColor: "rgba(255, 255, 255, .4"}}
    />
  );
}
