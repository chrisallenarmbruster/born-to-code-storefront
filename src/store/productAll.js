import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_PRODUCTS_LOADING = 'SET_PRODUCTS_LOADING';
const CLEAR_PRODUCTS_LOADING = 'CLEAR_PRODUCTS_LOADING';

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

export const setProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(_setProductsLoading());
      const data = (await axios.get('/api/products')).data;
      dispatch(_setProducts(data));
      // await sleep(2000);
      dispatch(_clearProductsLoading());
    } catch (error) {
      console.log(error);
      dispatch(_clearProductsLoading());
    }
  };
};

//utility function to test loading state spinner animation
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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
    default:
      return state;
  }
};

export default allProductsReducer;
