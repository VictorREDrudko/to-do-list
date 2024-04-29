import styled from "styled-components"

type ButtonPropsType = {
  title: string
}

export const Button = ({ title } : ButtonPropsType) => {
  return (
    <ButtonStyled>{title}</ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f9fcf9;
  color: #023f0e;
  min-width: 50px;
  font-family: 'Roboto';
  transition: all 0.5s;

  &:hover {
    background-color: #cffb88;
    color: green;
  }
`