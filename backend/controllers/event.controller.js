import { Event } from "../models/event.model.js "
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// admin post krega job
export const postEvent = async (req, res) => {
   
    try {
        const { title, description, date, location, organisation , created_by} = req.body;
        const userId = req.id;
        //console.log("User ID in middleware:", req.id);
        // created_by = req.id;
        //console.log(title, description, date, location,organisation,userId);
        if (!title || !description || !date || !organisation || !location ) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const event = await Event.create({
            title,
            description,
            date,
            location,
            organisation,
            image:cloudResponse.secure_url,
            created_by: userId,
        }) 
        //  //console.log("Event created:", event);
        return res.status(201).json({
            message: "New Event created successfully.",
            event,
            success: true ,
            
        });
    } catch (error) {
        // //console.log("sab chal raha h bhai  " );
        console.log(error);
        
    }
}
// student k liye
export const getAllEvents = async (req, res) => {
    try {
        
        const events = await Event.find();
        if (!events) {
            return res.status(404).json({
                message: "Events not found.",
                success: false
            })
        };
        return res.status(200).json({
            message : "found data ",
            events,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                message: "Events not found.",
                success: false
            })
        };
        return res.status(200).json({ event, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminEvents = async (req, res) => {
    try {
        const adminId = req.id;
        // //console.log("admin id : ", adminId);
        const events = await Event.find({ created_by: adminId });
        // //console.log("events : " , events);
        if (!events) {
            return res.status(404).json({
                message: "Events not found.",
                success: false
            })
        };
        return res.status(200).json({
            events,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



export const updateEvent = async (req, res) => {
    try {
       const { title, description, date, location, organisation} = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const image = cloudResponse.secure_url;
    
        const updateData = { title, description, date, location, organisation,image };

        const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!event) {
            return res.status(404).json({
                message: "Event not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Event information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        
        // Delete the event by its ID
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Event deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while deleting the event.",
            success: false
        });
    }
};