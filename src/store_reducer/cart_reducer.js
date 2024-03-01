import { useReducer } from 'react';

export const initialState = {
  cartItems: [],
  total: 0
}

export const reducer = (state, action) => {
  switch(action.type) {
    case "ADD":
      return {
        ...state,
        cartItems: action.payload
      }
    case "REMOVE":
      return {
        ...state,
        cartItems: action.payload
      }
    case "UPDATE_PRICE":
      return {
        ...state,
        total: action.payload
      }
    default: state
  }
};


export default function cartReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let message = "";
  
  const updatePrice = () => {
    let total = 0;
    state.cartItems.forEach(c => total += c.totalPrice);
    dispatch({
      type: "UPDATE_PRICE",
      payload: total
    })
  };
  

  const addToCart = (product) => {
    const updatedCart = state.cartItems;
    const exist = updatedCart.some(item => {
      return item._id === product._id
     })
    if (exist) {
      message = "product already added to cart";
    } else {
        updatedCart.unshift(product);
        dispatch({
          type: "ADD",
          payload: updatedCart
        })
        updatePrice();
      }
    const getItem = sessionStorage.getItem('cart');
    if (getItem !== null) {
        sessionStorage.removeItem('cart');
        sessionStorage.setItem('cart', JSON.stringify({cartItems: state.cartItems}));
    }else {
      sessionStorage.setItem('cart', JSON.stringify({cartItems: state.cartItems}));
    }
    message = "Item added to cart";
  };
  
  
  const removeToCart = (product) => {
    const updatedCart = state.cartItems.filter((item) => item._id !== product._id);
    dispatch({
      type: "REMOVE",
      payload: updatedCart
    })
    dispatch({type: "UPDATE_PRICE", payload: state.total - product.totalPrice})
    const getItem = sessionStorage.getItem('cart');
    if (getItem !== null) {
        sessionStorage.removeItem('cart');
        sessionStorage.setItem('cart', JSON.stringify({cartItems: state.cartItems}));
    }else {
      sessionStorage.setItem('cart', JSON.stringify({cartItems: state.cartItems}));
    }
    message = "Item removed from cart";
  };
  return { message, total: state.total, cartItems: state.cartItems, addToCart, removeToCart }
}
