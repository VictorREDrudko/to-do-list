import styled from "styled-components"

// *******************ТИПИЗАЦИЯ****************************
type ButtonType = {
  titleBtn: string
  callbackBtn: ()=>void
}


export const Button = ({titleBtn, callbackBtn}: ButtonType) => {
  const onClickBtnHandler = () => {
    callbackBtn();
  }

  return (
    <ButtonStyled onClick={onClickBtnHandler}>{titleBtn}</ButtonStyled>
  )
}


// ***********************СТИЛИ***************************
const ButtonStyled = styled.button`
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #d67efc;
  color: #2c2c2c;
  min-width: 40px;
  margin-right: 10px;
  font-family: 'Roboto';
  transition: all 0.5s;

  &:hover {
    background-color: #ebbdff;
  }
`