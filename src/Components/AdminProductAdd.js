import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/productAll';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const AdminProductAdd = ({ addProduct }) => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = (values) => {
    if (values.color === '' || values.color === 'Skip') {
      delete values.color;
    }
    handleClose();
    addProduct(values, navigate);
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(50),
    category: yup.string().required(),
    description: yup.string().required().min(3).max(1000),
    price: yup
      .number()
      .typeError('Price must be a number')
      .required()
      .min(0.01)
      .max(9999.99)
      .test(
        'maxDigitsAfterDecimal',
        'only two decimal places allowed',
        (number) => Number.isInteger(number * 10 ** 2)
      ),
  });

  return (
    <Fragment>
      <Button variant="primary" onClick={handleShow}>
        Add a Product
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Product</Modal.Title>
        </Modal.Header>{' '}
        <Formik
          validationSchema={schema}
          onSubmit={submitHandler}
          initialValues={{
            name: '',
            category: '',
            description: '',
            price: '',
            color: '',
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Fragment>
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>{' '}
                  <Form.Group controlId="formBasicSelect" className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      aria-label="Select product category"
                      name="category"
                      value={values.category}
                      placeholder="Select product category"
                      onChange={handleChange}
                      isValid={touched.category && !errors.category}
                      isInvalid={touched.category && !!errors.category}
                    >
                      <option value="" disabled>
                        Select product category
                      </option>
                      <option value="hats">Hats</option>
                      <option value="shirts">Shirts</option>
                      <option value="mugs">Mugs</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.category}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Enter product description"
                      value={values.description}
                      onChange={handleChange}
                      isValid={touched.description && !errors.description}
                      isInvalid={touched.description && !!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicText" className="mb-3">
                    <Form.Label>Specifications</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter a specification"
                      name="spec1"
                      onChange={handleChange}
                      className="mb-1"
                      value={values.spec1}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter a specification"
                      name="spec2"
                      onChange={handleChange}
                      className="mb-1"
                      value={values.spec2}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter a specification"
                      name="spec3"
                      onChange={handleChange}
                      className="mb-1"
                      value={values.spec3}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter a specification"
                      name="spec4"
                      onChange={handleChange}
                      value={values.spec4}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicSelect" className="mb-3">
                    <Form.Label>Color</Form.Label>
                    <Form.Select
                      aria-label="Select color"
                      name="color"
                      onChange={handleChange}
                      placeholder="Select option"
                      value={values.color}
                    >
                      <option value="" disabled>
                        Select color
                      </option>
                      <option value="Skip">Skip Color</option>
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
                      placeholder="Separate by commas like S,M,L,XL"
                      name="sizeOptions"
                      onChange={handleChange}
                      value={values.sizeOptions}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicText" className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image URL"
                      name="imageUrl1"
                      onChange={handleChange}
                      value={values.imageUrl1}
                    />
                  </Form.Group>
                  <Form.Group controlId="price" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      placeholder="Enter product price"
                      value={values.price}
                      onChange={handleChange}
                      isValid={touched.price && !errors.price}
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Feature this item"
                    name="isFeatured"
                    onChange={handleChange}
                    value={values.isFeatured}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="button"
                    onClick={handleClose}
                    title="Cancel"
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                  <Button type="submit" title="Submit Product">
                    <i className="bi bi-check-lg"></i>
                  </Button>
                </Modal.Footer>
              </Form>
            </Fragment>
          )}
        </Formik>
      </Modal>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product, navigate) => dispatch(addProduct(product, navigate)),
  };
};

export default connect(null, mapDispatchToProps)(AdminProductAdd);
