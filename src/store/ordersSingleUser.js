import axios from 'axios';

const SET_USER_ORDERS = 'SET_USER_ORDERS';
const CLEAR_USER_ORDERS = 'CLEAR_USER_ORDERS';
const SET_USER_ORDERS_LOADING = 'SET_USER_ORDERS_LOADING';
const CLEAR_USER_ORDERS_LOADING = 'CLEAR_USER_ORDERS_LOADING';

const _setUserOrders = (orders) => ({
  type: SET_USER_ORDERS,
  orders,
});

const _setUserOrdersLoading = () => ({
  type: SET_USER_ORDERS_LOADING,
});

const _clearUserOrdersLoading = () => ({
  type: CLEAR_USER_ORDERS_LOADING,
});

export const clearUserOrders = () => ({
  type: CLEAR_USER_ORDERS,
});

export const setUserOrders = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        dispatch(_setUserOrdersLoading());
        const data = (
          await axios.get(`/api/users/${id}/orders`, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch(_setUserOrders(data));
        dispatch(_clearUserOrdersLoading());
      }
    } catch (error) {
      console.log(error);
      dispatch(clearUserOrders());
      dispatch(_clearUserOrdersLoading());
    }
  };
};

export const resetUserOrders = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const data = (
          await axios.get(`/api/users/${id}/orders`, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch(_setUserOrders(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(clearUserOrders());
      dispatch(_clearUserOrdersLoading());
    }
  };
};

const initialState = {
  orders: [],
  isLoading: false,
};

const userOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ORDERS:
      return { ...state, orders: action.orders };
    case CLEAR_USER_ORDERS:
      return { ...state, orders: [] };
    case SET_USER_ORDERS_LOADING:
      return { ...state, isLoading: true };
    case CLEAR_USER_ORDERS_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default userOrdersReducer;
