import { createSlice } from '@reduxjs/toolkit'

const initialState={
    playList: { _id:"65b67747a96e52ac6de06187"},
    video:{},
    rememberMeURL:"",
    rememberMEObj:{},
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
        },
        saveRememberMeURL(state, payLoad) {
            if (payLoad) {
                return {
                    ...state,
                    rememberMeURL:payLoad
            }
        }
        },
        saveRememberMEObj(state, payLoad) {
            if(payLoad){
                return {
                    ...state,
                    rememberMEObj: {
                        ...payLoad
                    }
                }
            }
        }
    }
})

export const {
    savePlayList,
    saveRememberMeURL,
    saveRememberMEObj

}=currentPlayInfoSlice.actions;

export default currentPlayInfoSlice.reducer;