import mongoose from "mongoose";

const saveSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    saved: {
        type: Boolean,
        ref: 'User',
        default : false
        
    },
},{timestamps:true});
export const Save  = mongoose.model("Save", saveSchema);