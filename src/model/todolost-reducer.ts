import {FilterValues, Todolist} from "../App.tsx";


export type Actions= changeTodolistFilterAction| DeleteTodolistAction|CreateTodolistAction| changeTodolistTitleAction

export const deleteTodolistAC=(id: string) =>{
    return {type: 'delete_todolist', payload: {id}}as const
}
export const createTodolistAC=({title , id}: { title: string, id: string }) =>{
    return {type: 'create_todolist', payload: {id, title}}as const
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
export type changeTodolistFilterAction=ReturnType<typeof changeTodolistFilterAC>


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
        case 'change_todolist_title':{
            const {id, title}=action.payload
            return [...state.map(t => t.id === id ? {...t, title}  : t)]
        }
        case 'change_todolist_filter':{
            const {id, filter}=action.payload
            return [...state.map(t=>t.id===id?{...t, filter}:t)]
        }
        default:
            return state
    }
}


