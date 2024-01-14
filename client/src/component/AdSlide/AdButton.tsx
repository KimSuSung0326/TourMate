import { Children, useState } from 'react';
import styled from 'styled-components';
interface Props {
  isLeft: boolean;
  onClick: () => void;
  children: string | React.ReactElement;
}
const StyledArrow = styled.div<Props>`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  color: white;
  cursor: pointer;
  ${(props) => (props.isLeft ? 'left: 5px' : 'right: 5px')};
`;
export const AdButton = ({ children, onClick }: Props) => {
  return (
    <>
      <StyledArrow isLeft={true} onClick={onClick}>
        {children}
      </StyledArrow>
    </>
  );
};
