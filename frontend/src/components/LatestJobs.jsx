import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useIsMobile } from './Responsive';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const isMobile = useIsMobile();

    const grid = isMobile ? "grid-cols-2 gap-2" : "grid-cols-3 gap-4 p-6 ";
    const maxwid = isMobile ? "max-w-2xl " : "max-w-7xl my-9  ";
    const margin = isMobile ? "mb-6 " : " mb-4";

    return (
        <div className={`${maxwid } mx-auto p-6 `}>
            <h3 className={`text-2xl font-bold text-gray-700 ${margin}`}>Latest Job Openings</h3>
            <div className={`grid ${grid}`}>
                {
                    allJobs.length <= 0 
                        ? <span>No Job Available</span> 
                        : allJobs?.slice(0, 6).map((job) => (
                            <div className='flex justify-center' key={job._id}>
                                <LatestJobCards job={job} />
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default LatestJobs;
