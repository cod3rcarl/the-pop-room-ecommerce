import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM } from '../constants/basketConstants';

export const basketReducer = (state = { basketItems: [] }, action) => {
  switch (action.type) {
    case BASKET_ADD_ITEM:
      const basket = action.payload;

      const itemExistsInBasket = state.basketItems.find((x) => x.item === basket.item);

      if (itemExistsInBasket) {
        return { ...state, basketItems: state.basketItems.map((x) => (x.item === itemExistsInBasket.item ? basket : x)) };
      } else {
        return { ...state, basketItems: [...state.basketItems, basket] };
      }

    case BASKET_REMOVE_ITEM:
      return { loading: false, items: action.payload };

    default:
      return state;
  }
};
