import { createSlice } from '@reduxjs/toolkit'

const initialState={
    IsplayList:false,
    changeInPlayList:false,
    changeInHistory:false,
    isChangeFromHistory:false,
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
        saveISPlayList(state,payLoad){
            console.log('payLoad.payload',payLoad.payload);
            console.log('state', state);
            return{
                ...state,
                IsplayList: payLoad.payload
                
            }
        },
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
                    rememberMeURL: payLoad.payload
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
        },
        savechangeInPlayList(state,payLoad){
            if (payLoad) {
            return{
                ...state,
                changeInPlayList: !state.changeInPlayList
            }
        }
        },
        saveChangeInHistory(state, payLoad) {
            if (payLoad) {
                return {
                    ...state,
                    changeInHistory: !state.changeInHistory
                }
            }
        },
        saveisChangeFromHistory(state, payLoad) {
            if (payLoad) {
                return {
                    ...state,
                    isChangeFromHistory: payLoad.payload
                }
            }
        },
    }
})

export const {
    savePlayList,
    saveRememberMeURL,
    saveRememberMEObj,
    savesideBarStatus,
    saveISPlayList,
    savechangeInPlayList,
    saveChangeInHistory,
    saveisChangeFromHistory,

}=currentPlayInfoSlice.actions;

export default currentPlayInfoSlice.reducer;