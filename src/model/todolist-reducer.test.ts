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

let todolistId1: string, todolistId2: string, startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test("correct tasks for todolist should be deleted", () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))
    expect(endState[1]).toBe(undefined)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
    const title = 'New todolist'
    const id = v1()
    const endState = todolistsReducer(startState, createTodolistAC({title, id}))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test("changing todolist's title should be correct", () => {
    const newTitle = "new title"
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId1, title: newTitle}))
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe("What to buy")
})
test("todolist's filter changing should be correct", () => {
    const newFilter = "completed"
    const endstate = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId1, filter: newFilter}))
    expect(endstate[0].filter).toBe("completed")
})