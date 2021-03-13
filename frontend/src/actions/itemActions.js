import {
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAIL,
  ITEM_FILTER_REQUEST,
  ITEM_FILTER_SUCCESS,
  ITEM_FILTER_FAIL,
  ITEM_TOP_REQUEST,
  ITEM_TOP_SUCCESS,
  ITEM_TOP_FAIL,
} from '../constants/itemConstants';
import axios from 'axios';

export const listItems = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST });
    const { data } = await axios.get(`/api/items?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({ type: ITEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.message : error.message });
  }
};
export const filterItems = (name) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_FILTER_REQUEST });
    const { data } = await axios.get(`/api/items/series/${name}`);

    dispatch({ type: ITEM_FILTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_FILTER_FAIL, payload: error.response && error.response.data.message ? error.response.message : error.message });
  }
};
export const listItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/items/${id}`);

    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.message : error.message });
  }
};

export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/items/${id}`, config);

    dispatch({ type: ITEM_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: ITEM_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const createItem = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/items`, {}, config);

    dispatch({ type: ITEM_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};
export const updateItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/items/${item._id}`, item, config);

    dispatch({ type: ITEM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};

export const listTopItems = () => async (dispatch) => {
  console.log('hits here');
  try {
    dispatch({ type: ITEM_TOP_REQUEST });
    const { data } = await axios.get(`/api/items`);

    dispatch({ type: ITEM_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ITEM_TOP_FAIL, payload: error.response && error.response.data.message ? error.response.message : error.message });
  }
};
