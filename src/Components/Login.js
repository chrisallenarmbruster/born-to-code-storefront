import React, { useState, Fragment } from 'react';
import { attemptLogin, logout, attemptRegistration } from '../store';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { withRouter } from '../utils/withRouter';
import * as formik from 'formik';
import * as yup from 'yup';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  })
  const [login, setLogin] = useState(true)
  const [show, setShow] = useState(true)

  // onChange(ev) {
  //   this.setState({
  //     credentials: {
  //       ...this.state.credentials,
  //       [ev.target.name]: ev.target.value,
  //     },
  //   });
  // }

  // const onChangeRegister = (ev) => {
  //   setNewUser({
  //       ...newUser,
  //       [ev.target.name]: ev.target.value,
  //   });
  // }

  const toggleLogin = () => {
    setShow(true);
  }

  const toggleRegister = () => {
    setShow(false);
  }

  const loginSubmitHandler = (ev, values) => {
    ev.preventDefault();
    attemptLogin(values);
  }

  const registerSubmitHandler = (ev, values) => {
    ev.preventDefault();
    attemptRegistration(values);
  };

  const { Formik } = formik;

  const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required,
  })

  const registerSchema = yup.object().shape({
    username: yup.string().email("Invalid email").required('Required'),
    password: yup.string().required('Required'),
  });

  return (
    <Container>
        {props.auth.id ? (
          <Container className="mt-5">
            <h2 className="mb-3">Welcome {props.auth.username}!</h2>
            <Button onClick={props.logout}>Logout</Button>
          </Container>
        ) : (
          <Modal show={show}>
            <Modal.Header className="d-flex justify-content-center">
              {login ? (
                <div className="flex-column">
                  <Modal.Title className="text-center">Log In</Modal.Title>
                  <Button
                    className="text-decoration-none"
                    variant="link"
                    onClick={() => toggleRegister()}
                  >
                    or sign up
                  </Button>
                </div>
              ) : (
                <div className="flex-column justify-content-center">
                  <Modal.Title className="text-center">Sign Up</Modal.Title>
                  <span>
                    <Button
                      className="text-decoration-none"
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
                initialValues={{ username: "", password: "" }}
              >
                {({
                  handleSubmit,
                  handleChange, 
                  values,
                  touched,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Modal.Body>
                      <Form.Label
                        htmlFor="SignIn"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <span className="mb-3"> Enter email and password.</span>
                      </Form.Label>

                      <Form.Group controlId="username" className="mb-3">
                        <FloatingLabel controlId="floatingUsername" label="Email">
                          <Form.Label>Username</Form.Label>
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
                          <br />
                        </FloatingLabel>
                      </Form.Group>                     

                      <FloatingLabel controlId="floatingPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                      </FloatingLabel>
                      
                    </Modal.Body>
                    <Modal.Footer className="d-flex">
                      <Button
                        onClick={() => this.props.router.navigate(-1)}
                        title="Go Back"
                      >
                        <i className="bi bi-arrow-left h4"></i>
                      </Button>
                      <Button type="submit" title="Sign Up" className="h4">
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
                initialValues={{ username: "", password: "" }}
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
                  <Form noValidate onSubmit={registerSubmitHandler}>
                    <Modal.Body>
                      <Form.Label
                        htmlFor="SignUp"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <span className="mb-3"> Enter email and password.</span>
                      </Form.Label>
                      
                      <FloatingLabel controlId="floatingUsername" label="Email">
                        <Form.Label>Username</Form.Label>
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
                        <br />
                      </FloatingLabel>

                      <FloatingLabel controlId="floatingPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>

                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => this.props.router.navigate(-1)}
                        title="Go Back"
                      >
                        <i className="bi bi-arrow-left h4"></i>
                      </Button>
                      <Button
                        onClick={(e) => this.register(e)}
                        type="submit"
                        title="Sign Up"
                        className="h4"
                      >
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
  ) 
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials)),
    logout: () => dispatch(logout()),
    attemptRegistration: (user) => dispatch(attemptRegistration(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
