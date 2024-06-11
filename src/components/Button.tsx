import styled from "styled-components"
import s from "./Todolist.module.css"
import { filteringOption } from "./Todolist"

// *******************ТИПИЗАЦИЯ****************************
type ButtonType = {
  titleBtn: string
  callbackBtn: ()=>void
  filter?: filteringOption
}


export const Button = ({titleBtn, callbackBtn, filter}: ButtonType) => {
  const onClickBtnHandler = () => {
    callbackBtn();
  }

  return (
    <ButtonStyled onClick={onClickBtnHandler} className={filter === titleBtn ? s.activeFilter : s.buttonFilter}>{titleBtn}</ButtonStyled>
  )
}


// ***********************СТИЛИ***************************
const ButtonStyled = styled.button`
  padding: 10px 5px;
  border-radius: 5px;
  cursor: pointer;
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