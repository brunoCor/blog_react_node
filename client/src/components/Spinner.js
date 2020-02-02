import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Spinner extends React.Component {
  render() {
    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body text-center">
          {/* <i className="fas spinner fa-spin"/> */}
          <FontAwesomeIcon icon="spinner" spin />
        </div>
      </div>
    );
  }
}

export default Spinner;
