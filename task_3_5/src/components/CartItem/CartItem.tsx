import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/redux/store';

import { removeItem, updateQuantity } from 'src/redux/slices/cartSlice';
import delete_icon from 'src/assets/delete.svg';
import Button from '../Button/Button';

import './CartItem.css';

const CartItem = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <>
      {cartItems.map((el) => (
        <div key={el.id} className='cart-item bg-white rounded-lg p-2'>
          <img src={el.image} alt={el.title} className='cart-item_img' />
          <div className='cart-item_title'>{el.title}</div>
          <div className='cart-item_price'>
            Price: <span className='text-2xl font-bold'>${el.price}</span>
          </div>
          <Button
            icon={delete_icon}
            text='Delete'
            onClick={() => handleRemove(el.id)}
          />
          <div className='cart-item_counter flex flex-row gap-4 items-center'>
            <Button
              text='-'
              onClick={() => handleQuantityChange(el.id, el.quantity - 1)}
            />
            <div className='cart-item_count font-bold'>{el.quantity}</div>
            <Button
              text='+'
              onClick={() => handleQuantityChange(el.id, el.quantity + 1)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
