import {createSlice} from "@reduxjs/toolkit"

const authInitState={
    token:localStorage.getItem("accessToken")||"",
    isUserLoggedIn:localStorage.getItem("accessToken")?true:false,
    isAdmin:localStorage.getItem("accessToken")||false,
    countProductInBasket:localStorage.getItem("accessToken")||0,
}

const authSlice = createSlice({
    name:"user",
    initialState:authInitState,
    reducers:{
        setToken:(state,action)=>{
            const token = action.payload.token;
            state.token = token
            state.isUserLoggedIn=true;
            localStorage.setItem("accessToken",token);
        },
        setAdmin:(state,action)=>{
            state.isAdmin = action.payload;
        },
        setCountProduct:(state,action)=>{
            state.countProductInBasket = action.payload;
        },
        clearToken:(state)=>{
            state.token="";
            state.isUserLoggedIn=false;
            state.isAdmin=false; 
            state.countProductInBasket = 0; 
            localStorage.removeItem("accessToken")
        }
    }
})

export const {setToken,setAdmin,setCountProduct,clearToken} = authSlice.actions
export default authSlice.reducer
