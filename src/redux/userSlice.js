import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        uid: JSON.parse(localStorage.getItem('user_id'))
    },
    reducers:{
        update:(state,action) =>{
            state.uid = action.payload.uid
        }
    }
})

export const {update} = userSlice.actions
export default userSlice.reducer    