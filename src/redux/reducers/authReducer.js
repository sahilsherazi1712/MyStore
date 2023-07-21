import types from "../types";

let init_state = {
    userData: null
}

export function authReducer(state = init_state, action){
    switch (action.type) {
        case types.LOGIN: {
            let data = action.payload
            return {...state, userData: data}
        }
        case types.SIGNUP: {
            let data = action.payload
            return {...state, userData: data}
        }
        default:
            return {...state}
    }
}