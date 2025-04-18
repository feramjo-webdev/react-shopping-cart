import { createContext, useEffect, useReducer, useContext } from 'react';
import {
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
} from './actions';
import cartItems from './data';
import reducer from './reducer';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const defaultState = {
  products: cartItems,
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const products = state.products;

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

  const totalAmount = products.reduce(
    (total, product) => total + product.amount,
    0
  );

  const cartTotal = products.reduce(
    (total, product) => total + product.price * product.amount,
    0
  );

  return (
    <GlobalContext.Provider
      value={{
        increaseProduct,
        decreaseProduct,
        removeProduct,
        clearCart,
        products,
        totalAmount,
        cartTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
