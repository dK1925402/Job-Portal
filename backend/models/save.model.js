import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
           
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a compound index to enforce unique saves and optimize queries


export const Save = mongoose.model("Save", saveSchema);
