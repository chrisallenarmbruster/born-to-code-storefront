import React, { Component } from 'react';
import { attemptLogin, logout } from '../store';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'

//user should be able to register with an email
//username should be an email address

class Login extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
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
  render() {
    const { credentials } = this.state;
    const { onChange } = this;
    const { login } = this;
    return (
      <div className="container">
        {this.props.auth.id ? (
          <div>
            <div>
              <h2>Welcome {this.props.auth.username}!</h2>
            </div>
            <div>
              <button onClick={this.props.logout}>Logout</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Login</h2>
            <Button variant="primary">Login</Button>
            <Button variant="secondary">Register</Button>
            <p>Sign in with Username and Password</p>
            <form onSubmit={login}>
              <input
                placeholder="Username"
                value={credentials.username}
                name="username"
                onChange={onChange}
              />
              <input
                placeholder="password"
                name="Password"
                value={credentials.password}
                onChange={onChange}
              />
              <button>Login</button>
            </form>
            
            <p>Sign up with Username and Password</p>
            <form onSubmit={"signUp function here"}>
              <input
                placeholder="Username"
                value={""}
                name="username"
                onChange={onChange}
              />
              <input
                placeholder="Password"
                name="Password"
                value={""}
                onChange={onChange}
              />
              <input
                placeholder="Repeat Password"
                name="Repeat Password"
                value={""}
                onChange={onChange}
              />
              <button>Sign Up</button>
            </form>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
