import { ChangeEvent, useState } from "react"

type EditableSpanType = {
  oldTitle: string
  isDone: boolean
  completed: string
  updateItem: (newTitle:string)=>void
}

// Компанента для смены названий (change title)
export const EditableSpan = ({oldTitle, isDone, completed, updateItem}: EditableSpanType) => {
  // State управляет отображением (либо span, либо input)
  const [editMode, setEditMode] = useState<boolean>(false)
  // State принимает старый title и ...
  const [newTitle, setNewTitle] = useState<string>(oldTitle)

  const changeTitleHandler = () => {
    setEditMode(!editMode);
    // проверка на отправку если span то НЕ отправлять, если input - отправить
    if(editMode) {
      updateItemHandler()
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  const updateItemHandler = () => {
    updateItem(newTitle)
  }

  console.log(oldTitle)
  console.log(newTitle)

  return (
    editMode   ? 
                  <input type={"text"} value={newTitle} onBlur={changeTitleHandler} autoFocus onChange={onChangeHandler}/>
                :
                  <span onDoubleClick={changeTitleHandler} className={isDone ? completed : ''}>{newTitle}</span>
  )
}