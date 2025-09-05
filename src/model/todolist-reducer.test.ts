import {v1} from 'uuid'
import {expect, test} from 'vitest'
import type {Todolist} from '../App.tsx'
import {todolistReducer} from "./todolost-reducer.ts";

test ("correct todolist should be deleted", ()=>{
    const todolistId1=v1()
    const todolistId2=v1()

    const startState: Todolist[]=[
        {todolistId1, title: 'what to learn', filter: 'all'},
        {todolistId2, title: 'what to buy', filter: 'all'}
    ]

    const action ={
        type: 'delete_todolist',
        payload: {
            id: todolistId1,
        }
    }
    const endState=todolistReducer(startState, action)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})