import { TasksState} from "../App.tsx";



export type Actions= CreateTodolistsTasksAction

export const createTodolistsTasksAC=(todolistId: string) =>{
    return {type: 'create_tasks_for_todolist', payload: {todolistId}} as const
}


// export type changeTodolistTitleAction= ReturnType<typeof changeTodolistTitleAC>
// export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistsTasksAction = ReturnType<typeof createTodolistsTasksAC>
// export type changeTodolistFilterAction=ReturnType<typeof changeTodolistFilterAC>



const initialState: TasksState ={}
export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {


    switch (action.type) {
        case 'create_tasks_for_todolist': {
            return {...state, [action.payload.todolistId]:[]}
        }


        default:
            return state
    }
}


