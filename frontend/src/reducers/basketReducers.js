import { BASKET_ADD_ITEM, BASKET_REMOVE_ITEM, BASKET_SAVE_DELIVERY_ADDRESS, BASKET_SAVE_PAYMENT_METHOD } from '../constants/basketConstants';

export const basketReducer = (state = { basketItems: [], deliveryAddress: {}, paymentMethod: '' }, action) => {
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
      return { ...state, basketItems: state.basketItems.filter((x) => x.item !== action.payload) };
    case BASKET_SAVE_DELIVERY_ADDRESS:
      return { ...state, deliveryAddress: action.payload };
    case BASKET_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    default:
      return state;
  }
};
