import { useDispatch } from 'react-redux';

import { addItem } from 'src/redux/slices/cartSlice';
import Button from '../Button/Button';
import plus_icon from 'src/assets/plus-icon.svg';

import './Item.css';

export type Item = {
  image: string;
  id: number;
  title: string;
  price: number;
  quantity: number;
};

const Item: React.FC<Item> = ({ image, id, title, price, quantity }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newItem = { image, id, title, price, quantity };
    dispatch(addItem(newItem));
  };
  return (
    <div className='item rounded-xl shadow-lg flex flex-col p-2 justify-between bg-white'>
      <div className='item_img'>
        <img src={image} alt='Chair' className='h-56' />
      </div>
      <div className='item_title text-base'>{title}</div>
      <div className='item_price text-2xl'>{`$ ${price}`}</div>
      <Button icon={plus_icon} text='Add to cart' onClick={handleAddToCart} />
    </div>
  );
};
export default Item;
