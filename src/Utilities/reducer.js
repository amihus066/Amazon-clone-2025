import React, { useReducer } from "react";
import { Type } from "./action.type";

//1/const [state, dispatcher] = useReducer(reducer, initialState);// import and initalize useReducer and next

//2/defininig the initial state
export const initialState = {
  basket: [],
  user: null,
};

//3/ dfining the reduce frunction

// keeping the current (...state ),keep the current basket (state...state.basket) & add the new item(action.item)
/*export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      return { ...state, basket: [...state.basket, action.item] };

    default:
      return state;
  }
};*/

//4/****Modefing the reducer inorder the cart to reflect the number of same items in a cart rather than showing the same item more than one times**** */

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      ///checking the same product alraedy in the basket//
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedBasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });

        return { ...state, basket: updatedBasket };
      }

    // second method of updating cart

    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id ? { ...item, amount: item.amount - 1 } : item
          )
          .filter((item) => item.amount > 0),
        // Filter out items with amount .0 and Remove item if amount becomes 0,
      };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};
