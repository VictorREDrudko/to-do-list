// import { ChangeEvent, useState } from "react"
// import styled from "styled-components"

// type InputType = {
//   textInput: string
//   setTextInput: (textInput: string)=>void
// }

// export const Input = ({textInput, setTextInput}: InputType) => {

//   // Вывод текста input
//   const onChangeInputHadler = (event: ChangeEvent<HTMLInputElement>) => {
//     setTextInput(event.currentTarget.value);
//   }

//   return (
//     <InputStyle value={textInput} onChange={onChangeInputHadler} placeholder="Add item"/>
//   )
// }


// const InputStyle = styled.input`
//   height: 30px;
//   width: 200px;
//   border-radius: 10px;
//   margin-right: 10px;
//   padding: 0 10px;
//   font-size: 16px;
// `