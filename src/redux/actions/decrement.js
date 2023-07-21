import store from "../store/store";
import types from "../types";

const {dispatch} = store;

export function decrement(data){
    // return {
    //     type: types.DECREMENT,
    //     payload: data
    // }
    dispatch({
        type: types.DECREMENT,
        payload: data
    })
}