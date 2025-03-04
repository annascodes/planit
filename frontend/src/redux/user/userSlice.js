import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    notYetSeenTasks:[]
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
            },
            setnotYetSeenTasks:(state, action)=>{
                state.notYetSeenTasks=action.payload;
            }
        }
    }

)
export const {signInOk, logOut, setnotYetSeenTasks}  = userSlice.actions;
export default userSlice.reducer;