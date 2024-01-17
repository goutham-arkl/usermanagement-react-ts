import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist'

const persistConfig={
    key:'root',
    storage
}

const reducer = combineReducers({
    user:userReducer
})

const persistedReducer=persistReducer(persistConfig,reducer)


const store=configureStore({
    reducer:{
        user:persistedReducer
    }
})

export default store
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch