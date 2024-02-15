import { styled } from 'styled-components';
import { NewFile } from 'component/UploadFile/NewFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
interface ModalProps {
  onClose: () => void;
}

export const ReviewModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <ModalBackground>
      <ModalWrapper>
        <div className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faX} color="red"></FontAwesomeIcon>
        </div>
        <Content>
          <NewFile onClose={onClose}></NewFile>
        </Content>
        <ButtonWrapper></ButtonWrapper>
      </ModalWrapper>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
const ModalWrapper = styled.div`
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 0.2rem solid var(--blue-100);
  width: 60rem;
  height: 40rem;
  .close {
    &:hover {
      cursor: pointer;
    }
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 70%;

  button {
    cursor: pointer;
    margin: 0 0.25rem;
    padding: 0.5rem;
    width: 5rem;
    border: none;
    border-radius: 0.5rem;
  }

  .confirm {
    background-color: var(--blue-100);
    border: 0.1rem solid var(--gray-100);
    color: var(--white);
  }
`;
