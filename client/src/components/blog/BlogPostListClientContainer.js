import React from "react";
import { connect } from "react-redux";
import { fetchBlogPostList, categoryBlogpostListFetch } from "../../actions";
import TopBlogPostList from "./TopBlogPostList";
import BlogPostByCategoryList from "./BlogPostByCategoryList";
import CategoryList from "./CategoryList";
import LatestBlogPostList from "./LatestBlogPostList";
import Spinner from "../Spinner";

class BlogPostListClientContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBlogPostList(5);
    this.props.categoryBlogpostListFetch();
  }

  render() {
    // called the first time before componentDidMount
    const {
      posts,
      categories,
      postsLoaded,
      isFetchingBlogPostList,
      isFetchingCategoryList
    } = this.props;

    if (isFetchingBlogPostList || isFetchingCategoryList) {
      return <Spinner />;
    }
    return (
      <div>
        {posts && <TopBlogPostList posts={posts.slice(0, 2)} />}
        <div className="row">
          <div className="col-md-8">
            {postsLoaded && categories && (
              <BlogPostByCategoryList categories={categories} />
            )}
          </div>
          <div className="col-md-4">
            {postsLoaded && categories && (
              <CategoryList categories={categories} />
            )}
            {posts && <LatestBlogPostList posts={posts} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.blogpostList,
  ...state.categoryList
});

export default connect(
  mapStateToProps,
  { fetchBlogPostList, categoryBlogpostListFetch }
)(BlogPostListClientContainer);
