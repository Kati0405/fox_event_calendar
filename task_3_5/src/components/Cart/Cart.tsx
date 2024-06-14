import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import { useNavigate } from 'react-router-dom';

import {
  selectCartQuantity,
  selectCartTotal,
} from 'src/redux/selectors/cartSelector';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const quantity = useSelector(selectCartQuantity);
  const total = useSelector(selectCartTotal);

  const navigate = useNavigate();
  const navigateToContactInfo = () => {
    navigate('contact_information');
  };

  return (
    <div className='mx-60 flex flex-col gap-4 items-start'>
      <h1 className='text-4xl text-dark-blue'>Cart</h1>
      <CartItem />

      <div className='cart-total_quantity text-dark-blue text-xl'>
        Together: <span className='font-bold'>{quantity} products</span>
      </div>
      <div className='cart-sum text-dark-blue text-xl'>
        Sum:
        <span className='font-bold'> ${total.toFixed(2)}</span>
      </div>
      {cartItems.length !== 0 ? (
        <Button text='Next step' onClick={navigateToContactInfo} />
      ) : null}
    </div>
  );
};

export default Cart;
