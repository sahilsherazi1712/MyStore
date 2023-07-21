import appReducer from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, appReducer);
const middlewares = [thunk]

export const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persister = persistStore(store)