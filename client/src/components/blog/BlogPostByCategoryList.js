import React from "react";
import { Button } from "react-bootstrap";
import BlogPostList from "./BlogPostList";
import { Link } from "react-router-dom";

class BlogPostByCategory extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <div>
        {categories.map(category => (
          <div key={category._id} className="mt-4">
            <h3>{category.wording}</h3>
            <BlogPostList posts={category.blogposts} />
            <Button
              as={Link}
              to={`/categories/${category._id}`}
              variant="outline-secondary"
            >
              Voir tous les articles de "{category.wording}"
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

export default BlogPostByCategory;
