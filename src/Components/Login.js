import React, { Component } from 'react';
import { attemptLogin, logout, attemptRegistration } from '../store';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

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
      login: true,
      register: false,
      show: true,
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.onChangeRegister = this.onChangeRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
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

  toggleLogin() {
    this.setState({
      login: true,
      register: false,
    });
  }

  toggleRegister() {  
    this.setState({
      login: false,
      register: true,
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
          <Modal show={this.state.show}>
            <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'10px'}}>
              <Button variant="primary" onClick={() => this.toggleLogin()}>Login</Button>
              <Button variant="secondary" onClick={() => this.toggleRegister()}>Register</Button>
            </div>
            
            <br />

            {this.state.login ? (<div>
              <Form.Label htmlFor="SignIn" style={{ display: 'flex',alignItems: 'center', justifyContent: 'center',marginTop:'10px' }}>Sign in with Email and Password</Form.Label>
              <Form onSubmit={login}>
                <FloatingLabel controlId="floatingUsername" label="Email">
                  <Form.Control type="text" placeholder="Email" value={credentials.username} name="username" onChange={onChange}/>
                  <br />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" value={credentials.password} name="password" onChange={onChange}/>
                </FloatingLabel>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'10px' }}><Button type="submit">Login</Button></div>             
            </Form>
            </div>) : (
              <div>
                <Form.Label htmlFor="SignUp" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'10px' }}>Sign up with Username and Password</Form.Label>
                <Form onSubmit={(e) => this.register(e)}>
                  <FloatingLabel controlId="floatingUsername" label="Email">
                    <Form.Control type="email" placeholder="Email" name="username" value={newUser.username} onChange={this.onChangeRegister}/>           
                    <br />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" name="password" value={newUser.password} onChange={this.onChangeRegister}/>
                  </FloatingLabel>
                    
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'10px'}}><Button onClick={(e) => this.register(e)} type="submit">Sign Up</Button></div> 
                </Form>  
              </div>
            )}  
          </div>
          </Modal>       
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
