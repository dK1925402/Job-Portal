import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { EVENT_API_END_POINT } from '@/utils/constant'
import { MdOutlineDelete } from "react-icons/md";
import { toast } from 'sonner';

const AllAdminEvents = () => {
    const { allAdminEvents, searchEventByText } = useSelector(store => store.event);
    const [filterEvents, setFilterEvents] = useState(allAdminEvents);
    const navigate = useNavigate();

    // Function to handle delete event
    const handleDeleteEvent = async (eventId) => {
        try {
            // Send DELETE request to backend to remove event
            const response = await axios.delete(`${EVENT_API_END_POINT}/delete/${eventId}`);
            // const res = await axios.get(`${EVENT_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
            
            // Check for successful deletion
            if (response.data.success) {
                // Update local state to remove the event
                setFilterEvents(filterEvents.filter(event => event._id !== eventId));
                toast.success(response.data.message);
                navigate(`/admin/event`);
            } else {
                //console.error("Error deleting event");
            }
        } catch (error) {
            //console.error("Error occurred while deleting the event:", error);
        }
    };

    useEffect(() => {
        const filteredEvents = allAdminEvents.filter((event) => {
            if (!searchEventByText) {
                return true;
            }
            return event?.title?.toLowerCase().includes(searchEventByText.toLowerCase());
        });
        setFilterEvents(filteredEvents);
    }, [allAdminEvents, searchEventByText]);

    return (
        <div className=''>
            <Table>
                <TableCaption className="text-teal-600">A list of your recent posted events</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterEvents?.map((event) => (
                            <TableRow key={event._id}>
                                <TableCell className="text-orange-600 font-bold">{event?.title}</TableCell>
                                <TableCell>{event?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-28">
                                            <div onClick={() => handleDeleteEvent(event._id)} className="flex items-center w-fit gap-2 cursor-pointer ">
                                            <MdOutlineDelete /> <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AllAdminEvents;
