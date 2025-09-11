import {v1} from 'uuid'
import {beforeEach, expect, test} from 'vitest'
import type {Todolist} from '../App.tsx'
import {
    deleteTodolistAC,
    createTodolistAC,
    changeTodolistTitleAC,
    todolistsReducer,
    changeTodolistFilterAC
} from "./todolost-reducer.ts";

let todolistId1:string, todolistId2:string, startState:Todolist[]=[]

beforeEach(()=>{
    todolistId1=v1()
    todolistId2=v1()

    startState=[
        {id: todolistId1, title: 'what to learn', filter: 'all'},
        {id: todolistId2, title: 'what to buy', filter: 'all'}
    ]
})

test ("correct todolist should be deleted", ()=>{



    const endState=todolistsReducer(startState, deleteTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test ("correct todolist should be created", ()=>{

    const title = 'New todolist'
    const endState=todolistsReducer(startState, createTodolistAC(title))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test("changing todolist's title should be correct",    () => {
        const newTitle = "new title"

        const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId1, title: newTitle}))
        expect(endState[0].title).toBe(newTitle)
        expect(endState[1].title).toBe("what to buy")
    })
test("todolist's filter changing should be correct", ()=>{
    const newFilter="completed"
    const endstate= todolistsReducer(startState, changeTodolistFilterAC({id: todolistId1, filter: newFilter}))
    expect(endstate[0].filter).toBe("completed")
})