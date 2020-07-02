import React from "react";
import TextField from "@material-ui/core/TextField";

export default function PasswordInput(props) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      color={props.color}
      name="password"
      label="Password"
      type="password"
      id="password"
      size="small"
      autoComplete="current-password"
      onChange={props.handlePasswordUpdate}
      style={{ backgroundColor: "rgba(255, 255, 255, .4" }}
    />
  );
}
