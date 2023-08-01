import React, { Component } from 'react';
import { attemptLogin } from '../store';
import { connect } from 'react-redux';

const Login = connect(
  null,
  dispatch => {
    return {
      attemptLogin: (credentials)=> dispatch(attemptLogin(credentials))
    };
  }
)(class Login extends Component{
  constructor(){
    super();
    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }
  onChange(ev){
    this.setState({
      credentials: { ...this.state.credentials, [ev.target.name]: ev.target.value }
    });
  }
  login(ev){
    ev.preventDefault();
    this.props.attemptLogin(this.state.credentials);
  }
  render(){
    const { credentials } = this.state;
    const { onChange } = this;
    const { login } = this;
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={ login }>
          <input
            placeholder='username'
            value = { credentials.username }
            name = 'username'
            onChange = { onChange }
            />
          <input
            placeholder='password'
            name = 'password'
            value={ credentials.password }
            onChange = { onChange }
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
});

export default Login;
