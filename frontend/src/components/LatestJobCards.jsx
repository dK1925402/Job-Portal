import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIsMobile } from './Responsive';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    // Function to truncate description for desktop and mobile
    const getShortDescription = (desc, isMobile) => {
        const limit = isMobile ? 30 : 100; // Shorter description for mobile
        return desc?.length > limit ? `${desc.substring(0, limit)} ....` : desc || "No description available";
    };

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className={` rounded-xl shadow-xl bg-white border border-gray-200 cursor-pointer 
                flex flex-col  gap-2
                 ${isMobile ? 'w-full p-2' : 'w-[400px] p-6 '}
            `}
        >
            {/* Company Name and Location */}
            <div>
                <h1 className="font-medium text-orange-500 text-sm sm:text-lg">{job?.company?.name}</h1>
                <p className="text-xs sm:text-sm text-gray-500">India</p>
            </div>

            {/* Job Title and Description */}
            <div>
                <h1 className="font-bold text-teal-600 text-sm sm:text-lg ">{job?.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600">{getShortDescription(job?.description, isMobile)}</p>
            </div>

            {/* Badges */}
            <div
                className={`${
                    isMobile ? 'grid grid-cols-2 gap-2' : 'flex items-center gap-2 mt-4'
                } `}
            >
                <Badge className="text-blue-700 font-bold text-xs sm:text-sm" variant="ghost">
                    {job?.position} {isMobile ? 'Pos..' : 'Positions '}
                </Badge>
                <Badge className="text-[#F83002] font-bold text-xs sm:text-sm" variant="ghost">
                    {job?.jobType}
                </Badge>
                {!isMobile && (
                    <Badge className="text-[#7209b7] font-bold text-xs sm:text-sm" variant="ghost">
                        {job?.salary}LPA
                    </Badge>
                )}
            </div>
        </div>
    );
};

export default LatestJobCards;
