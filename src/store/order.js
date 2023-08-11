import axios from 'axios';

export const addToDb = (obj) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updated } = await axios.post(
      '/api/orders',
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log('updated inside addto cart', updated);
    dispatch(_addToCart(updated, product, quantity));
  };
};

const initialState = { lineItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_DB':
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
