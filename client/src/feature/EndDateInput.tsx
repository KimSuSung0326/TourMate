import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const InputWrapper = styled.div`
  display: flex;
  //align-items: center;
  width: 7rem;
  height: 2rem;
  //font-size: 16px;
  /* padding: 6px 8px 6px 15px; */
  border: 1px solid black;
  border-radius: 8px;
  //overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: inherit;
  background: transparent;
  padding: 0 0 0 1rem;
`;

const StyledInputContainer = styled.div`
  position: relative;
  left: -108%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export interface Props {
  defaultValue?: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

const EndDateInput = React.forwardRef<HTMLInputElement, Props>(
  ({ defaultValue, onClick }, ref) => {
    return (
      <InputWrapper ref={ref}>
        <Input defaultValue={defaultValue} onClick={onClick}></Input>

        <StyledInputContainer onClick={onClick}>
          <FontAwesomeIcon icon={faCalendar} />
        </StyledInputContainer>
      </InputWrapper>
    );
  },
);

export default EndDateInput;
