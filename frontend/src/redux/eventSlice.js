import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name:"event",
    initialState:{
        allEvents:[],
        allAdminEvents:[],
        singleEvent:null, 
        searchEventByText:"",
        
    },
    reducers:{
        // actions
       
        setAllEvents:(state,action) => {
            state.allEvents = action.payload;
        },
        setAllAdminEvents:(state,action) => {
            state.allAdminEvents = action.payload;
        },
        setSearchEventByText:(state,action) => {
            state.searchEventByText = action.payload;
        },
        setSingleEvent:(state,action) => {
            state.singleEvent = action.payload;
        },
    }
});
export const { setAllEvents , setAllAdminEvents , setSearchEventByText ,setSingleEvent} = eventSlice.actions;
export default eventSlice.reducer;