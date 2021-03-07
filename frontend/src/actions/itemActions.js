import { ITEM_LIST_FAIL, ITEM_LIST_REQUEST, ITEM_LIST_SUCCESS, ITEM_DETAILS_FAIL, ITEM_DETAILS_REQUEST, ITEM_DETAILS_SUCCESS } from '../constants/itemConstants';
import axios from 'axios';

export const listItems = () => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });
    const { data } = await axios.get('http://localhost:5000/api/items');

    dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.message : error.message });
  }
};

export const listItemDetails = (id) => async (dispatch) => {
  console.log('hits this point');
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/items/${id}`);

    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.message : error.message });
  }
};
