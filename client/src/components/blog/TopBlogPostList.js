import React from "react";
import { Link } from "react-router-dom";
class TopBlogPostList extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <div>
        <h3>A la une</h3>
        <div className="row">
          {posts.map(post => (
            <div
              key={post._id}
              className="col-md-6"
              
            >
              <div style={{ position: "relative" }}>
                {post._image && <img
                  className="img-fluid"
                  alt={`${post.title}`}
                  style={{ width: "100%" }}
                  width="653"
                  height="380"
                  src={ post._image.path}
                />}
                <div
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    left: "0",
                    width: "80%"
                  }}
                >
                  <div style={{backgroundColor: '#404040', color:'white', padding:'6px 8px', display:'inline-block'}}>{post._category.wording}</div>
                  <Link style={{ color: "white" }} to={`/article/${post._id}`}>
                    <h3 className="ml-3">{post.title}</h3>
                    {/* <p>{post.summary}</p> */}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TopBlogPostList;
