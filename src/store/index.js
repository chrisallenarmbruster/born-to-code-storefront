import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import allProducts from './productAll';
import singleProduct from './productSingle';
import ordersSingleUser from './ordersSingleUser';

const reducer = combineReducers({
  auth,
  cart,
  allProducts,
  singleProduct,
  ordersSingleUser,
});

// Compose enhancers with trace option enabled
const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

const store = createStore(reducer, enhancer);

export default store;

export * from './auth';
export * from './cart';
