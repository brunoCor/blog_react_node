import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import frenchStrings from "react-timeago/lib/language-strings/fr";
// import Message from './Message';

class BlogPostList extends React.Component {
  render() {
    const { posts, deleteHandler } = this.props; // only get posts field
    const formatter = buildFormatter(frenchStrings);
    // if (null === posts || 0 === posts.length) {
    //     return (<Message message="BlogPost does not exist" />);
    // }

    return (
      <div>
        {posts &&
          posts.map(post => (
            <div className="card mb-3 mt-3 shadow-sm" key={post._id}>
              <div className="card-body">
                <div className="d-flex">
                  <div>
                    <h4 className="float-left">
                      {post.subject}
                    </h4>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => deleteHandler(post._id)} //function doent execute during render
                      className="btn btn btn-danger"
                    >
                      <FontAwesomeIcon icon="trash-alt" />
                    </button>
                  </div>
                </div>
                <p className="card-text border-top mt-2">{post.body}</p>
                <p className="float-right">
                  <small className="text-muted">
                    <TimeAgo date={post.dateSent} formatter={formatter} /> | Envoyé par {post.name} | Email : {post.email}
                  </small>
                </p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default BlogPostList;
