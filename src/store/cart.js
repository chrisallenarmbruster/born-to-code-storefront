import axios from 'axios';

const _updateQuantity = (cart, product, quantity) => {
  return {
    type: 'UPDATE_QUANTITY',
    cart,
    product,
    quantity,
  };
};

const _addToCart = (cart, product, quantity) => {
  return {
    type: 'ADD_TO_CART',
    cart,
    product,
    quantity,
  };
};

const _addOrder = (order) => {
  return {
    type: 'ADD_ORDER',
    order,
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

export const addToCart = (obj) => {
  console.log(
    'inside addToCart product : ',
    obj.product,
    'quantity : ',
    obj.quantity
  );
  let { product, quantity } = obj;
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updated } = await axios.post(
      '/api/orders/cart',
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

export const addOrders = (obj) => {
  console.log('inside updateOrders', obj);
  let {
    first,
    last,
    address,
    state,
    zip,
    email,
    // date,
    // paymentMethod,
    // transactionId,
  } = obj;
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updated } = await axios.post(
      '/api/orders/',
      {
        name: `${first} ${last}`,
        address,
        state,
        zip,
        email,
        // date,
        // paymentMethod,
        // transactionId,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_addOrder(updated));
  };
};

const initialState = { lineItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    case 'UPDATE_QUANTITY':
      return action.cart; //.sort((a, b) => a.id - b.id);
    case 'ADD_TO_CART':
      return action.cart;
    case 'ADD_ORDER':
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
