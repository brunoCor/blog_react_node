import React from "react";
import BlogPostList from "./BlogPostList";

class Category extends React.Component {
  render() {
    const { category, blogposts } = this.props;
    // inserer une blogpostList !
    return (
      <div>
        <h2>{category.wording}</h2>
        <hr />
        <BlogPostList posts={blogposts} />
      </div>
    );
  }
}

export default Category;
