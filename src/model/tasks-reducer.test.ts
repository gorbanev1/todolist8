import {v1} from 'uuid'
import {beforeEach, expect, test} from 'vitest'
import type {TasksState} from '../App.tsx'

import {
    changeTaskStatusAC,
    createTodolistsTasksAC,
    deleteTaskAC,
    deleteTodolistsTasksAC,
    tasksReducer
} from "./tasks-reducer.ts";

let startState: TasksState = {}
let todolistId1 : string
let todolistId2: string

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test("array should be created for new todolist", () => {
    const id = v1()
    const endState = tasksReducer(startState, createTodolistsTasksAC(id))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})
test("tasks for todolist  should be deleted correctly", () => {
    const endState = tasksReducer(startState, deleteTodolistsTasksAC('todolistId1'))
    const keys=Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId1']).not.toBeDefined()
    expect(endState['todolistId1']).toBeUndefined()
   expect(endState.todolistId2[0].title).toBe("bread")
       //expect(endState.todolistId1[0].title).toBe(undefined)
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistsTasksAC('todolistId2'))
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('task should be deleted correctly', ()=>{
    const tid="2"

  const endState=tasksReducer(startState, deleteTaskAC({todolistId:"todolistId1",taskId: tid}))
   // expect(endState['todolistId1'][1]).toBeUndefined()
    expect(endState['todolistId1'][1].title).toBe('React')
})

test ('task status should be changed correctly',()=>{
    const taskId="1"
    const isDone=startState['todolistId1'].find(t=>t.id===taskId)?.isDone
    const endState=tasksReducer(startState, changeTaskStatusAC({todolistId: 'todolistId1', taskId: "1"}))
    expect(endState['todolistId1'].find(t=>t.id==='1')?.isDone).toBe(!isDone)
    expect(endState['todolistId1'].find(t=> t.id===taskId)?.isDone).toBe(true)

})