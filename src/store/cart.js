import axios from 'axios';

const _deleteFromCart = (product, cart) => {
  return {
    type: 'DELETE_FROM_CART',
    product,
    cart,
  };
};

const _updateQuantity = (product, cart) => {
  return {
    type: 'UPDATE_QUANTITY',
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

export const updateQuantity = (obj) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updated } = await axios.put('/api/orders/cart/', obj, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_updateQuantity(updated, obj.cart));
  };
};

const initialState = { lineItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    case 'DELETE_FROM_CART':
      const newLineItems = state.lineItems.reduce((items, item) => {
        if (item.id === action.product.id) {
          if (item.quantity > 1) {
            items.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          items.push(item);
        }
        return items;
      }, []);
      return { ...state, lineItems: newLineItems };
    case 'UPDATE_QUANTITY':
      const updatedLineItems = state.lineItems.reduce((items, item) => {
        if (item.id === action.product.id) {
          items.push({ ...item, quantity: action.product.quantity });
        } else {
          items.push(item);
        }
        return items;
      }, []);
      return { ...state, lineItems: updatedLineItems };
    default:
      return state;
  }
};

export default cartReducer;
