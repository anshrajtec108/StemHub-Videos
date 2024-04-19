import { configureStore } from '@reduxjs/toolkit';
import currentPlayinfoReducer from './reducers/currentPlayinfo';
import user from './reducers/user';

const store=configureStore({
    reducer:{
        currentPlayinfo:currentPlayinfoReducer,
        user:user
    }
})

export default store;