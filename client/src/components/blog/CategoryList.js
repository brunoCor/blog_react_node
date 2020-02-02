import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
class CategoryList extends React.Component {
  render() {
    const { categories } = this.props;

    return (
      <div className="card mt-4">
        <div className="card-header">
          <h3>Catégories</h3>
        </div>
        <div className="card-body">
          <ListGroup>
            {categories.map(category => (
              <ListGroup.Item key={category._id}>
                <Link to={`/categories/${category._id}`}>
                  {category.wording}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default CategoryList;
