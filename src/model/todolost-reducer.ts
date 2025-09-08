import {Todolist} from "../App.tsx";

type Actions={
    type: 'delete_todolist'
    payload: {
        id: string
    }
}

export const deleteTodolistAC=(id: string): DeleteTodolistAction =>{
    return {type: 'delete_todolist', payload: {id}}as const
}

const initialState: Todolist[]=[]
export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        default:
            return state
    }
}