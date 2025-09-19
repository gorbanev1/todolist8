import {TasksState} from "../App.tsx";
import {v1} from "uuid";


export type Actions = CreateTodolistsTasksAction|DeleteTodolistsTasksAction|CreateTasksAction|DeleteTaskAction|ChangeTaskStatusAction

export const createTodolistsTasksAC = (todolistId: string) => {
    return {type: 'create_tasks_for_todolist', payload: {todolistId}} as const
}
export const deleteTodolistsTasksAC = (todolistId: string) => {
    return {type: 'delete_tasks_for_todolist', payload: {todolistId}} as const
}
export const createTasksAC = ({todolistId, taskTitle}:{todolistId: string, taskTitle: string}) => {

    return {type: 'create_task', payload: {todolistId, taskTitle}} as const
}
export const deleteTaskAC=({todolistId, taskId}: {todolistId:string, taskId:string})=>{
    return {type: "delete_task", payload: {todolistId, taskId }} as const
}
export const changeTaskStatusAC=({todolistId, taskId}:{todolistId:string, taskId:string})=>{
    return {type: 'change_task_status', payload:{todolistId, taskId}}
}

export type DeleteTodolistsTasksAction = ReturnType<typeof deleteTodolistsTasksAC>
export type CreateTodolistsTasksAction = ReturnType<typeof createTodolistsTasksAC>
export type CreateTasksAction= ReturnType<typeof createTasksAC>
export type DeleteTaskAction=ReturnType<typeof deleteTaskAC>
export type ChangeTaskStatusAction=ReturnType<typeof changeTaskStatusAC >


const initialState: TasksState = {}
export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_tasks_for_todolist': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'delete_tasks_for_todolist': {
            const newState={...state}
            debugger
            delete newState[action.payload.todolistId]
            return  newState
        }
        case 'create_task':{
            const newTask = {id: v1(), title: action.payload.taskTitle, isDone: false}
            const todolistId=action.payload.todolistId
            const newState = {...state, [todolistId]: [newTask, ...state[todolistId]]}
            return newState
        }
        case  'delete_task': {
            const {todolistId, taskId}= action.payload
            return {...state, [todolistId]:state[todolistId].filter(t=>t.id!==taskId)}
        }
        case  'change_task_status':{
            const{todolistId, taskId}=action.payload
            return {...state, [todolistId]: state[todolistId].map(t=>t.id===taskId?{...t, isDone: !t.isDone}:t) }
        }
        default:
            return state
    }
}


