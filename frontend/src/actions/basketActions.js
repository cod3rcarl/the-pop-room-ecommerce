import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from '../constants/basketConstants';
import axios from 'axios';

export const addToBasket = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/items/${id}`);

  dispatch({ type: BASKET_ADD_ITEM, payload: { item: data._id, name: data.name, image: data.image, price: data.price, countInStock: data.countInStock, qty } });

  localStorage.setItem('basketItems', JSON.stringify(getState().basket.basketItem));
};
