import {
  INCREASE_PRODUCT,
  DECREASE_PRODUCT,
  REMOVE_PRODUCT,
  CLEAR_CART,
  LOADING,
  DISPLAY_PRODUCTS,
} from './actions';

const reducer = (state, action) => {
  // loading
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  // display products
  if (action.type === DISPLAY_PRODUCTS) {
    const newProducts = new Map(
      action.payload.products.map((cartItem) => [cartItem.id, cartItem])
    );
    return { ...state, loading: false, products: newProducts };
  }

  // increase product
  if (action.type === INCREASE_PRODUCT) {
    const newProducts = new Map(state.products);
    const productId = action.payload.id;
    const product = newProducts.get(productId);
    const newProduct = { ...product, amount: product.amount + 1 };
    newProducts.set(productId, newProduct);
    return { ...state, products: newProducts };
  }

  //   decrease product
  if (action.type === DECREASE_PRODUCT) {
    const newProducts = new Map(state.products);
    const productId = action.payload.id;
    const product = newProducts.get(productId);
    if (product.amount === 1) {
      newProducts.delete(productId);
      return { ...state, products: newProducts };
    }
    const newProduct = { ...product, amount: product.amount - 1 };
    newProducts.set(productId, newProduct);
    return { ...state, products: newProducts };
  }

  //   remove product
  if (action.type === REMOVE_PRODUCT) {
    const newProducts = new Map(state.products);
    newProducts.delete(action.payload.id);
    return { ...state, products: newProducts };
  }

  if (action.type === CLEAR_CART) {
    return { state, products: new Map() };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
