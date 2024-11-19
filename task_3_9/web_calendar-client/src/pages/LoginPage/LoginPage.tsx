import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import Button, { ButtonState } from 'src/components/ui/Button';
import logo from 'src/assets/svg/logo.svg';
import { User } from 'src/types/types';
import authService from 'src/services/auth.service';

export interface LoginPageProps {
  setUser: (user: User | null) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async (token: string) => {
      setLoading(true);
      try {
        const response = await authService.getUserProfile(token);
        const user = response.data;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/my-calendar');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setErrorMessage(
          'Failed to retrieve user information. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('jwtToken', token);
      fetchUserData(token);
    }
  }, [setUser, navigate]);

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = 'http://localhost:3000/auth/google/login';
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center gap-10 justify-center w-2/5 h-72 bg-white border border-gray-300 shadow-md rounded-md'>
        <img src={logo} alt='Logo' className='h-16' />

        {loading ? (
          <div className='w-72 h-9 flex items-center justify-center'>
            <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-green-600'></div>
          </div>
        ) : (
          <Button
            icon={<FcGoogle />}
            variant={ButtonState.Secondary}
            onClick={handleGoogleLogin}
            className='w-72 h-9'
          >
            Continue with Google
          </Button>
        )}

        {errorMessage && (
          <div aria-live='polite' className='text-red-500 text-sm mt-4'>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
