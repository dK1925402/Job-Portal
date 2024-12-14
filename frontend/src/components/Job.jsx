import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Add axios import
import { saveJob, removeSavedJob } from '../redux/jobSlice'; // Redux actions
import { JOB_API_END_POINT } from '@/utils/constant';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch saved jobs from Redux
    const savedJobs = useSelector((state) => state.job.savedJobs);

    const [isSaved, setIsSaved] = useState(job?.saved);

    // Effect to check if the job is saved
    useEffect(() => {
        if (job?._id && Array.isArray(savedJobs)) {
            setIsSaved(savedJobs.includes(job._id)); // Check if job is in savedJobs
        }
    }, [savedJobs, job?._id]); // Re-run whenever savedJobs or job._id changes

    console.log("kya chal raha h ",job?.saved)
    const btnHandler = async () => {
        try {
            const res = await axios.put(`${JOB_API_END_POINT}/save-job/${job._id}`, {}, { withCredentials: true });
           
            if (res.data.success) {
                // Update UI based on the response
                setIsSaved(res.data.savedStatus);
                if (res.data.savedStatus) {
                    dispatch(saveJob(job._id)); // Update Redux state if job is saved
                } else {
                    dispatch(removeSavedJob(job._id)); // Remove job from Redux state if unsaved
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const background = isSaved ? 'bg-orange-500' : 'bg-white';
    const color = isSaved ? 'white' : 'gray';

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? 'Today'
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button
                    variant="outline"
                    className={`rounded-full ${background}`}
                    size="icon"
                    onClick={btnHandler}
                >
                    <Bookmark size={28} color={color} />
                </Button>
            </div>

            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">{job?.company?.name }  &&&  {job?.saved}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">
                    {job?.description?.substring(0, 100)} ....
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className={'text-blue-700 font-bold'} variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">
                    {job?.salary}LPA
                </Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button
                    className="bg-orange-500 text-white"
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                >
                    Details
                </Button>
                <Button
                    onClick={btnHandler}
                    className={`rounded-xl ${isSaved ? 'bg-orange-500 text-white' : 'bg-teal-500 text-white'}`}
                >
                    {isSaved ? 'Remove From Later' : 'Save For Later'}
                </Button>
            </div>
        </div>
    );
};

export default Job;
