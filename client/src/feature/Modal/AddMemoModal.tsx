import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { BlueButton } from 'feature/BlueButton';
import { useDispatch } from 'react-redux';
import { close5, open5 } from '../../redux/reducers/memoSlice';
const ModalWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
`;

const ModalBackDrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
  height: 100%; /* ModalContainer의 높이를 100%로 설정 */
`;

const ModalContent = styled.div`
  position: relative; /* 부모 요소로부터의 상대 위치 */
  background-color: var(--white);
  width: 35rem;
  height: 40rem;
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
  .memo-explain {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const StyledMargin = styled.div`
  margin-top: 1rem;
`;
const StyledMargin2 = styled.div`
  margin-top: 3rem;
`;
const StyledButton = styled.button<{ transparent?: boolean }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 5rem;
  height: 5rem;
  background-color: transparent;
  border: none;
`;
export const AddMemoModal = ({ children, onClick }: Props) => {
  const dispatch = useDispatch();
  const handleOut = () => {
    alert('추가 완료.');
    dispatch(close5());
  };
  return (
    <>
      <ModalWrap>
        <ModalBackDrop>
          <ModalContainer>
            <ModalContent>
              <StyledButton onClick={onClick}>
                <FontAwesomeIcon
                  icon={faX}
                  size="2xl"
                  style={{ color: '#ff0000' }}
                />
              </StyledButton>{' '}
              <StyledMargin2></StyledMargin2>
              <div className="memo-explain"> 메모 일정을 추가 해주세요!</div>
              <div className="Modal-Text">{children}</div>
              <StyledMargin></StyledMargin>
              <BlueButton onClick={handleOut}>메모 추가하기</BlueButton>
            </ModalContent>
            <StyledMargin />
          </ModalContainer>
        </ModalBackDrop>
      </ModalWrap>
    </>
  );
};
