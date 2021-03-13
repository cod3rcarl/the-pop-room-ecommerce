import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { isAuth } from './helpers/auth';

import { itemListReducer, itemDetailsReducer, itemDeleteReducer, itemCreateReducer, itemUpdateReducer, itemTopRatedReducer, itemFilterReducer } from './reducers/itemReducers';
import { basketReducer } from './reducers/basketReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeliverReducer, orderListMyReducer, orderListReducer } from './reducers/orderReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  itemDelete: itemDeleteReducer,
  itemCreate: itemCreateReducer,
  itemUpdate: itemUpdateReducer,
  itemFilter: itemFilterReducer,
  itemTopRated: itemTopRatedReducer,
  basket: basketReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

const basketItemsFromStorage = localStorage.getItem('basketItems') ? JSON.parse(localStorage.getItem('basketItems')) : [];
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : [];

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress') ? JSON.parse(localStorage.getItem('deliveryAddress')) : {};
const initialState = {
  basket: { basketItems: basketItemsFromStorage, deliveryAddress: deliveryAddressFromStorage, paymentMethod: paymentMethodFromStorage },
  userLogin: { userInfo: isAuth() },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
