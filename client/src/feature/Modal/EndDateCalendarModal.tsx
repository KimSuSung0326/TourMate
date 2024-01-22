import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { BlueButton } from 'feature/BlueButton';
import { useDispatch } from 'react-redux';
import { close, open } from '../../redux/reducers/modalSlice';
const ModalWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 18rem;
  left: 7.5rem;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // z-index: 9999999;
  height: 100%; /* ModalContainer의 높이를 100%로 설정 */
`;

const ModalContent = styled.div`
  position: relative; /* 부모 요소로부터의 상대 위치 */
  background-color: var(--white);
  width: 25rem;
  height: 30rem;
  border-radius: 1rem;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .Modal-Text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-size: 1.2rem;
    padding: 2rem;
    font-weight: 600;
    flex-direction: column;
    overflow-y: auto;
  }
`;

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const StyledMargin = styled.div`
  margin-top: 10rem;
`;

export const EndDateCalendarModal = ({ children }: Props) => {
  return (
    <>
      <ModalWrap>
        <ModalContainer>
          <ModalContent>
            <div className="Modal-Text">{children}</div>
          </ModalContent>
          <StyledMargin />
        </ModalContainer>
      </ModalWrap>
    </>
  );
};
