import axios from 'axios';

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export const deleteFromCart = (obj) => {
  console.log('THUNK| inside delete from cart', obj);
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/orders/cart/', obj, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'DELETE_FROM_CART', cart: response.data });
  };
};

const initialState = { lineItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    case 'DELETE_FROM_CART':
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
