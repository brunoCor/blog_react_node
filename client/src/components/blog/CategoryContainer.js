import React from "react";
import Category from "./Category";
import { connect } from "react-redux";
import {
  fetchBlogPostList,
  categoryBlogpostListFetch,
  categoryFetch,
  categorySetPage
} from "../../actions";
import CategoryList from "./CategoryList";
import LatestBlogPostList from "./LatestBlogPostList";
import Spinner from "../Spinner";
import { Paginator } from "../Paginator";
import { withRouter } from "react-router-dom";

class CategoryContainer extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchBlogPostList(5);
    this.props.categoryBlogpostListFetch();
    this.props.categoryFetch(id, this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    const {categorySetPage, categoryFetch, currentPage} = this.props;
    if (prevProps.match.params.page !== this.getQueryParamPage()) { //when we change url manually, paginator selected page is not updated
      categorySetPage(this.getQueryParamPage());
    }

    if (this.props.match.params.id !== prevProps.match.params.id || prevProps.currentPage !== currentPage) {
      categoryFetch(id, currentPage);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  changePage(page) {
    const id = this.props.match.params.id;
    const {history, categorySetPage} = this.props;
    categorySetPage(page);
    history.push(`/categories/${id}/${page}`);
  }

  onNextPageClick(e) {
    const {currentPage, pageCount} = this.props;
    const newPage = Math.min(currentPage + 1, pageCount);
    this.changePage(newPage);
  }

  onPrevPageClick(e) {
    const {currentPage} = this.props;
    const newPage = Math.max(currentPage - 1, 1);
    this.changePage(newPage);
  }

  render() {
    const {
      posts,
      categories,
      blogposts,
      category,
      isFetchingBlogPostList,
      isFetchingCategoryList,
      isFetchingCategory,
      pageCount, 
      currentPage
    } = this.props;
    let categoryContent =
      isFetchingCategory || !category ? (
        <Spinner />
      ) : (
        <div>
          <Category category={category} blogposts={blogposts} />
          { (pageCount>1) && <Paginator 
          currentPage={currentPage} pageCount={pageCount}
          setPage={this.changePage.bind(this)}
          nextPage={this.onNextPageClick.bind(this)}
          prevPage={this.onPrevPageClick.bind(this)}
        />}
        </div>
      );
    let categoryListContent =
      isFetchingCategoryList || !categories ? (
        <Spinner />
      ) : (
        <CategoryList categories={categories} />
      );
    let postListContent =
      isFetchingBlogPostList || !posts ? (
        <Spinner />
      ) : (
        <LatestBlogPostList posts={posts} />
      );

    return (
      <div className="row">
        <div className="col-md-8">{categoryContent}</div>
        <div className="col-md-4">
          {categoryListContent}
          {postListContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.category,
  ...state.blogpostList,
  ...state.categoryList
});
export default connect(
  mapStateToProps,
  { fetchBlogPostList, categoryBlogpostListFetch, categoryFetch, categorySetPage }
)(withRouter(CategoryContainer));
