import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();



    const { allJobs, searchedQuery } = useSelector(store => store.job);
     const [filterJobs, setFilterJobs] = useState(allJobs);
    
        useEffect(() => {
            if (searchedQuery) {
                const filteredJobs = allJobs.filter((job) => {
                    return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
                        // job.salary.includes(searchedQuery)
                })
                setFilterJobs(filteredJobs)
            } else {
                setFilterJobs(allJobs)
            }
        }, [allJobs, searchedQuery]);

    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-xl shadow-xl bg-white border border-gray-200    cursor-pointer'>
            <div>
                <h1 className='font-medium  text-orange-500 text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-teal-600  text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description.substring(0,100)} ...</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards