import { createSlice } from '@reduxjs/toolkit'

const initialState={
    playList:{id:"null"},
    video:{},
}

const currentPlayInfoSlice=createSlice({
    name:"currentPlayInfo",
    initialState,
    reducers:{
        savePlayList(state,payLoad){
            let {_id}=payLoad
            if (_id) {
                return {
                    ...state,
                    playList:{
                        ...payLoad
                    }
                }}
        }
    }
})

export const {
    savePlayList,
}=currentPlayInfoSlice.actions;

export default currentPlayInfoSlice.reducer;