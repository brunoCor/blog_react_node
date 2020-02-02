import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class BlogPostList extends React.Component {
  render() {
    const { posts } = this.props;
    const formatter = buildFormatter(frenchStrings);
    return (
      <div>
        {posts.map(blogpost => (
          <div key={blogpost._id} className="card mb-3 mt-3 shadow-sm">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  {blogpost._image && <img
                    src={blogpost._image.path}
                    alt={blogpost.title}
                    className="img-fluid"
                  />}
                </div>
                <div className="col-md-10">
                  <div>
                    <Link to={`/article/${blogpost._id}`}>
                      {blogpost.title}
                    </Link>
                    <p>{blogpost.summary}</p>
                    <p>
                      <small className="text-muted">
                        <FontAwesomeIcon icon="clock" /> Publié{" "}
                        <TimeAgo
                          date={blogpost.createdOn}
                          formatter={formatter}
                        />
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default BlogPostList;
