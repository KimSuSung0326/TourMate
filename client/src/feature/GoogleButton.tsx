import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
interface Props {
  children: string;
  onClick: () => void;
}

const StyledBlueButton = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  border: 0.063rem solid gray;
  width: 18rem;
  height: 2.6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;

export const GoogleButton = ({ children, onClick }: Props) => {
  return (
    <>
      <StyledBlueButton onClick={onClick}>
        <FontAwesomeIcon icon={faGoogle} size="1x" />
        {children}
      </StyledBlueButton>
    </>
  );
};
