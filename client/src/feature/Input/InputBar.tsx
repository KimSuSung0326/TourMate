import styled from 'styled-components';

interface StyledInputProp {
  error?: boolean;
  type: string;
  value: string;
  placeholder?: string; //optional 하게 설정
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInputBar = styled.input<StyledInputProp>`
  border: 0.125rem solid var(--gray-100);
  border-radius: 0.5rem;
  background-color: var(--white);
  width: 18rem;
  height: 2.6rem;
  margin-top: 0.5rem;
  ${({ error }) =>
    error &&
    `
      border-color: red;
    box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.15);
 `}
`;
export const InputBar = ({
  error,
  type,
  value,
  placeholder,
  onChange,
}: StyledInputProp) => {
  return (
    <>
      <StyledInputBar
        error={error}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      ></StyledInputBar>
    </>
  );
};
