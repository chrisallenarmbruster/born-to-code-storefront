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
                {/* I feel like the nav section can be built up into a separate Navbar component */}
                {/* When I worked on a similar project in the past, I had a cart component / cart info in the Navbar, just something to think about */}
                {/* I started a sample one */}
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
