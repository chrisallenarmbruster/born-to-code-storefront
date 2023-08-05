import React, { Component } from 'react';
import { attemptLogin, logout } from '../store';
import { connect } from 'react-redux';
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
            <form onSubmit={login}>
              <input
                placeholder="username"
                value={credentials.username}
                name="username"
                onChange={onChange}
              />
              <input
                placeholder="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
              <button>Login</button>
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
