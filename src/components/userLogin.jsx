import React from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Flow, STATUS } from "../sdk";
import { PATH } from "./auth";
import _ from "lodash";
import SignInPage from "./SignInPage";
import { Container } from "@material-ui/core";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isSubmitting: false,
      redirect: null,
    };

    this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleResetFlow = this.handleResetFlow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameUpdate(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordUpdate(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    const { flow, authActions } = this.props;

    this.setState({
      isSubmitting: true,
      spinnerMessage: "Signing you on...",
      errorMessage: "",
    });

    console.log("flow");
    console.log(flow);

    if (flow.isCompleted()) {
      // Redirect to the resume endpoint in case of password recovery or new user registration process completion
      window.location.assign(flow.resumeUrl);
      return;
    }

    const validatePasswordUrl = _.get(
      flow.getLinks(),
      ["usernamePassword.check", "href"],
      null
    );
    if (!validatePasswordUrl) {
      this.setState({
        errorMessage:
          "An unexpected error has occurred. There is no user validation link in the flow.",
      });
      return;
    }

    console.log("validatePasswordUrl");
    console.log(validatePasswordUrl);

    return authActions
      .signOn(validatePasswordUrl, this.state.username, this.state.password)
      .then((newflow) => {
        console.log("newflow then");
        this.setState({
          isSubmitting: false,
        });
        console.log("newflow before promise");
        return Promise.resolve(newflow);
      })
      .catch((err) => {
        const errorDetail = _.get(err, "details[0].code", null);
        if (_.isEqual(errorDetail, STATUS.INVALID_CREDENTIALS)) {
          this.setState({
            errorMessage: "Incorrect username or password. Please try again.",
            isSubmitting: false,
          });
        } else if (_.isEqual(errorDetail, STATUS.PASSWORD_LOCKED_OUT)) {
          const secondsUntilUnlock = _.get(
            err,
            "details[0].innerError.secondsUntilUnlock",
            null
          );
          const timeUntilUnlockMsg =
            secondsUntilUnlock > 60
              ? `${Math.floor(secondsUntilUnlock / 60)} minutes`
              : `${secondsUntilUnlock} seconds`;
          const errorMessage = `Too many unsuccessful sign-on attempts. Your account will unlock in ${timeUntilUnlockMsg}.`;
          this.setState({
            redirect: (
              <Redirect
                to={{
                  pathname: PATH.UNABLE_TO_SIGN_IN,
                  state: { errorMessage },
                }}
              />
            ),
            isSubmitting: false,
          });
        } else {
          this.setState({
            errorMessage: "An unexpected error has occurred.",
          });
        }
      });
  }

  handleResetFlow() {
    const { flow, authActions } = this.props;

    const resetFlowUrl = _.get(
      flow.getLinks(),
      ["session.reset", "href"],
      null
    );
    if (!resetFlowUrl) {
      this.setState({
        errorMessage:
          "An unexpected error has occurred. There is no session reset link in the flow.",
      });
      return;
    }

    return authActions.resetFlow(resetFlowUrl).catch((err) => {
      this.setState({
        errorMessage: `An unexpected error has occurred. ${err}`,
      });
    });
  }

  handleForgotPassword() {
    this.setState({
      redirect: (
        <Redirect from={PATH.SIGN_ON} to={PATH.FORGOT_PASSWORD_USERNAME} />
      ),
    });
  }

  handleRegister() {
    this.setState({
      redirect: <Redirect from={PATH.SIGN_ON} to={PATH.REGISTER} />,
    });
  }

  handlePasswordReset() {
    this.setState({
      redirect: <Redirect from={PATH.SIGN_ON} to={PATH.CHANGE_PASSWORD} />,
    });
  }

  render() {
    const { username, password, redirect, errorMessage } = this.state;
    const { flow, message } = this.props;

    const alert =
      (errorMessage || message) &&
      (errorMessage || (message && message.isError) ? (
        <div className="alert alert-danger">
          {errorMessage ? errorMessage : message.content}
        </div>
      ) : (
        <div className="alert alert-success">{message.content}</div>
      ));

    if (flow) {
      // Rendering a Redirect will cause switch to the corresponding Route's content
      if (flow.isPasswordExpired()) {
        return (
          <Redirect
            to={{
              pathname: "/expired",
              state: { username, currentPassword: password },
            }}
          />
        );
      }

      const forgotPasswordUrl = _.get(
        flow.getLinks(),
        ["password.forgot", "href"],
        null
      );
      const forgotPasswordAnchor = forgotPasswordUrl && (
        <div className="input-field">
          <a
            href="#"
            data-id="recovery-button"
            onClick={this.handleForgotPassword}
          >
            Forgot Password
          </a>
        </div>
      );

      const userRegistrationLink = _.get(
        flow.getLinks(),
        ["user.register"],
        null
      );
      const registerUserAnchor = userRegistrationLink && (
        <div className="input-field">
          No account?{" "}
          <a data-id="register-button" href="#" onClick={this.handleRegister}>
            Register now!
          </a>
        </div>
      );

      const passwordResetLink = _.get(
        flow.getLinks(),
        ["password.reset"],
        null
      );
      const passwordResetAnchor = passwordResetLink && (
        <div className="input-field">
          <a
            data-id="reset-password-button"
            href="#"
            onClick={this.handlePasswordReset}
          >
            Reset password
          </a>
        </div>
      );

      const resetFlowLink = _.get(flow.getLinks(), ["session.reset"], null);
      const resetFlowAnchor = resetFlowLink && (
        <div className="input-field">
          <a
            data-id="session-reset-button"
            href="#"
            onClick={this.handleResetFlow}
          >
            Switch Accounts
          </a>
        </div>
      );

      return (
        <Container display="flex" disableGutters>
          {redirect}
          {alert}

          <SignInPage
            handleUsernameUpdate={this.handleUsernameUpdate}
            handlePasswordUpdate={this.handlePasswordUpdate}
            handleForgotPassword={this.handleForgotPassword}
            handleSubmit={this.handleSubmit}
            handlePasswordReset={this.handlePasswordReset}
            handleRegister={this.handleRegister}
          />
        </Container>
      );
    } else {
      return (
        <div className="container">
          {redirect}
          <div>Waiting for the flow ...</div>
        </div>
      );
    }
  }
}

UserLogin.propTypes = {
  authActions: PropTypes.shape({
    signOn: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    resetFlow: PropTypes.func.isRequired,
  }).isRequired,
  flow: PropTypes.instanceOf(Flow).isRequired,
};

export default UserLogin;
