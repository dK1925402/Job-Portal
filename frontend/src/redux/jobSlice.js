import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        // savedJobs: [],
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        // Save job action
        // saveJob: (state, action) => {
        //     // Check if the job is not already saved
        //     if (!state.savedJobs.includes(action.payload)) {
        //         state.savedJobs.push(action.payload);  // Add job ID to savedJobs array
        //     }
        // },
        // Remove saved job action
        // removeSavedJob: (state, action) => {
        //     state.savedJobs = state.savedJobs.filter(id => id !== action.payload);  // Remove job ID from savedJobs
        // },
    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    // saveJob,
    // removeSavedJob,
} = jobSlice.actions;

export default jobSlice.reducer;
