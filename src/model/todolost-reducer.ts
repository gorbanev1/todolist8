import {Todolist} from "../App.tsx";
import {v1} from 'uuid'

/*export type DeleteTodolistAction={
    type: 'delete_todolist'
    payload: {
        id: string,
        title?: string
    }
}*/

export const deleteTodolistAC=(id: string): DeleteTodolistAction =>{
    return {type: 'delete_todolist', payload: {id}}as const
}
export const createTodolistAC=(title: string): CreateTodolistAction =>{
    return {type: 'create_todolist', payload: {id:v1(), title}}as const
}
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>


const initialState: Todolist[]=[]
export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        default:
            return state
    }
}