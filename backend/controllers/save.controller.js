import { Save } from "../models/save.model.js";
import { Job } from "../models/job.model.js";

export const savedJobs = async (req, res) => {
    const { id: jobId } = req.params; // jobId from route params
    const userId = req.id;            // userId from the request (authenticated user)

    //console.log("Job ID:", jobId, "User ID:", userId);

    // Validate inputs
    if (!jobId || !userId) {
        return res.status(400).json({
            message: "Job ID and User ID are required.",
            success: false,
        });
    }

    try {
        // Check if the job is already saved by the user
        const existingJob = await Save.findOne({ job: jobId, user: userId });
        if (existingJob) {
            // If job is already saved, delete it from the Save collection
            await Save.deleteOne({ job: jobId, user: userId });

            return res.status(200).json({
                message: "Job unsaved successfully.",
                success: true,
                savedStatus: false, // Job is unsaved
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        // Save the job
        const savedJob = await Save.create({
            job: jobId,
            user: userId,
        });

        // Return success response
        return res.status(200).json({
            message: "Job saved successfully.",
            savedJob,
            success: true,
            savedStatus: true, // Job is saved
        });
    } catch (error) {
        //console.error("Error saving job:", error);
        return res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};


export const getSaveJobs = async (req, res) => {
    try {
        const userId = req.id; // Authenticated user's ID
        const savedJobs = await Save.find({ user: userId }).populate('job'); // Populate job details if needed
        const SaveJobId = savedJobs.map((savedJob) => savedJob.job);


        if (!savedJobs || savedJobs.length === 0) {
            return res.status(200).json({
                message: "No saved jobs found.",
                savedJobs: [], // Return an empty array
                success: true,
            });
        }

        return res.status(200).json({
            message: "Saved jobs retrieved successfully.",
            SaveJobId , // Returning the list of saved jobs
            success: true,
        });
    } catch (error) {
        //console.error("Error fetching saved jobs:", error);
        return res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};
