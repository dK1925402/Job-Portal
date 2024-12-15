import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { saveJob, removeSavedJob } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const savedJobs = useSelector((state) => state.job.savedJobs);
    const [isSaved, setIsSaved] = useState(job?.saved);

    useEffect(() => {
        if (job?._id && Array.isArray(savedJobs)) {
            setIsSaved(savedJobs.includes(job._id));
        }
    }, [savedJobs, job?._id]);

    const btnHandler = async () => {
        try {
            const res = await axios.put(`${JOB_API_END_POINT}/save-job/${job._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                setIsSaved(res.data.savedStatus);
                if (res.data.savedStatus) {
                    dispatch(saveJob(job._id));
                } else {
                    dispatch(removeSavedJob(job._id));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className="p-4 rounded-xl shadow-lg bg-white border border-gray-200 flex flex-col justify-between space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? 'Today'
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button
                    variant="outline"
                    className={`rounded-full ${isSaved ? 'bg-orange-500' : 'bg-white'}`}
                    size="icon"
                    onClick={btnHandler}
                >
                    <Bookmark size={28} color={isSaved ? 'white' : 'gray'} />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>
                <div className="flex flex-col">
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            {/* Job Details */}
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">
                    {job?.description?.substring(0, 100)}...
                </p>
            </div>




            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-4 ">
                <Button
                    className="flex-grow bg-orange-500 text-white"
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                >
                    Details
                </Button>
                <Button
                    onClick={btnHandler}
                    className={`flex-grow rounded-xl ${
                        isSaved ? 'bg-orange-500 text-white' : 'bg-teal-500 text-white'
                    }`}
                >
                    {isSaved ? 'Remove From Later' : 'Save For Later'}
                </Button>
            </div>
        </div>
    );
};

export default Job;
