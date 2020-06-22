import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

export default function ForgotPassword(props) {
  return (
    <Grid item xs>
      <Link href="#" variant="body2" onClick={props.handleForgotPassword}>
        Forgot password?
      </Link>
    </Grid>
  );
}
