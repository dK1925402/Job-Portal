import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
   
    organisation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    
},{timestamps:true});
export const Event = mongoose.model("event",eventSchema );