import { createSlice } from '@reduxjs/toolkit'

const initialState={
    playList: {},
    video:{},
    rememberMeURL:"",
    rememberMEObj:{},
    sideBar:false
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
        },
        savesideBarStatus(state,payLoad){
            if (payLoad) {
            return{
                ...state,
                sideBar: !state.sideBar
            }
        }
        }
    }
})

export const {
    savePlayList,
    saveRememberMeURL,
    saveRememberMEObj,
    savesideBarStatus

}=currentPlayInfoSlice.actions;

export default currentPlayInfoSlice.reducer;