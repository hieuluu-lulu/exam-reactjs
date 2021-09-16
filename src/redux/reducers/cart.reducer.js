import { createReducer } from '@reduxjs/toolkit';
import { LocalStorage } from '../../utils/getData';
import { CART_TYPES, REQUEST } from '../constants';

const cartItem = LocalStorage.getCart();

const cartState = {
  cartData: cartItem ? cartItem.cartData : [],
  totalCost: cartItem ? cartItem.totalCost : 0,
  cartNumber: cartItem ? cartItem.cartNumber : 0,
};

const cartReducer = createReducer(cartState, {
  [REQUEST(CART_TYPES.ADD_TO_CART)]: (state, action) => {
    let cartData = [...state.cartData];
    let newTotalCost = state.totalCost;
    let newCartNumber = state.cartNumber;

    newTotalCost += action.payload.quantity * action.payload.price;

    const cartIndex = cartData.findIndex((item) => item.id === action.payload.id);
    if (cartIndex !== -1) {
      cartData.splice(cartIndex, 1, {
        ...cartData[cartIndex],
        quantity: cartData[cartIndex].quantity + action.payload.quantity,
      });
    

      LocalStorage.setCart({
        cartData: cartData,
        totalCost: newTotalCost,
        cartNumber: newCartNumber,
      });

      return { ...state, cartData: cartData, totalCost: newTotalCost, cartNumber: newCartNumber };
    } else {
      cartData.push(action.payload);
      newCartNumber = cartData.length;
      LocalStorage.setCart({
        cartNumber: newCartNumber,
        cartData: cartData,
        totalCost: newTotalCost,
      });
      return {
        ...state,
        cartData: cartData,
        totalCost: newTotalCost,
        cartNumber: newCartNumber,
      };
    }
  },
  [REQUEST(CART_TYPES.UPDATE_QUANTITY)]: (state, action) => {
    let newCartData = [...state.cartData];
    let newTotalCost = state.totalCost;
    let newCartNumber = state.cartNumber;

    const index = newCartData.findIndex((item) => item.id === action.payload.item.id);

    if (action.payload.type === 'increase') {
      newCartData.splice(index, 1, {
        ...newCartData[index],
        quantity: newCartData[index].quantity + 1,
      });
      newTotalCost += newCartData[index].price;
      LocalStorage.setCart({
        cartData: newCartData,
        totalCost: newTotalCost,
        cartNumber: newCartNumber,
      });
      return {
        ...state,
        cartData: newCartData,
        totalCost: newTotalCost,
        cartNumber: newCartNumber,
      };
    } else {
      if (newCartData[index].quantity > 1) {
        newCartData.splice(index, 1, {
          ...newCartData[index],
          quantity: newCartData[index].quantity - 1,
        });
        newTotalCost -= newCartData[index].price;
        LocalStorage.setCart({
          cartData: newCartData,
          totalCost: newTotalCost,
          cartNumber: newCartNumber,
        });
        return {
          ...state,
          cartData: newCartData,
          totalCost: newTotalCost,
          cartNumber: newCartNumber,
        };
      }
    }
  },
  [REQUEST(CART_TYPES.DELETE_PRODUCT_IN_CART)]: (state, action) => {
    let newCartData = [...state.cartData];
          let newTotalCost = state.totalCost;
          let newCartNumber = state.cartNumber;
    const newCart = newCartData.filter((item) => item.id !== action.payload.id);
           newTotalCost -= action.payload.price * action.payload.quantity;
    newCartNumber -= 1;
  LocalStorage.removeCart()

    return { ...state, cartData: newCart, totalCost: newTotalCost, cartNumber: newCartNumber };
  },
  [REQUEST(CART_TYPES.REMOVE_CART)]: (state, action) => {
    state = { ...state, cartData: [], cartNumber: 0, totalCost: 0 };
    LocalStorage.removeCart();

    return { ...state };
  },
});
export default cartReducer;
