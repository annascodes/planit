import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            signInOk: (state, action) => {
                state.currentUser = action.payload;
            },
            logOut:(state)=>{
                state.currentUser=null;
            }
        }
    }

)
export const {signInOk, logOut}  = userSlice.actions;
export default userSlice.reducer;