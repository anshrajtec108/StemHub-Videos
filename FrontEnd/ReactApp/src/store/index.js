import { configureStore } from '@reduxjs/toolkit';
import currentPlayinfoReducer from './reducers/currentPlayinfo';

const store=configureStore({
    reducer:{
        currentPlayinfo:currentPlayinfoReducer
    }
})

export default store;