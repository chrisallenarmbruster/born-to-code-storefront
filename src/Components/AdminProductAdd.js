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
  imageUrl: '/images/sample_image.png',
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
    this.setState({ [event.target.name]: event.target.checked });
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
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.form.name}
                />
              </Form.Group>
              <Form.Group controlId="formBasicName" className="mb-3">
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
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product price"
                  name="price"
                  onChange={this.handleChange}
                />
              </Form.Group>
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
