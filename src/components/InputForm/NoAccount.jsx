import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

export default function NoAccount(props) {
  return (
    <Grid item>
      <Link href="#" variant="body2" onClick={props.handleRegister}>
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  );
}
