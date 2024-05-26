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
  padding: 10px 5px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #2f025a;
  color: #fcfcfc;
  margin-right: 10px;
  font-family: 'Roboto';
  transition: all 0.5s;
  width: 80px;
  border: none;

  &:hover {
    background-color: #2ea3f7;
  }
`