import React, { Component } from 'react';
import Home from './Home';
import Login from './Login';
import Cart from './Cart';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const App = connect(
  state => state,
  dispatch => {
    return {
      loginWithToken: ()=> dispatch(loginWithToken()),
      fetchCart: ()=> dispatch(fetchCart())
    };
  }
)(class App extends Component{
  componentDidMount(){
    this.props.loginWithToken();
  }
  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }
  render(){
    const { auth } = this.props;
    return (
      <div>
        <h1>Acme Shopping</h1>
        {
          auth.id ? <Home /> : <Login />
        }
        {
          !!auth.id  && (
            <div>
              <nav>
                <Link to='/'>Home</Link>
                <Link to='/cart'>Cart</Link>
              </nav>
              <Routes>
                <Route path='/cart' element={ <Cart /> } />
              </Routes>
            </div>
          )
        }
      </div>
    );
  }
});

export default App;
