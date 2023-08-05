import axios from 'axios';

const _updateQuantity = (cart, product, quantity) => {
  return {
    type: 'UPDATE_QUANTITY',
    cart,
    product,
    quantity,
  };
};

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

export const updateQuantity = (obj) => {
  console.log('inside updateQuantity', obj);
  let { product, quantity } = obj;
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updated } = await axios.put(
      '/api/orders/cart/',
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_updateQuantity(updated, product, quantity));
  };
};

const initialState = { lineItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    case 'UPDATE_QUANTITY':
      return action.cart;

    default:
      return state;
  }
};

export default cartReducer;
