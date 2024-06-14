import { Outlet } from 'react-router-dom';

import Header from 'src/components/Header/Header';

const RootLayout = () => {
  return (
    <div className='root-layout'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default RootLayout;
