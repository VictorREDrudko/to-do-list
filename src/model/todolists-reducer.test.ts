import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

// *************Объявление переменных*************
let todolistId1: string;
let todolistId2: string;
let todolistId3: string;

let initialState: Array<TodolistType> = [];


// *************Составление beforeEach*************
beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  todolistId3 = v1();

  initialState = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
  ]
})


// *************Тесты*************
// Test 1 add todolist
test('new todolist should be add', () => {
  const title: string = 'This is a new Todolist'
  const newState = todolistsReducer(initialState, addTodolistAC(todolistId3, title));

  // Проверим длину нового массива, чему равны id и title добавленного Todo
  expect(newState.length).toBe(3);
  expect(newState[0].id).toBeDefined();
  expect(newState[0].title).toBe(title);
})

// Test 2 remove todolist
test('todolist should be remove', () => {
  const newState = todolistsReducer(initialState, removeTodolistAC(todolistId1))

  // Проверим длину нового массива и чему равна его id
  expect(newState.length).toBe(1);
  expect(newState[0].id).toBe(todolistId2)
})

// Test 3 change title todolist
test('Title todolist should be change', () => {
  const newTitle = 'This is a new title';
  const newState = todolistsReducer(initialState, changeTodolistTitleAC(todolistId2, newTitle));

  // Проверим чему равны title 
  expect(newState[1].title).toBe(newTitle);
  expect(newState[0].title).toBe('What to learn');
})

// Test 4 change filter todolist
test('filter should de change', () => {
  const newFilter: FilterValuesType = 'completed';
  const newState = todolistsReducer(initialState, changeTodolistFilterAC(todolistId2, newFilter));

  expect(newState[0].filter).toBe('all');
  expect(newState[1].filter).toBe(newFilter);
})

