// contains logic to render a single
// label and text input
import React from "react";
import Form from "react-bootstrap/Form";

export default ({ input, label, type, options, meta: { error, touched } }) => {
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      {type === "textarea" && (
        <Form.Control
          {...input}
          style={{ marginBottom: "5px" }}
          as="textarea"
          rows="4"
        />
      )}
      {(type === "text" || type === "password" || type === "email") && (
        <Form.Control {...input} style={{ marginBottom: "5px" }} as="input" />
      )}
      {options && type === "select" && (
        <Form.Control {...input} as="select">
          {options.map(option => (
            <option key={option._id} value={option._id}>
              {option.wording}
            </option>
          ))}
        </Form.Control>
      )}
      <Form.Text className="text-muted">{touched && error}</Form.Text>
    </Form.Group>
  );
};

// defaultValue={options[0]._id}
