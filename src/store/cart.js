import axios from 'axios';

const _deleteFromCart = (product, cart) => {
  return {
    type: 'DELETE_FROM_CART',
    product,
    cart,
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

//BUG: this is not working properly

// Thunk that reduces the quantity of a lineItem in the cart by the amount specified in the quantity property of the object passed in as an argument
// If the quantity is reduced to 0, the lineItem is removed from the cart

export const deleteFromCart = (obj) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updated } = await axios.put('/api/orders/cart/', obj, {
      headers: {
        authorization: token,
      },
    });
    console.log('updated ', updated);
    dispatch(_deleteFromCart(updated, obj.cart));
  };
};

const initialState = { lineItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    case 'DELETE_FROM_CART':
      return state.lineItems.map((item) => {
        if (item.id === action.cart.lineItems.id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};

export default cartReducer;
