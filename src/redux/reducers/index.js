import {counterReducer } from "./counterReducer"
import {authReducer} from './authReducer'
import { combineReducers } from 'redux';
import { myReducer } from "./myReducer";
import { cartReducer } from "./cartReducer";
import { favouriteReducer } from "./favouriteReducer";
import { addressReducer } from "./addressReducer";

const appReducer = combineReducers({
    authReducer,
    counterReducer,
    products: myReducer,
    myCart: cartReducer,
    myFavourites: favouriteReducer,
    myAddress: addressReducer,
})

export default appReducer;