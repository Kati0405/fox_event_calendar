import { useEffect, useState, useContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';

import logo from '@/assets/svg/logo.svg';
import Button from '@components/ui/Button';
import Dropdown from '@components/ui/Dropdown';
import { User } from '@/types/types';
import { Context } from '@/context/context';
import { getWeek } from '@/utils/utils';

import './Header.css';

export interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const {
    setCurrentMonth,
    currentWeek,
    setCurrentWeek,
    setCurrentDay,
    currentDay,
  } = useContext(Context)!;
  const { selectedView, setSelectedView } = useContext(Context)!;
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName || 'Unknown User',
          email: user.email || 'Unknown Email',
          avatar: user.photoURL || '',
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const name = user?.name;
  const avatar = user?.avatar;

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  useEffect(() => {
    setCurrentWeek(getWeek(dayjs()));
  }, [setCurrentWeek]);

  const handlePrevDay = () => {
    const previousDay = dayjs(currentDay.date).subtract(1, 'day');
    setCurrentDay({ date: previousDay.toDate() });
  };

  const handleNextDay = () => {
    const nextDay = dayjs(currentDay.date).add(1, 'day');
    setCurrentDay({ date: nextDay.toDate() });
  };

  const handlePrevWeek = () => {
    const newWeekStart = dayjs(currentWeek[0].date);
    const prevWeek = getWeek(newWeekStart.subtract(1, 'week'));
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    const newWeekStart = dayjs(currentWeek[0].date);
    const nextWeek = getWeek(newWeekStart.add(1, 'week'));
    setCurrentWeek(nextWeek);
  };

  const handleReset = () => {
    const today = dayjs();
    setCurrentDay({ date: today.toDate() });
    setCurrentMonth(today.month());
    const startOfWeek = today.startOf('week');
    setCurrentWeek(getWeek(startOfWeek));
  };

  return (
    <header className='header flex flex-row w-full'>
      <div className='header-left flex'>
        <div className='header-logo'>
          <img src={logo} alt='Logo' />
        </div>
        <Button variant='primary' className='primary-btn' onClick={handleReset}>
          Today
        </Button>
        <div className='nav-btns'>
          <Button
            variant='secondary'
            icon={<FaChevronLeft />}
            className='nav-btn'
            onClick={selectedView == 'Week' ? handlePrevWeek : handlePrevDay}
          ></Button>
          <Button
            variant='secondary'
            icon={<FaChevronRight />}
            className='nav-btn'
            onClick={selectedView == 'Week' ? handleNextWeek : handleNextDay}
          ></Button>
        </div>
        <h2 className='font-bold'>
          {selectedView === 'Week'
            ? dayjs(currentWeek[0].date).format('MMMM YYYY')
            : dayjs(currentDay.date).format('DD MMMM YYYY')}
        </h2>
      </div>
      <div className='header-right flex'>
        <Dropdown
          options={['Day', 'Week']}
          value={selectedView}
          onChange={(value) => setSelectedView(value)}
          className='dropdown'
        ></Dropdown>
        <div className='user-info'>
          <h2 className='user-name'>{name ? `${name}` : 'User'}</h2>
          <div className='user-avatar' onClick={toggleLogout}>
            {avatar ? (
              <img src={avatar} alt='Ava' className='avatar-img' />
            ) : (
              <div className='placeholder-avatar'>U</div>
            )}
          </div>
          {showLogout && (
            <Button
              variant='secondary'
              onClick={handleLogout}
              icon={<HiLogout />}
              className='logout-btn'
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
