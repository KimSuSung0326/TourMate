import styled from 'styled-components';
interface Props {
  children: string;
  onClick: () => void;
}

const StyledBlueButton = styled.div`
  background-color: rgba(134, 190, 255, 1);
  border-radius: 0.5rem;
  color: white;
  width: 10rem;
  height: 2.59rem;
  margin: 2rem 0 0.5rem 0;
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

export const SmallButton = ({ children, onClick }: Props) => {
  return (
    <>
      <StyledBlueButton onClick={onClick}>{children}</StyledBlueButton>
    </>
  );
};
