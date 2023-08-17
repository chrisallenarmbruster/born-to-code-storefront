import axios from 'axios';
import { addToCart, updateQuantity, emptyReduxCart } from '../store/cart';

const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

const _logout = () => {
  return { type: 'SET_AUTH', auth: {} };
};

const updateUserProfile = (user) => {
  return { type: UPDATE_USER_PROFILE, user };
};

export const logout = (navigate = () => {}) => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem('token');
      dispatch(_logout());
      dispatch(emptyReduxCart());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
};

async function handleAddToCart(product, quantity) {
  let temp = addToCart({ product, quantity });
}

export const loginWithToken = (cart, navigate = () => {}, register = false) => {
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

        const { data: existingCart } = await axios.get('/api/orders/cart', {
          headers: {
            authorization: token,
          },
        });

        if (cart.lineItems && cart.lineItems.length > 0) {
          for (let item of cart.lineItems) {
            const existingItem = existingCart.lineItems.find(
              (exItem) => exItem.product.id === item.product.id
            );
            if (existingItem) {
              const totalQuantity = existingItem.quantity + item.quantity;
              dispatch(
                updateQuantity({
                  cart: existingCart,
                  product: item.product,
                  quantity: totalQuantity,
                })
              );
            } else {
              dispatch(
                addToCart({ product: item.product, quantity: item.quantity })
              );
            }
          }
        } else {
          dispatch({ type: 'SET_CART', cart: existingCart });
        }

        if (register) {
          navigate(`/users/${response.data.id}?setup=true`);
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const attemptLogin = (credentials, navigate) => {
  console.log('attempting login', navigate, typeof navigate);
  return async (dispatch, getState) => {
    try {
      const cart = getState().cart;
      const response = await axios.post('/api/auth', credentials);
      window.localStorage.setItem('token', response.data);
      dispatch(loginWithToken(cart, navigate));
    } catch (error) {
      console.log(error);
    }
  };
};

export const attemptRegistration = (user, navigate) => {
  return async (dispatch, getState) => {
    try {
      const cart = getState().cart;
      const response = await axios.post('/api/auth/signup', user);
      window.localStorage.setItem('token', response.data);
      const register = true;
      dispatch(loginWithToken(cart, navigate, register));
    } catch (error) {
      console.log(error);
    }
  };
};

export const adjustUserDetails = (userId, userData) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const updatedUser = (
          await axios.put(`/api/users/${userId}`, userData, {
            headers: { authorization: token },
          })
        ).data;
        dispatch(updateUserProfile(updatedUser));
      }
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
    case 'UPDATE_USER_PROFILE':
      return action.user;
    default:
      return state;
  }
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product)),
});

export default authReducer;
