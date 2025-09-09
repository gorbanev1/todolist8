import {v1} from 'uuid'
import {expect, test} from 'vitest'
import type {Todolist} from '../App.tsx'
import {deleteTodolistAC, createTodolistAC, DeleteTodolistAction, todolistsReducer} from "./todolost-reducer.ts";

test ("correct todolist should be deleted", ()=>{
    const todolistId1=v1()
    const todolistId2=v1()

    const startState: Todolist[]=[
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'}
    ]

    const action:DeleteTodolistAction = {
        type: 'delete_todolist',
        payload: {
            id: todolistId1,
        },
    }as const
    const endState=todolistsReducer(startState, deleteTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test ("correct todolist should be created", ()=>{
    const todolistId1=v1()
    const todolistId2=v1()

    const startState: Todolist[]=[
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'}
    ]
    const title = 'New todolist'
    const endState=todolistsReducer(startState, createTodolistAC(title))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})