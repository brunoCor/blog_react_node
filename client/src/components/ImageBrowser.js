import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Alert from "react-bootstrap/Alert";

export class ImageBrowser extends React.Component {
  render() {
    const { image, deleteHandler } = this.props; // , deleteHandler, isLocked
    if (image) {
      const onImageDeleteClick = event => {
        event.preventDefault();
        deleteHandler(image._id);
      };
      return (
        <TransitionGroup component={null}>
          <CSSTransition timeout={1000} classNames="fade">
            <div className="col-md-6 col-lg-4">
              <div className="mt-2 mb-2">
                <img src={image.path} alt={"new"} className="img-fluid" />
              </div>
              <div className="mb-2">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={onImageDeleteClick}
                  // disabled={isLocked}
                >
                  Remove
                </button>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      );
    } else return <Alert variant={"info"}>Aucune image enregistrée</Alert>;
  }
}

export default ImageBrowser;
