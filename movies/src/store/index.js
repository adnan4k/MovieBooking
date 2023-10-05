import {configureStore, createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{isLoggedin:true},
   reducers:{ 
    login(state){
      state.isLoggedin = true
    },
    logout(state){
 state.isLoggedin = false;
 localStorage.removeItem("userId");
    }}
})
const adminSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedin:true
    },
    reducers:{
        login(state){
            state.isLoggedin = true
          },
          logout(state){
       state.isLoggedin = false;
       localStorage.removeItem("aminId");
       localStorage.removeItem("token")
          }
    }
})

export const userAction = userSlice.actions;
export const adminAction = adminSlice.actions;

export const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        admin:adminSlice.reducer
    }
})