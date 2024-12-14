import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { EVENT_API_END_POINT } from '@/utils/constant';
import { setSingleEvent } from '@/redux/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { saveAs } from 'file-saver'
import Navbar from './shared/Navbar';

const EventDescription = () => {
    const { singleEvent } = useSelector(store => store.event);
   
    const params = useParams();
    const eventId = params.id;
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchsingleEvent = async () => {
            try {
                const res = await axios.get(`${EVENT_API_END_POINT}/get/${eventId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleEvent(res.data.event));

                    console.log("masti chalu h ");
                    // setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchsingleEvent();
    }, [eventId, dispatch]);



    

  
      const downloadImage = (url) => {
        if (!url) {
            console.error("Image URL is not provided!");
            return;
          }

          
        saveAs(url, 'Event.jpg') // Put your image URL here.
      }
    
  
    


    return (
        <div> <Navbar></Navbar> 
<div  className="max-w-4xl mx-auto my-10" >
    <div className='flex'>

        <div className='max-w-4xl mx-auto my-10 '>


            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleEvent?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        {/* <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleEvent?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleEvent?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleEvent?.salary}LPA</Badge> */}
                    </div>
                </div>
               

            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Event Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Title: <span className='pl-4 font-normal text-gray-800'>{singleEvent?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleEvent?.location}</span></h1>
                <h1 className='font-bold my-1'>Date: <span className='pl-4 font-normal text-gray-800'>{singleEvent?.description}</span></h1>
                <h1 className='font-bold my-1'>Organisation: <span className='pl-4 font-normal text-gray-800'>{singleEvent?.organisation}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleEvent?.createdAt.split("T")[0]}</span></h1>

             </div>

            <div>
            <button  onClick={() => downloadImage(singleEvent?.image)}  className="bg-teal-600 text-white px-4 py-2 my-10 rounded">Download Poster</button> 
            <button onClick={() => navigate("/event")} className="bg-[#ed4444] text-white px-4 py-2 my-10 rounded mx-2">Close</button>
            </div>

            </div>

                <div >
                    <img
                    className='h-[70vh] max-w-[50vh] rounded-xl border-black border-2 mx-2'
                        src={singleEvent?.image}
                        alt="Event"

                    />


                    
                </div>
                </div>


        </div>
        </div>
    )
}


export default EventDescription