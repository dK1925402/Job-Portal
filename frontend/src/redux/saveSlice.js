import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedJobs: [], // Assuming this is an array of saved job IDs
};

const saveSlice = createSlice({
    name: 'save',
    initialState,
    reducers: {
        saveJob: (state, action) => {
            // Add the job ID only if it's not already saved
            if (!state.savedJobs.includes(action.payload)) {
                state.savedJobs.push(action.payload);
            }
        },
        removeSavedJob: (state, action) => {
            // Remove the job ID from the savedJobs array
            state.savedJobs = state.savedJobs.filter((jobId) => jobId !== action.payload);
        },
    },
});

export const { saveJob, removeSavedJob } = saveSlice.actions;

export default saveSlice.reducer;
