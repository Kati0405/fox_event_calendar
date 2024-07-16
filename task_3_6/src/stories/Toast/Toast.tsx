import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';

export interface ToastProps {
  message: string;
  onClose: () => void;
}

const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: #323749;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 1rem;
  box-shadow: 0px 16px 50px 0px #0000003d;
  position: fixed;
  z-index: 1000;
  width: 15.125rem;
  height: 3.25rem;
`;

const Message = styled.div`
  font-size: 0.9375rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #323749;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <ToastContainer>
      <Message>{message}</Message>
      <CloseButton onClick={onClose}>
        <IoCloseOutline />
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast;
