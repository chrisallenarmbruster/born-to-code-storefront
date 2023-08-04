import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import allProducts from './productAll';
import singleProduct from './productSingle';

const reducer = combineReducers({
  auth,
  cart,
  allProducts,
  singleProduct,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './cart';
