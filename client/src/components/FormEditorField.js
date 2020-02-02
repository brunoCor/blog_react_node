import React from "react";
import Form from "react-bootstrap/Form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default ({ input, label, name, initialVal, meta: { error, touched } }) => {
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <CKEditor
        // content={'hello world'}
        // events={{
        //   change: event => input.onChange(event.editor.getData())
        // }}
        as="input"
        name={name}
        editor={ClassicEditor}
        data=""
        onInit={editor => {
          if(initialVal !== undefined) {
            editor.setData(initialVal);
            input.value=initialVal;
          }
        }}
        onChange={(event, editor) => {
          input.onChange(input.value=editor.getData());
        }}
      />
    </Form.Group>
  );
};
