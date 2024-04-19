import { createSlice } from '@reduxjs/toolkit'

const initialState={
    userId:'',
    userObj:{}
}
const user=createSlice({
    name:'user',
    initialState,
    reducers:{
        saveUserId(state,payLoad){
            if(payLoad){
                return{
                    ...state,
                    userId:payLoad
                }
            }
        },

        saveUserObj(state,payLoad){
            if(payLoad){
                return{
                    ...state,
                    userObj:{
                        ...payLoad
                    }
                }
            }
        }
    }
})

export const{
    saveUserId,
    saveUserObj
}=user.actions;

export default user.reducer