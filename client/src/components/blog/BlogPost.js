import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/fr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

class BlogPost extends React.Component {
  render() {
    const { post, deleteHandler } = this.props;
    const formatter = buildFormatter(frenchStrings);
    return (
      <div>
        <div className="d-flex mt-2">
          <div>
            <h2>{post.title}</h2>
          </div>
          <div className="ml-auto mr-2">
            {this.props.auth && (
              <div>
                <Button
                  as={Link}
                  to={`/editBlogpost/${post._id}`}
                  className="btn btn-primary mr-2"
                >
                  <FontAwesomeIcon icon="edit" />
                </Button>
                <Button
                  onClick={() => deleteHandler(post._id)}
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <hr />
        <p>
          <small className="text-muted">
            <FontAwesomeIcon icon="clock" /> Publié{" "}
            <TimeAgo date={post.createdOn} formatter={formatter} /> | Catégorie{" "}
            <Link to={`/categories/${post._category._id}`}>
              {post._category.wording}
            </Link>
          </small>
        </p>
        <div>
          {post._image && (
            <img
              className="img-fluid w-100"
              src={post._image.path}
              alt={"blog-img"}
            />
          )}
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content)
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth }; // same as (state) { auth: state.auth };
}

export default connect(mapStateToProps)(BlogPost);
