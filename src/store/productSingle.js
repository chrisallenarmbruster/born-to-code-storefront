import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
const CLEAR_SINGLE_PRODUCT = 'CLEAR_SINGLE_PRODUCT';
const SET_SINGLE_PRODUCT_LOADING = 'SET_SINGLE_PRODUCT_LOADING';
const CLEAR_SINGLE_PRODUCT_LOADING = 'CLEAR_SINGLE_PRODUCT_LOADING';

const _setSingleProduct = (product) => ({
  type: SET_SINGLE_PRODUCT,
  product,
});

const _setSingleProductLoading = () => ({
  type: SET_SINGLE_PRODUCT_LOADING,
});

const _clearSingleProductLoading = () => ({
  type: CLEAR_SINGLE_PRODUCT_LOADING,
});

export const clearSingleProduct = () => ({
  type: CLEAR_SINGLE_PRODUCT,
});

export const setSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch(_setSingleProductLoading());
      const data = (await axios.get(`/api/products/${id}`)).data;
      dispatch(_setSingleProduct(data));
      dispatch(_clearSingleProductLoading());
    } catch (error) {
      console.log(error);
      dispatch(_clearSingleProductLoading());
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
  data: {},
  isLoading: false,
};

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return { ...state, data: action.product };
    case CLEAR_SINGLE_PRODUCT:
      return { ...state, data: {} };
    case SET_SINGLE_PRODUCT_LOADING:
      return { ...state, isLoading: true };
    case CLEAR_SINGLE_PRODUCT_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default singleProductReducer;
