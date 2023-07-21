import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import types from '../redux/types';
import store from '../redux/store/store';

const { dispatch, getState } = store;

export async function getHeaders() {
    let userData = await AsyncStorage.getItem('userData');
    if (userData) {
        userData = JSON.parse(userData);
        //console.log(userData.accessToken, 'header')
        return {
            authorization: `${userData.access_token}`,
        };
    }
    return {};
}

export async function apiReq(endPoint, data, method, headers, requestOptions = {}) {

    return new Promise(async (res, rej) => {
        const getTokenHeader = await getHeaders();
        headers = {
            ...getTokenHeader,
            ...headers
        };

        if (method === 'get' || method === 'delete') {
            data = {
                ...requestOptions,
                ...data,
                headers
            };
        }

        axios[method](endPoint, data, { headers })
            .then(result => {
                const { data } = result;

                if (data.status === false) {
                    return rej(data);
                }

                return res(data);
            })
            .catch(error => {
                console.log(error)
                console.log(error && error.response, 'the error respne')
                if (error && error.response && error.response.status === 401) {
                    clearUserData();
                    // NavigationService.resetNavigation();
                    // NavigationService.navigate('loginUsingEmailScreen');
                    dispatch({
                        type: types.CLEAR_REDUX_STATE,
                        payload: {}
                    });
                    dispatch({
                        type: types.NO_INTERNET,
                        payload: { internetConnection: true },
                    });
                }
                if (error && error.response && error.response.data) {
                    if (!error.response.data.message) {
                        return rej({ ...error.response.data, msg: error.response.data.message || "Network Error" })
                    }
                    return rej(error.response.data)
                } else {
                    return rej({ message: "Network Error", msg: "Network Error" });
                }
            });
    });
}

export function apiPost(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'put', headers);
}

export function setItem(key, data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then(data => {
            resolve(JSON.parse(data));
        });
    });
}

export async function clearUserData() {
    return AsyncStorage.removeItem('userData');
}

/*

Redux: It is a state management library used in javascript apps. 
It simply manage the state of your application or in other words its it is used to manage the data of your application.

Major Step in Redux: 1) actions     2) reducers     3) store

1) Actions: Actions are a plain javascript object that contains information. 
Actions have a type field that tells what kind of action to perform and all other fields contain information or data.

import types from "../types";
export function increment(data){
    return {
        type: types.INCREMENT,
        payload: data
    }
}
export function decrement(data){
    return {
        type: types.DECREMENT,
        payload: data
    }
}

2) Reducers: Reducers are pure functions that contain the logic dictating how the application state changes.
When an action is dispatched to the store, the action is handled to the reduser. Reducers take in the previous state and
the action being dispatched as an arguments.

import types from "../types";
let init_state = {
    num: 0
}
export function counterReducer(state = init_state, action){
    switch (action.type) {
        case types.INCREMENT: {
            let data = action.payload
            return {...state, num: data+1}
        }
        case types.DECREMENT: {
            let data = action.payload
            return {...state, num: data-1}
        }
        default:
            return {...state}
    }
}

3) Store: Store is a centralized container that holds the entire state tree of your application.
The store is responsible for dispatching actions, calling reducers, and managing the state.
Store is a javascript object which holds our application state as well as a counple of functions subscribe(),
getState() and dispatch(action).

subscribe() ==> we can use it to update the UI in response to the state changes. Mostly we use react-redux rather
than subscribe().
getState() ==> returns the current state of the application which is existing in our store.

The dispatch function is responsible for sending actions to the Redux store, triggering state updates and
potentially causing side effects. By using useDispatch(), you can obtain a reference to the dispatch function 
and use it to dispatch actions from within your React components.

console.log("store value", store)
useEffect(()=>{
    const unsubcribe = store.subscribe(() => {
        let value = store.getState().num
        setNumber(value)
    })
    return () =>{
        unsuncribe()
    }
},[])

React-Redux: It is the official redux UI binding library for react and it is maintained directly by the redux team.
It's provides the useful APIs that enable your component to intract with the redux store.

why it is used:
1) it's highly optimized library
2) it handles store interation logic, so you don't have to right you code youself
3) we can directly access the store values and can change the behaviour (it can be anything like value, 
    UI, mathematic task) of component without re-render the componennt.
4) provide some useful methods and hooks i.e., Provider, useDispatch, useSelector

Provider: <Provider> component makes the redux store available at any nested components that need to access the redux
store. In simple words, we can use store value in any component which is wrap under Provider.
<Provier store={store}>
    <Home/>
</Provider>

useSelector: Allows you to extract data from redux store state, using a selector function.
1. when an action is dispatched, useSelector will do a referece comparison of the previous selector result value and
the current result value. If they are different, the component, will be forced to re-render. If they are same, component
will not re-render

const counter = useSelector((state)=>{state.counter})

useDispatch: This hook returns a reference to the dispatch function from the redux store. You may use it to dispatch
actions as needed.

import {useDispatch} from 'react-redux'
const dispatch = useDispatch();

and on button press
dispatch(increment(number));

Redux Thunk: is the middleware that lets you call the action creators and that return a function instead of action object.
THat function then receives the store's dispatch method, which is then used to dispatch the reqular synchronous actions 
inside the body of the function onces the synchonous operations have completed. The thunk is the concept in programming 
where is function is used to delay the evaluation/calculation of an operation.

In simple words, Redux Thunk is a middleware for Redux that allows you to write asynchronous logic in Redux actions. 
It enables actions to return functions instead of plain objects, giving you the ability to perform async operations 
like API calls and dispatch multiple actions based on the result, all within a single action.

import thunk from 'redux-thunk'

const middleware = [thunk];
const store = createStore(appReducer, applyMiddleware(...middleware))
*/