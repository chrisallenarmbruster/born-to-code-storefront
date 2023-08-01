import React from 'react';
import { logout } from '../store';
import { connect } from 'react-redux';

const Home = connect(
  state => state,
  dispatch => {
    return {
      logout: ()=> dispatch(logout())
    }
  }
)(({ auth, logout})=> { 
  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome { auth.username }!!
        <button onClick={ logout }>Logout</button>
      </div>
    </div>
  );
});

export default Home;
