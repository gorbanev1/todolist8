import {FilterValues, Todolist} from "../App.tsx";
import {v1} from 'uuid'



export const deleteTodolistAC=(id: string) =>{
    return {type: 'delete_todolist', payload: {id}}as const
}
export const createTodolistAC=(title: string) =>{
    return {type: 'create_todolist', payload: {id:v1(), title}}as const
}

export const changeTodolistTitleAC=({id, title}:{id:string, title: string})=>{
    return {type: 'change_todolist_title', payload: {id, title}}as const

}
export const changeTodolistFilterAC= ({id, filter}:{id: string, filter: FilterValues})=>{
    return {
        type: 'change_todolist_filter',
        payload:{
            id,
            filter
        }
    } as const
}

export type changeTodolistTitleAction= ReturnType<typeof changeTodolistTitleAC>
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type changeTodolistFilterAction=ReturnType<changeTodolistFilterAction>


const initialState: Todolist[]=[]
export const todolistsReducer = (state: Todolist[] = initialState, action): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todolist_title':{
            debugger
            return [...state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title}  : t)]
        }
        case 'change_todolist_filter':{
            return [...state.map(t=>t.id===action.payload.id?{...t, filter: action.payload.filter}:t)]
        }
        default:
            return state
    }
}


