import { useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { Input } from "../Input";

type AddItemFormType = {
  addItem: (titleInput: string)=>void
}

export const AddItemForm = ({addItem}: AddItemFormType) => {
  // ЛОКАЛЬНЫЙ State универсальной компаненты
  const [textInput, setTextInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

    // Функция отправки данных из локального в глобальный state
    const addItemHandler = () => {
      textInput.trim() ? addItem(textInput) : setError("Введите название задачи!");
      setTextInput('');
    }

  return(
    <InputWrapperStyle>
      <Input textInput={textInput} setTextInput={setTextInput} addTaskHandler={addItemHandler}/>
      <Button titleBtn={"+"} callbackBtn={addItemHandler}/>
      <ErrorStyle>{error}</ErrorStyle>
    </InputWrapperStyle>
  )
}

// **************** Стили *******************
const InputWrapperStyle = styled.div`
  margin-bottom: 40px;

  & button {
    padding: 5px;
    background-color: #0c5a02;
    width: 40px;
    font-size: 18px;
    font-weight: 600;

    &:hover {
      background-color: #329b01;
    }
  }
`

const ErrorStyle = styled.div`
  color: red;
`