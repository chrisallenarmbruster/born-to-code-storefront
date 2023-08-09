import React, { Component } from 'react';
import { attemptLogin, logout, attemptRegistration } from '../store';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

//user should be able to register with an email
//username should be an email address

//leaving toggle for later, need to get the register form working first

class Login extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
      newUser: {
        username: '',
        password: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);

    this.onChangeRegister = this.onChangeRegister.bind(this);
  }
  
  onChange(ev) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [ev.target.name]: ev.target.value,
      },
    });
  }
  
  login(ev) {
    ev.preventDefault();
    this.props.attemptLogin(this.state.credentials);
  }

  register(ev) {
    ev.preventDefault();
    this.props.attemptRegistration(this.state.newUser);
    this.setState({ 
      newUser: {
        username: '',
        password: '',
      },
    })
  }

  onChangeRegister(ev) {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [ev.target.name]: ev.target.value,
      },
    });
  }

  render() {
    const { credentials } = this.state;
    const { onChange } = this;
    const { login } = this;
    const { newUser } = this.state;
    
    return (
      <div className="container">
        {this.props.auth.id ? (
          <div>
            <div>
              <h2>Welcome {this.props.auth.username}!</h2>
            </div>
            <div>
              <Button onClick={this.props.logout}>Logout</Button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <Button variant="primary">Login</Button>
            <Button variant="secondary">Register</Button>
            <br />

            <Form.Label htmlFor="SignIn">Sign in with Email and Password</Form.Label>
            <Form onSubmit={login}>
              <FloatingLabel controlId="floatingUsername" label="Email">
                <Form.Control type="text" placeholder="Email" value={credentials.username} name="username" onChange={onChange}/>
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" value={credentials.password} name="password" onChange={onChange}/>
              </FloatingLabel>
              
              <Button type="submit">Login</Button>
            </Form>
            
            <Form.Label htmlFor="SignUp">Sign up with Username and Password</Form.Label>
            <Form onSubmit={(e) => this.register(e)}>
              <FloatingLabel controlId="floatingUsername" label="Email">
                <Form.Control type="email" placeholder="Email" name="username" value={newUser.username} onChange={this.onChangeRegister}/>
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" name="password" value={newUser.password} onChange={this.onChangeRegister}/>
              </FloatingLabel>

              {/* <FloatingLabel controlId="floatingRepeatPassword" label="Repeat Password">
                <Form.Control type="password" placeholder="Repeat Password" name="repeat_password" value={""} onChange={onChange}/>
              </FloatingLabel> */}
             
              <Button onClick={(e) => this.register(e)} type="submit">Sign Up</Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
