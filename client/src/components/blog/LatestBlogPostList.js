import React from "react";
import { Link } from "react-router-dom";
class LatestBlogPostList extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="card mt-4">
        <div className="card-header">
          <h3>Derniers articles</h3>
        </div>

        <div className="card-body">
          <ul>
            {posts.map(post => (
              <li key={post._id}>
                <Link to={`/article/${post._id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default LatestBlogPostList;
