import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import { addProduct } from '../store/productAll';

const initialState = {
  name: '',
  category: '',
  description: '',
  descriptionPlus: '',
  spec1: '',
  spec2: '',
  spec3: '',
  spec4: '',
  sizeOptions: '',
  color: '',
  imageUrl1: '/images/sample_image.png',
  price: 0,
  isFeatured: false,
};

export class AdminProductAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: initialState,
      showModal: false,
    };
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleChange = async (event) => {
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.value },
    });
  };

  handleCheckboxChange = (event) => {
    this.setState({
      form: { ...this.state.form, [event.target.name]: event.target.checked },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const product = Object.keys(this.state.form).reduce((acc, key) => {
      if (this.state.form[key] !== '') {
        acc[key] = this.state.form[key];
      }
      return acc;
    }, {});

    product.price = Number(product.price);
    this.props.addProduct(product);
    this.setState({ form: initialState });
    this.handleClose();
  };

  handleClear = (event) => {
    event.preventDefault();
    this.setState({ form: initialState });
  };

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          Add a Product
        </Button>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {' '}
            <Form>
              <Form.Group controlId="formBasicText" className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.form.name}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSelect" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Select product category"
                  name="category"
                  onChange={this.handleChange}
                  placeholder="Select option"
                  value={this.state.form.category}
                >
                  <option value="" disabled>
                    Select product category
                  </option>
                  <option value="hats">Hats</option>
                  <option value="shirts">Shirts</option>
                  <option value="mugs">Mugs</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formBasicText" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText" className="mb-3">
                <Form.Label>Specifications</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a specification."
                  name="spec1"
                  onChange={this.handleChange}
                  className="mb-1"
                />
                <Form.Control
                  type="text"
                  placeholder="Enter a specification."
                  name="spec2"
                  onChange={this.handleChange}
                  className="mb-1"
                />
                <Form.Control
                  type="text"
                  placeholder="Enter a specification."
                  name="spec3"
                  onChange={this.handleChange}
                  className="mb-1"
                />
                <Form.Control
                  type="text"
                  placeholder="Enter a specification."
                  name="spec4"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSelect" className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Select
                  aria-label="Select color"
                  name="color"
                  onChange={this.handleChange}
                  placeholder="Select option"
                  value={this.state.form.category}
                >
                  <option value="" disabled>
                    Select color
                  </option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Orange">Orange</option>
                  <option value="Purple">Purple</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Grey">Grey</option>
                  <option value="Pink">Pink</option>
                  <option value="Brown">Brown</option>
                  <option value="Multi-Color">Multi-Color</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formBasicText" className="mb-3">
                <Form.Label>Available Sizes</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="i.e 'S,M,L,XL'"
                  name="sizeOptions"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText" className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="imageUrl1"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicText" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product price"
                  name="price"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Feature this item."
                name="isFeatured"
                onChange={this.handleCheckboxChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="secondary" onClick={this.handleClear}>
              Clear
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
  };
};

export default connect(null, mapDispatchToProps)(AdminProductAdd);
