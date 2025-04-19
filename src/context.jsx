import { createContext, useEffect, useReducer, useContext } from 'react';
import {
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
  LOADING,
  DISPLAY_PRODUCTS,
} from './actions';
import cartItems from './data';
import reducer from './reducer';
import { getTotals } from './utils';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const defaultState = {
  loading: false,
  products: new Map(),
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { totalAmount, cartTotal } = getTotals(state.products);

  const increaseProduct = (id) => {
    dispatch({ type: INCREASE_PRODUCT, payload: { id } });
  };

  const decreaseProduct = (id) => {
    dispatch({ type: DECREASE_PRODUCT, payload: { id } });
  };

  const removeProduct = (id) => {
    dispatch({ type: REMOVE_PRODUCT, payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const fetchProducts = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    if (!response.ok) {
      const products = [];
      dispatch({ type: DISPLAY_PRODUCTS, payload: { products } });
      return;
    }
    const products = await response.json();
    dispatch({ type: DISPLAY_PRODUCTS, payload: { products } });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        increaseProduct,
        decreaseProduct,
        removeProduct,
        clearCart,
        ...state,
        totalAmount,
        cartTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
