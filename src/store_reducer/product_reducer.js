import { useReducer, useEffect, useState } from 'react';

const initialState = {
  fetching: false,
  products: [],
  error: null,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, fetching: true };
    case 'FETCHED':
      return { ...state, fetching: false, products: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};

async function fetchProducts(load, limit) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT}?page=${load}&limit=${limit}`, {
      next: {revalidate: 0}
    });
    const json = await res.json();
    return json;
  } catch (error) {
  throw new Error('Failed to fetch data');
  }
}

export default function cartReducer() {
 const [state, dispatch] = useReducer(productReducer, initialState);
 const [currentLoad, setCurrentLoad] = useState(1);
 const [limit, setLimit] = useState(5);
 useEffect(() => {
    fetchProductsAsync();
  }, [currentLoad]);
  const fetchProductsAsync = async () => {
      dispatch({ type: 'FETCHING' });
      try {
        const products = await fetchProducts(currentLoad, limit);
        dispatch({ type: 'FETCHED', payload: products });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
  
  const loadMore = () => {
    setCurrentLoad(prevPage => prevPage + 1);
  };
  
  const changeLimit = (val) => {
    setLimit(val);
  };

 return { products: state.products, fetching: state.fetching, fetchingError: state.error, loadMore, changeLimit }
}

