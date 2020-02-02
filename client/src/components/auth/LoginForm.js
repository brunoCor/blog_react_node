import React, { PureComponent } from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "../FormField";
import { connect } from "react-redux";
import { userLoginAttempt } from "../../actions";
import { Button, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom"; // allow to use history

class LoginForm extends PureComponent {
  state = { MessageError: false };

  render() {
    return (
      <div>
        <h3>Se connecter</h3>
        <div className="card" style={{ backgroundColor: "#f2f1f1" }}>
          <div className="card-body">
            <form
              className="mt-4"
              onSubmit={this.props.handleSubmit(values => {
                this.setState({ MessageError: false });
                this.props
                  .userLoginAttempt(values, this.props.history)
                  .catch(error => {
                    this.setState({ MessageError: error.errors._error });
                  });
              })}
            >
              <Field
                name="username"
                label="Email"
                type="text"
                component={FormField}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                component={FormField}
              />
              <Button variant="primary" type="submit">
                Connexion
              </Button>
            </form>
            {this.state.MessageError && (
              <Alert className="mt-4" variant="danger">
                {this.state.MessageError}
              </Alert>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth
});

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Ce champ est obligatoire";
  }
  if (!values.password) {
    errors.password = "Ce champ est obligatoire";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "LoginForm"
})(
  connect(
    mapStateToProps,
    { userLoginAttempt }
  )(withRouter(LoginForm))
);
