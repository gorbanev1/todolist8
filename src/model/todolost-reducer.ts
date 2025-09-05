import {Todolist} from "../App.tsx";

type Actions={
    type: string
    payload: any
}

const initialState: Todolist[]=[]
export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[]=>{
    switch (action.type){
        case 'delete_todolist':{
            return state
        }
        default:
            return state
    }
}