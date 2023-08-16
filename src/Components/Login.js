import React, { useState } from 'react';
import { attemptLogin, logout, attemptRegistration } from '../store';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const LoginPage = ({ auth, attemptLogin, logout, attemptRegistration }) => {
  const [login, setLogin] = useState(true);
  const [show, setShow] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const toggleLogin = () => {
    setLogin(true);
    setError('');
  };

  const toggleRegister = () => {
    setLogin(false);
    setError('');
  };

  const loginSubmitHandler = async (values) => {
    await attemptLogin(values, navigate);
    if (!auth.id) {
      setError('Email or password is incorrect.');
    } else {
      setError('');
    }
  };

  const registerSubmitHandler = async (values) => {
    attemptRegistration(values, navigate);
    if (!auth.id) {
      setError(
        'Unable to register with provided email, account may already exist.'
      );
    } else {
      setError('');
    }
  };

  const logoutHandler = () => {
    setError('');
    logout();
    navigate(-1);
  };

  const { Formik } = formik;

  const loginSchema = yup.object().shape({
    username: yup.string().required('email is a required field'),
    password: yup.string().required(),
  });

  const registerSchema = yup.object().shape({
    username: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'must be valid email format'
      )
      .required('email is a required field'),
    password: yup
      .string()
      .min(6, 'password must be at least 6 characters')
      .max(24, 'password can be maximum 24 characters')
      .required(),
  });

  return (
    <Container>
      {auth.id ? (
        <Container className="mt-5">
          <h2 className="mb-3">Welcome {auth.username}!</h2>
          <Button onClick={logoutHandler}>Logout</Button>
        </Container>
      ) : (
        <Modal show={show}>
          <Modal.Header className="d-flex justify-content-center">
            {login ? (
              <div className="flex-column">
                <Modal.Title className="text-center my-0 py-0">
                  Log In
                </Modal.Title>
                <Button
                  className="text-decoration-none my-0 py-0"
                  variant="link"
                  onClick={() => toggleRegister()}
                >
                  or sign up
                </Button>
              </div>
            ) : (
              <div className="flex-column">
                <Modal.Title className="text-center my-0 py-0">
                  Sign Up
                </Modal.Title>
                <span>
                  <Button
                    className="text-decoration-none my-0 py-0"
                    variant="link"
                    onClick={() => toggleLogin()}
                  >
                    or log in
                  </Button>
                </span>
              </div>
            )}
          </Modal.Header>

          {login ? (
            <Formik
              validationSchema={loginSchema}
              onSubmit={loginSubmitHandler}
              initialValues={{ username: '', password: '' }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Form.Group controlId="username" className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your email"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {error && (
                      <Alert
                        variant={'danger'}
                        onClose={() => setError('')}
                        dismissible
                      >
                        {error}
                      </Alert>
                    )}
                  </Modal.Body>
                  <Modal.Footer className="d-flex">
                    <Button onClick={() => navigate(-1)} title="Go Back">
                      <i className="bi bi-arrow-left h4"></i>
                    </Button>
                    <Button type="submit" title="Log In" className="h4">
                      Log In
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              validationSchema={registerSchema}
              onSubmit={registerSubmitHandler}
              initialValues={{ username: '', password: '' }}
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
                <Form noValidate onSubmit={handleSubmit}>
                  <Modal.Body>
                    <Form.Group controlId="username" className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your email"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {error && (
                      <Alert
                        variant={'danger'}
                        onClose={() => setError('')}
                        dismissible
                      >
                        {error}
                      </Alert>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => navigate(-1)} title="Go Back">
                      <i className="bi bi-arrow-left h4"></i>
                    </Button>
                    <Button type="submit" title="Sign Up" className="h4">
                      Sign Up
                    </Button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>
          )}
        </Modal>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (credentials, navigate) =>
      dispatch(attemptLogin(credentials, navigate)),
    logout: () => dispatch(logout()),
    attemptRegistration: (user, navigate) =>
      dispatch(attemptRegistration(user, navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
