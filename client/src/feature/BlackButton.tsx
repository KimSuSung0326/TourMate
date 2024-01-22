import styled from 'styled-components';
interface Props {
  children: string;
  onClick: () => void;
}

const StyledBlackButton = styled.div`
  background-color: var(--white);
  border-radius: 0.5rem;
  color: var(--black);
  width: 10rem;
  height: 2.59rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.3rem;
  position: relative;
  left: 50%;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  &.focused {
    font-weight: bold;
  }
`;

export const BlackButton = ({ children, onClick }: Props) => {
  return (
    <>
      <StyledBlackButton onClick={onClick}>{children}</StyledBlackButton>
    </>
  );
};
