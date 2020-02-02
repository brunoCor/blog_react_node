import React from "react";
import { connect } from "react-redux";
import { postListFetch, postDelete, postListSetPage } from "../../actions";
import PostList from "./PostList";
import Spinner from "../Spinner";
import { Paginator } from "../Paginator";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PostListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    this.changePage(1);
    this.props.postListFetch(1, this.state.search);
    event.preventDefault();
  }

  componentDidMount() {
    this.props.postListFetch(this.getQueryParamPage());
  }

  componentDidUpdate(prevProps) {
    const {currentPage, postListFetch, postListSetPage} = this.props;
    if (prevProps.match.params.page !== this.getQueryParamPage()) { //when we change url manually, paginator selected page is not updated
      postListSetPage(this.getQueryParamPage());
    }

    if (prevProps.currentPage !== currentPage) {
      postListFetch(currentPage);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  changePage(page) {
    const {history, postListSetPage} = this.props;
    postListSetPage(page);
    history.push(`/admin/messages/${page}`);
  }

  onNextPageClick(e) {
    const {currentPage, pageCount} = this.props;
    const newPage = Math.min(currentPage + 1, pageCount); // a mettre ds le paginator
    this.changePage(newPage);
  }

  onPrevPageClick(e) {
    const {currentPage} = this.props;
    const newPage = Math.max(currentPage - 1, 1);
    this.changePage(newPage);
  }

  render() {
    const { posts, postDelete, pageCount, currentPage, isFetching } = this.props;
    if (posts === null || isFetching ) {
      return <Spinner />;
    }
    return (
      <div>
        <form className="form-inline mt-2"  onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg ml-2" value={this.state.search} placeholder="Rechercher..." onChange={this.handleChange} />
          </div>
          <Button type="submit" className="ml-2" variant="primary"><FontAwesomeIcon icon="search"></FontAwesomeIcon></Button>
        </form>
          

        <PostList posts={posts} deleteHandler={postDelete} />
        { pageCount>1 && <Paginator 
          currentPage={currentPage} pageCount={pageCount}
          setPage={this.changePage.bind(this)}
          nextPage={this.onNextPageClick.bind(this)}
          prevPage={this.onPrevPageClick.bind(this)}
        />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // we'll access the props of blogPostList
  ...state.postList
});

export default connect(
  mapStateToProps,
  { postListFetch, postDelete, postListSetPage }
)(withRouter(PostListContainer));
