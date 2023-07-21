import store from "../store/store";
import types from "../types";

const {dispatch} = store;

export function increment(data){
    // return {
    //     type: types.INCREMENT,
    //     payload: data
    // }
    dispatch({
        type: types.INCREMENT,
        payload: data
    })
}