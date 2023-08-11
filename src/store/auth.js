import axios from 'axios';

export const logout = () => {
  window.localStorage.removeItem('token');
  return { type: 'SET_AUTH', auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const response = await axios.get('/api/auth', {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: 'SET_AUTH', auth: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/auth', credentials);
      window.localStorage.setItem('token', response.data);
      dispatch(loginWithToken());
    } catch (error) {
      console.log(error);
    }
  };
};

export const attemptRegistration = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/auth/signup', user);
      window.localStorage.setItem('token', response.data);
      dispatch(loginWithToken())
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.auth;
    default:
      return state;
  }
};

export default authReducer;
