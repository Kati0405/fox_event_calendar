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

  const handleGoogleLogin = async () => {
    try {
      const response = await authService.signInWithGoogle();
      if (response.ok && response.data) {
        setUser(response.data);
        navigate('/my-calendar');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col items-center gap-10 justify-center w-2/5 h-72 bg-white border border-gray-300 shadow-md rounded-md'>
        <img src={logo} alt='Logo' className='h-16' />
        <Button
          icon={<FcGoogle />}
          variant={ButtonState.Secondary}
          onClick={handleGoogleLogin}
          className='w-72 h-9'
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
