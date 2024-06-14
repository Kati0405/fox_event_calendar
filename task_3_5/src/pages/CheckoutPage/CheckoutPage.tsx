import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/redux/store';

import { clearCart } from 'src/redux/slices/cartSlice';
import Button from 'src/components/Button/Button';
import profile_icon from 'src/assets/profile-icon.svg';
import info_icon from 'src/assets/info-icon.svg';
import shipment_icon from 'src/assets/shipment-icon.svg';
import checkmark from 'src/assets/checkmark.svg';

const CheckoutPage = () => {
  const contactInfo = useSelector((state: RootState) => state.contact);
  const shipmentInfo = useSelector((state: RootState) => state.shipment);
  const cart = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateToHome = () => {
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className='bg-bg-gray h-full pb-8'>
      <div className='flex flex-col w-2/3 mx-52 pt-8'>
        <div className='flex flex-col items-center gap-6'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-t to-bright-green from-white relative'>
            <img
              src={checkmark}
              alt='Checkmark'
              className='absolute top-7 left-6'
            />
          </div>
          <h2 className='text-3xl text-dark-blue'>Thank you for your order!</h2>
          <p className='text-base text-dark-blue'>
            The order confirmation email with details of your order and a link
            to track its progress has been sent to your email address.
          </p>
          <p className='text-base text-dark-blue font-bold'>
            Your order # is 000000003 - PENDING
          </p>
          <p className='text-base text-input-gray'>Order Date: 6 June 2024</p>
        </div>
        <div className='my-8'>
          <div className='flex flex-row justify-between gap-6'>
            <div className='w-2/4 shadow-xl rounded-md p-4 bg-white'>
              <div className='flex flex-row gap-2'>
                <img src={profile_icon} alt='Profile Icon' />
                <h6 className='text-dark-blue font-bold'>
                  Contact Information
                </h6>
              </div>
              <div>
                {contactInfo.firstName} {contactInfo.lastName}
              </div>
              <div>{contactInfo.email}</div>
              <div>{contactInfo.phone}</div>
            </div>
            <div className='w-2/4 shadow-md rounded-md p-4 bg-white'>
              <div className='flex flex-row gap-2'>
                <img src={shipment_icon} alt='Shipment Icon' />
                <h6 className='text-dark-blue font-bold'>
                  Shipment Information
                </h6>
              </div>
              <div>
                {shipmentInfo.address} {shipmentInfo.appartment}
              </div>
              <div>
                {`${shipmentInfo.city}, ${shipmentInfo.state}, ${shipmentInfo.zipcode}`}
              </div>
              <div>{shipmentInfo.country}</div>
            </div>
          </div>
        </div>
        <div>
          <div className='shadow-md rounded-md p-4 mb-6 bg-white'>
            <div className='flex flex-row gap-2'>
              <img src={info_icon} alt='Info Icon' />
              <h6 className='text-dark-blue font-bold'>Order summary</h6>
            </div>
            <ul>
              {cart.cartItems.map((el) => (
                <li key={el.id} className='border-b-2 flex flex-row gap-8'>
                  <img
                    src={el.image}
                    alt={el.title}
                    className='cart-item_img'
                  />
                  <div className='flex flex-col justify-around'>
                    <div className=''>{el.title}</div>
                    <div className=''>
                      <span className='font-bold text-base'>
                        ${el.price}, {el.quantity} product
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <div className='text-xl'>Subtotal: ${cart.total}</div>
              <div className='text-xl'>Shipping & Handling: $0.00</div>
              <div className='text-xl'>Tax: $0.00</div>
              <div className='text-xl font-bold'>
                Grand Total: ${cart.total}
              </div>
            </div>
          </div>
          <Button
            text='Continue shopping'
            onClick={handleNavigateToHome}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
