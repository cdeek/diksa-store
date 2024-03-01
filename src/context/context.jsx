import Cookies from 'js-cookie';
import { createContext, useEffect, useReducer, useState } from 'react';
import { saveItem, unsaveItem } from '../saved_items/save_and_unsave';
import productReducer from '../store_reducer/product_reducer';
import cartReducer, { initialState } from '../store_reducer/cart_reducer';


export const Context = createContext();

export const authReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return {
        user: action.payload
      }
    case "LOGOUT":
      return {
        user: null
      }
    default: state
  }
}

export default function ContextProvider({children}) {
  const [state, dispatch] = useReducer(authReducer, {user: null});
  const [checkoutProducts, setCheckoutProducts] = useState([]);

  const { products, fetching, fetchingError, loadMore, changeLimit } = productReducer();
  const { total, cartItems, addToCart, removeToCart } = cartReducer();
 
  
  useEffect(()=> {
    const getUser = () => {
      try {
        const user = Cookies.get('userData');
        return user ? JSON.parse(user) : null;
      } catch (error) {
        console.error('Error getting cookie storage item:', error);
        alert(`please enable javascript in your browser settings`);
        return null;
      }
   };
   
   const newUser = getUser();
  
   if(newUser) {
     dispatch({type: "LOGIN", payload: newUser})
   }
   
     const getItem = sessionStorage.getItem('cart');
     if (getItem !== null) {
      const cartItem = JSON.parse(getItem);
       initialState.cartItems = cartItem.cartItems;
       initialState.cartItems.forEach(c => initialState.total += c.totalPrice);
     }
},[]);
  
  const values = {
    user: state.user,
    products, fetching, fetchingError,
    loadMore, changeLimit,
    total, cartItems, addToCart,
    removeToCart, dispatch,
    saveItem, unsaveItem,
    checkoutProducts,
    setCheckoutProducts
  };
  
  return(
      <Context.Provider value={values}>
        {children}
      </Context.Provider>
    )
}

