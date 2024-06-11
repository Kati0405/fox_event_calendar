import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import Button from '../Button/Button';
import logo from 'src/assets/logo.svg';
import cart_icon from 'src/assets/cart-icon.svg';

import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate('/cart');
  };

  const { quantity } = useSelector((state: RootState) => state.cart);
  return (
    <header className='header h-20 bg-neutral-900 w-full flex flex-row justify-between items-center shadow-xl'>
      <Link to='/'>
        <img src={logo} alt='Logo' className='header-logo h-10' />
      </Link>
      <div className='relative'>
        <div className='flex items-center justify-center rounded-full h-4 w-4 bg-yellow-200 absolute text-xs left-20'>
          {quantity}
        </div>
        <Button icon={cart_icon} text='Cart' onClick={navigateToCart} />
      </div>
    </header>
  );
};

export default Header;
