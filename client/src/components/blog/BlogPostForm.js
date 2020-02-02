import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
// import {canWriteBlogPost} from "../apiUtils";
// import {Redirect} from "react-router";
import FormField from "../FormField";
import FormEditorField from "../FormEditorField";
import { imageDelete } from "../../actions";
import ImageUpload from "../ImageUpload";
import { ImageBrowser } from "../ImageBrowser";


const mapStateToProps = state => ({
  ...state.blogpostForm,
  ...state.categoryList
});

class BlogPostForm extends React.Component {

  // componentWillUnmount() {
  //   const { image, imageDelete } = this.props;
  //   if (image !== null) {
  //     imageDelete(image._id);
  //   }
  // }

  onSubmit(values) {
    const {image} = this.props;
    this.props.onSubmit(values, image);
  }

  render() {
    // if (!canWriteBlogPost(this.props.userData)) {
    //   return <Redirect to="/login"/>
    // }

    const {
      submitting,
      image,
      categories,
      imageDelete,
      imageReqInProgress,
      postContent
    } = this.props;

    return (
      <div>
        <div className="card mt-3 mb-6 shadow-sm">
          <div className="card-body">
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name="title"
                label="Titre"
                type="text"
                component={FormField}
              />
              <Field
                name="content"
                label="Article"
                initialVal={postContent}
                component={FormEditorField}
              />

              <Field
                name="summary"
                label="Résumé"
                type="textarea"
                component={FormField}
              />
              <Field
                name="_category"
                label="Catégorie"
                type="select"
                options={categories}
                component={FormField}
              />
              <ImageUpload image={image} />
              <ImageBrowser image={image} deleteHandler={imageDelete} />
              {/* isLocked={imageReqInProgress} /> */}

              <button
                type="submit"
                className="btn btn-primary btn-big btn-block"
                disabled={submitting || imageReqInProgress}
              >
                > Publier l'article
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}
}

export default reduxForm({
  form: "BlogPostForm"
})(
  connect(
    mapStateToProps,
    { imageDelete }
  )(BlogPostForm)
);
