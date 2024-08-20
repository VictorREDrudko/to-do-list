import { addTaskAC, removeTaskAC, tasksReducer, chandeTaskTitleAC, changeTaskStatusAC } from "./task-reducer";
import { removeTodolistAC, addTodolistAC } from "./todolists-reducer"
import { TasksStateType } from "../App";

// Объявление переменных
let initialState: TasksStateType = {}


// beforEach
beforeEach(() => {
  initialState = {
    ["todolistID1"]: [
      {id: '1', title: 'HTML&CSS', isDone: true},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'ReactJS', isDone: false},
    ],
    ["todolistID2"]: [
      {id: '1', title: 'Rest API', isDone: true},
      {id: '2', title: 'GraphQL', isDone: false},
    ],
  }
})


// Test 1 add task
test('new task shoul be added', () => {
  const newState = tasksReducer(initialState, addTaskAC("todolistID1", 'JJ'));

  expect(newState['todolistID2'].length).toBe(2);
  expect(newState['todolistID1'].length).toBe(4);
  expect(newState['todolistID1'][0].id).toBeDefined();
  expect(newState['todolistID1'][0].title).toBe('JJ');
  expect(newState['todolistID1'][0].isDone).toBe(false);
})

test('task shoul be deleted', () => {
  const newState = tasksReducer(initialState, removeTaskAC('todolistID1', '2'));

  expect(newState["todolistID1"].length).toBe(2);
  expect(newState["todolistID2"].length).toBe(2);
  expect(newState["todolistID1"].every(t => t.id !== "2")).toBeTruthy();
})

test('Title should be changed', () => {
  const newState = tasksReducer(initialState, chandeTaskTitleAC('todolistID1', '2', 'New title'));

  expect(newState['todolistID1'][1].title).toBe('New title');
  expect(newState['todolistID2'][1].title).toBe('GraphQL');
  expect(newState['todolistID1'][0].title).toBe('HTML&CSS');
})

test('Status should be changed', () => {
  const newState = tasksReducer(initialState, changeTaskStatusAC('todolistID1', '1', false));

  expect(newState['todolistID1'][0].isDone).toBe(false);
  expect(newState['todolistID2'][0].isDone).toBe(true);
})


// Test на удаление (добавление) task при изменении Todolist
test('All Tasks of todolist should be delete when delete todolist', ()=> {
  const newState = tasksReducer(initialState, removeTodolistAC('todolistID2'));

  // получаем массив всех ключей в newstate
  const keys = Object.keys(newState);

    expect(keys.length).toBe(1);
    expect(newState["todolistId2"]).not.toBeDefined();
})

test('Tasks should be added when add todolist', ()=>{
  const newState = tasksReducer(initialState, addTodolistAC('todolistID3', 'RRR'));

  const keys = Object.keys(newState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(newState[newKey]).toEqual([]);
})



// test('new array should be added when new todolist is added', () => {
//     const action = addTodolistAC("new todolist");

//     const endState = tasksReducer(startState, action)


//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }

//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });


