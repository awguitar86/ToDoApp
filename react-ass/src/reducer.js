import axios from 'axios'

const initialState = {
    todos : [],
    todo: {}
}

const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const COMPLETE_TASK = "COMPLETE_TASK";
const DELETE_TASK = "DELETE_TASK";
const SET_TODO = "SET_TODO"

export function getTasks(){
    const request = axios.get('https://practiceapi.devmountain.com/api/tasks')
    .then(response => {
        return response.data
    })
    return {
        type: GET_TASKS,
        payload: request
    }
};

export function addTask(str){
    const request = axios.post('https://practiceapi.devmountain.com/api/tasks', {"title": `${str}`})
    .then( response => {
        return response.data
    })
    return {
        type: ADD_TASK,
        payload: request
    }
}

export function editTask(id, title, des){
    const request = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`,{
        "title": `${title}`,
        "description": `${des}`,
    })
    .then( response => {
        return response.data
    })
    return {
        type: EDIT_TASK,
        payload: request
    }
}

export function completeTask(id){
    const request = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then(response => {
        return response.data
    })
    return {
        type: COMPLETE_TASK,
        payload: request
    }
}

export function deleteTask(id){
    const request = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
    .then(response => {
        return response.data
    })
    return {
        type: DELETE_TASK,
        payload: request
    }

}

export function setTodo(obj){
    return {
        type: SET_TODO,
        payload: obj
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_TASKS + "_FULFILLED":
            return Object.assign({}, state, {todos: action.payload})
        case DELETE_TASK + "_FULFILLED":
            return Object.assign({}, state, {todos: action.payload})
        case ADD_TASK + "_FULFILLED":
            return Object.assign({}, state, {todos: action.payload})
        case COMPLETE_TASK + "_FULFILLED":
            return Object.assign({}, state, {todos: action.payload})
        case EDIT_TASK + "_FULFILLED":
            return Object.assign({}, state, {todos: action.payload})
        case SET_TODO + "_FULFILLED":
            return Object.assign({}, state, {todo: action.payload})
        default:
            return state;
    }
}

