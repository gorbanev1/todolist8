import {Task, TasksState} from "../App.tsx";


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


const initialState: TasksState ={}
export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {


    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }


        default:
            return state
    }
}


