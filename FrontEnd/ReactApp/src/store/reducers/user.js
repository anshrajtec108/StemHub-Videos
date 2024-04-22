import { createSlice } from '@reduxjs/toolkit'

const initialState={
    userId:'default',
    userObj:{}
}
const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        saveUserId(state,payLoad){
            if(payLoad){
                return{
                    ...state,
                    userId:payLoad.payload
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
} = userSlice.actions;

export default userSlice.reducer