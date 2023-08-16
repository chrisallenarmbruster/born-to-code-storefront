import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_PRODUCTS_LOADING = 'SET_PRODUCTS_LOADING';
const CLEAR_PRODUCTS_LOADING = 'CLEAR_PRODUCTS_LOADING';
const ADD_PRODUCT = 'ADD_PRODUCT';

const _setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const _setProductsLoading = () => ({
  type: SET_PRODUCTS_LOADING,
});

const _clearProductsLoading = () => ({
  type: CLEAR_PRODUCTS_LOADING,
});

const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const setProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(_setProductsLoading());
      const data = (await axios.get('/api/products')).data;
      dispatch(_setProducts(data));
      dispatch(_clearProductsLoading());
    } catch (error) {
      console.log(error);
      dispatch(_clearProductsLoading());
    }
  };
};

export const resetProducts = () => {
  return async (dispatch) => {
    try {
      const data = (await axios.get('/api/products')).data;
      dispatch(_setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (product, navigate) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const data = (
          await axios.post('/api/products', product, {
            headers: {
              authorization: token,
            },
          })
        ).data;
        dispatch(_addProduct(data));
        navigate(`/products/${data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  data: [],
  isLoading: false,
};

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, data: action.products };
    case SET_PRODUCTS_LOADING:
      return { ...state, isLoading: true };
    case CLEAR_PRODUCTS_LOADING:
      return { ...state, isLoading: false };
    case ADD_PRODUCT:
      return { ...state, data: [...state.data, action.product] };
    default:
      return state;
  }
};

export default allProductsReducer;
