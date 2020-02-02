import React from "react";
import { connect } from "react-redux";
import {
  blogPostFormFecth,
  categoryListFetch,
  blogpostUpdate
} from "../../actions";
import BlogPostForm from "./BlogPostForm";
import Spinner from "./../Spinner";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  ...state.blogpost,
  ...state.categoryList
});

class BlogPostEdit extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.blogPostFormFecth(id);
    this.props.categoryListFetch();
  }

  onSubmit(values, image) {
    const { history, blogpostUpdate } = this.props;
    const id = this.props.match.params.id;
    blogpostUpdate(values, image, id).then(() => {
      history.push("/blog");
    });
  }
  render() {
    const { post, isFetchingBlogPost, categories } = this.props;
    let formContent =
      isFetchingBlogPost || !post || !categories ? (
        <Spinner />
      ) : (
        <BlogPostForm
          onSubmit={this.onSubmit.bind(this)}
          postContent={post.content}
          categories={categories}
          initialValues={{
            title: post.title,
            _category: post._category._id,
            summary: post.summary
          }}
        />
      );
    return (
      <div>
        <h3>Modification d'un article</h3>
        {formContent}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    blogPostFormFecth,
    categoryListFetch,
    blogpostUpdate
  }
)(withRouter(BlogPostEdit));
