import CartItem from './CartItem';
// import cartItems from './data';
import { useGlobalContext } from './context';

const CartContainer = () => {
  const { products, cartTotal, clearCart } = useGlobalContext();

  const cartArray = Array.from(products.values());

  if (cartArray.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartArray.map((cartItem) => {
          return <CartItem key={cartItem.id} {...cartItem} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div>
          <h5 className='cart-total'>
            total <span>${cartTotal.toFixed(2)}</span>
          </h5>
        </div>
        <button className='btn btn-hipster' onClick={() => clearCart()}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
