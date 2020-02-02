import React from "react";
import BlogPost from "./BlogPost";
import { connect } from "react-redux";
import {
  fetchBlogPostList,
  categoryBlogpostListFetch,
  blogPostFecth,
  blogpostDelete
} from "../../actions";
import CategoryList from "./CategoryList";
import LatestBlogPostList from "./LatestBlogPostList";
import Spinner from "../Spinner";
import { withRouter } from "react-router-dom";

class BlogPostContainer extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchBlogPostList(5);
    this.props.categoryBlogpostListFetch();
    this.props.blogPostFecth(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.blogPostFecth(this.props.match.params.id); // update the post (url change)
    }
  }

  blogPostDelete(id) {
    const {history} = this.props;
    if (window.confirm("Etes vous sûre de vouloir supprimer cet Article ?")) {
      this.props.blogpostDelete(id)
      .then(() => {
          history.push('/blog');
        });
    }
  }

  renderBlogPostContent() {
    const { post, isFetchingBlogPost } = this.props;

    if (isFetchingBlogPost) {
      return <Spinner />;
    }

    return (
      <div>
        {post && (
          <BlogPost
            post={post}
            deleteHandler={this.blogPostDelete.bind(this)}
          />
        )}
      </div>
    );
  }

  // @todo factoriser le bandeau de droite avec BlogPostListClientContainer

  render() {
    const {
      posts,
      categories,
      isFetchingBlogPostList,
      isFetchingCategoryList
    } = this.props;

    let categoriesContent =
      isFetchingCategoryList || !categories ? (
        <Spinner />
      ) : (
        <CategoryList categories={categories} />
      );
    let postsContent =
      isFetchingBlogPostList || !posts ? (
        <Spinner />
      ) : (
        <LatestBlogPostList posts={posts} />
      );

    return (
      <div className="row">
        <div className="col-md-8">{this.renderBlogPostContent()}</div>
        <div className="col-md-4">
          {categoriesContent}
          {postsContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.blogpost,
  ...state.blogpostList,
  ...state.categoryList
});

export default connect(
  mapStateToProps,
  {
    fetchBlogPostList,
    categoryBlogpostListFetch,
    blogPostFecth,
    blogpostDelete
  }
)(withRouter(BlogPostContainer));
