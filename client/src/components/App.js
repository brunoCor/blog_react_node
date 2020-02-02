import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Landing from "./home-page/Landing";
import Contact from "./post/Contact";
import PostListContainer from "./post/PostListContainer";
import LoginForm from "./auth/LoginForm";
import BlogPostCreate from "./blog/BlogPostCreate";
import BlogPostListClientContainer from "./blog/BlogPostListClientContainer";
import BlogPostContainer from "./blog/BlogPostContainer";
import CategoryContainer from "./blog/CategoryContainer";
import BlogPostEdit from "./blog/BlogPostEdit";
// import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/contact-us" component={Contact} />
              <Route
                exact
                path="/admin/messages/:page?"
                component={PostListContainer}
              />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/addBlogpost" component={BlogPostCreate} />
              <Route exact path="/editBlogpost/:id" component={BlogPostEdit} />
              <Route
                exact
                path="/blog"
                component={BlogPostListClientContainer}
              />
              <Route exact path="/article/:id" component={BlogPostContainer} />
              <Route
                exact
                path="/categories/:id/:page?"
                component={CategoryContainer}
              />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
