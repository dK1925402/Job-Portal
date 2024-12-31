import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import logingif from './media/loginfirst.gif';
import useGetAllSaveJobs from '@/hooks/useGetSavedJobs';
import Footer from './shared/Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    const { user } = useSelector((store) => store.auth);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

       useGetAllSaveJobs();

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            {!user ? (
                <div className="max-w-7xl mx-auto mt-5 px-4">
                    <div className="flex flex-col md:flex-row gap-5">
                        {/* Sidebar Section */}
                        <div className="hidden md:block md:w-1/4">
                            <FilterCard />
                        </div>

                        {/* Main Content Section */}
                        <div className="flex-1 flex justify-center items-center h-[80vh]">
                            <div className="text-center">
                                <img src={logingif} alt="Login first" className="w-1/2 mx-auto" />
                                <p className="mt-4 text-lg font-semibold">Please log in to view jobs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto mt-5 px-4">
                    <div className="flex flex-col md:flex-row gap-5">
                        {/* Sidebar Section */}
                        <div className="hidden md:block md:w-1/4">
                            <FilterCard />
                        </div>

                        {/* Main Content Section */}
                        <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
                            {filterJobs.length <= 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <span className="text-xl font-semibold">Job not found</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >

                                            
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
             <Footer></Footer>
        </div>
    );
};

export default Jobs;
