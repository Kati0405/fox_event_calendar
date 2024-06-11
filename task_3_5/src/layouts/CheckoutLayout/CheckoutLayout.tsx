import { Outlet } from 'react-router-dom';

import Breadcrumbs from 'src/components/Breadcrumbs/Breadcrumbs';

const CheckoutLayout = () => {
  return (
    <div className='checkout-layout bg-bg-gray h-screen px-20 py-2'>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
};

export default CheckoutLayout;
