import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "../FormField";
import postFieldsList from "./postFieldsList";
import { postAdd } from "../../actions";
import { connect } from "react-redux";
import { Button, Alert } from "react-bootstrap";

class PostForm extends Component {
  state = { showMessageSuccess: false };

  renderFields() {
    return postFieldsList.map(({ label, name, type }) => {
      return (
        <Field
          key={name}
          component={FormField}
          type={type}
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    const { reset } = this.props;
    return (
      <div className="mt-4">
        <h3>Laisser nous un message</h3>

        <div className="card" style={{ backgroundColor: "rgb(217, 236, 240)" }}>
          <div className="card-body">
            <form
              onSubmit={this.props.handleSubmit(async values => {
                await this.props.postAdd(values);
                this.setState({ showMessageSuccess: true });
                reset();
              })}
            >
              {this.renderFields()}
              <div className="text-center">
                <Button style={{'backgroundImage': 'linear-gradient(to left, #e6ef97, #b5c62c)', 'borderColor':'#b5c62c'}} className="btn-lg "  type="submit">
                  Envoyer
                </Button>
              </div>
            </form>
          </div>
        </div>

        {this.state.showMessageSuccess && (
          <Alert className="mt-4" variant="success">
            Merci! Votre message a bien été envoyé
          </Alert>
        )}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  postFieldsList.forEach(({ name, required }) => {
    if (required && !values[name]) {
      errors[name] = "Ce champ est obligatoire";
    }
  });
  // errors.recipients = validateEmails(values.recipients || '');

  return errors;
}

export default reduxForm({
  validate,
  form: "postForm"
})(
  connect(
    null,
    { postAdd }
  )(PostForm)
);
