import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { itemListReducer, itemDetailsReducer } from './reducers/itemReducers';
import { basketReducer } from './reducers/basketReducers';

import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({ itemList: itemListReducer, itemDetails: itemDetailsReducer, basket: basketReducer });

const basketItemsFromStorage = localStorage.getItem('basketItems') ? JSON.parse(localStorage.getItem('basketItems')) : [];
const initialState = {
  basket: { basket: basketItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
