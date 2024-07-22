import React from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';

export interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid #dedfe5;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-family: var(--font-family-secondary);
  font-size: 1.5rem;
  font-weight: bold;
  color: #323749;
  padding-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #323749;
  font-size: 1rem;
  cursor: pointer;
`;

const ModalContent = styled.div`
  font-size: 1rem;
  font-family: var(--font-family-secondary);
  color: #323749;
`;

const Modal: React.FC<ModalProps> = ({ title, content, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <IoCloseOutline />
          </CloseButton>
        </ModalHeader>
        <ModalContent>{content}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
