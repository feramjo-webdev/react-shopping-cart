import {
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
} from './actions';

const reducer = (state, action) => {
  // increase product
  if (action.type === INCREASE_PRODUCT) {
    const newProducts = state.products.map((product) => {
      if (action.payload.id === product.id) {
        return { ...product, amount: product.amount + 1 };
      }
      return product;
    });
    return { ...state, products: newProducts };
  }

  //   decrease product
  if (action.type === DECREASE_PRODUCT) {
    const newProducts = state.products
      .map((product) => {
        if (action.payload.id === product.id) {
          return { ...product, amount: product.amount - 1 };
        }
        return product;
      })
      .filter((product) => product.amount !== 0);
    return { ...state, products: newProducts };
  }

  //   remove product
  if (action.type === REMOVE_PRODUCT) {
    const newProducts = state.products.filter(
      (product) => product.id !== action.payload.id
    );
    return { ...state, products: newProducts };
  }

  if (action.type === CLEAR_CART) {
    return { state, products: [] };
  }
};

export default reducer;
