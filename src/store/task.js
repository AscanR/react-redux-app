import {createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import {setError} from "./errors";

const initialState = {entities: [], isLoading: true}

// const update = createAction("task/updated")
// const remove = createAction("task/removed")

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        received(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(
                  el => el.id === action.payload.id
            )
            state.entities[elementIndex] = {...state.entities[elementIndex], ...action.payload}
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                  (el) => el.id !== action.payload.id
            )
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state, action) {
            state.isLoading = false
        }
    }
})

const {actions, reducer: taskReducer} = taskSlice
const {update, remove, received, taskRequestFailed, taskRequested} = actions

// const taskRequested = createAction('task/requested')
// const taskRequestFailed = createAction('task/requestedFailed')

export const loadTasks = () => async (dispatch) => {
    try {
        dispatch(taskRequested())
        const data = await todosService.fetch()
        dispatch(received(data))
    } catch (e) {
        dispatch(taskRequestFailed())
        dispatch(setError(e.message))
    }
}

export const createTask = () => async (dispatch) => {
    try {
        dispatch(taskRequested())
        const data = await todosService.post()
        return data
    } catch (e) {
        dispatch(taskRequestFailed())
        dispatch(setError(e.message))
    } finally {
        dispatch(taskRequestFailed())
    }
}

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({id, completed: true}))
}

export function titleChanged(id) {
    return update({id, title: `New title for ${id}`})
}

export function taskDeleted(id) {
    return remove({id})
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading


export default taskReducer


// const taskReducer = createReducer(initialState, builder => {
//     builder
//           .addCase(update, (state, action) => {
//               const elementIndex = state.findIndex(el => el.id === action.payload.id)
//               state[elementIndex] = {...state[elementIndex], ...action.payload}
//           })
//           .addCase(remove, (state, action) => {
//               return state.filter(el => el.id !== action.payload.id)
//           })
// })