import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function EmailInput(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://developer.pingidentity.com/">
        Ping Identity
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
