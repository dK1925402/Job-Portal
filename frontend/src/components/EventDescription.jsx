import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { EVENT_API_END_POINT } from '@/utils/constant';
import { setSingleEvent } from '@/redux/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { saveAs } from 'file-saver';
import Navbar from './shared/Navbar';

const EventDescription = () => {
    const { singleEvent } = useSelector((store) => store.event);
    const params = useParams();
    const eventId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const res = await axios.get(`${EVENT_API_END_POINT}/get/${eventId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleEvent(res.data.event));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleEvent();
    }, [eventId, dispatch]);

    const downloadImage = (url) => {
        if (!url) {
            //console.error("Image URL is not provided!");
            return;
        }
        saveAs(url, 'Event.jpg');
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                    <div className="lg:w-2/3">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="font-bold text-2xl">{singleEvent?.title}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    {/* You can uncomment and customize badges as needed */}
                                    {/* <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleEvent?.position} Positions</Badge> */}
                                </div>
                            </div>
                        </div>

                        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Event Description</h1>
                        <div className="my-4 space-y-2">
                            <h1 className="font-bold">Title: <span className="pl-4 font-normal text-gray-800">{singleEvent?.title}</span></h1>
                            <h1 className="font-bold">Location: <span className="pl-4 font-normal text-gray-800">{singleEvent?.location}</span></h1>
                            <h1 className="font-bold">Date: <span className="pl-4 font-normal text-gray-800">{singleEvent?.description}</span></h1>
                            <h1 className="font-bold">Organisation: <span className="pl-4 font-normal text-gray-800">{singleEvent?.organisation}</span></h1>
                            <h1 className="font-bold">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleEvent?.createdAt?.split("T")[0]}</span></h1>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => downloadImage(singleEvent?.image)}
                                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                            >
                                Download Poster
                            </button>
                            <button
                                onClick={() => navigate("/event")}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/3 flex justify-center">
                        <img
                            className="h-[70vh] w-auto rounded-xl border-2 border-gray-300"
                            src={singleEvent?.image}
                            alt="Event"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDescription;
