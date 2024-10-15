import { useNavigate } from 'react-router-dom';

import Button from '@components/ui/Button';
import { signInWithGoogle } from '@/firebase/firebaseConfig';
import logo from '@/assets/svg/logo.svg';
import { User } from '@/types/types';

import { FcGoogle } from 'react-icons/fc';

import './LoginPage.css';

interface LoginPageProps {
  setUser: (user: User | null) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      if (user) {
        setUser({
          name: user.displayName || 'Unknown User',
          email: user.email || 'Unknown Email',
          avatar: user.photoURL || 'No avatar',
        });
        navigate('/my-calendar');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='container'>
      <div className='login-container'>
        <img src={logo} alt='Logo' />
        <Button
          icon={<FcGoogle />}
          variant='secondary'
          onClick={handleGoogleLogin}
          className='login-btn'
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
