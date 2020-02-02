import React from "react";
import { connect } from "react-redux";
import { categoryListFetch, blogpostAdd } from "../../actions";
import BlogPostForm from "./BlogPostForm";
import Spinner from "../Spinner"
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  ...state.categoryList
});

class BlogPostCreate extends React.Component {
  componentDidMount() {
    this.props.categoryListFetch();
  }

  onSubmit(values, image) {
    const {history, blogpostAdd} = this.props;
    blogpostAdd(values, image).then(() => {
      history.push("/blog");
    });
  }

  render() {
    const {categories} = this.props;

    return (
      <div>
          <h3>Ajout d'un article</h3>
          {!categories && <Spinner />}
          {categories && <BlogPostForm onSubmit={this.onSubmit.bind(this)} categories={categories} initialValues={{ _category : categories[0]._id }} />}
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    {
      categoryListFetch,
      blogpostAdd
    }
  )(withRouter(BlogPostCreate));