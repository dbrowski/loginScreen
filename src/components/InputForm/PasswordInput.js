import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EmailInput(props) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
      onChange={props.handlePasswordUpdate}
    />
  );
}
