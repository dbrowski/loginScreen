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
      label="Username"
      name="username"
      autoComplete="email"
      autoFocus
      onChange={props.handleUsernameUpdate}
    />
  );
}
