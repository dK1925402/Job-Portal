import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useIsMobile } from './Responsive';
import useGetAllSaveJobs from '@/hooks/useGetSavedJobs';
import logingif from './media/loginfirst.gif';
import Footer from './shared/Footer';
import { Block4 } from './ui/animation';

// const randomJobs = [1, 2,45];

const Browse = () => {

  const { user } = useSelector((store) => store.auth);


    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    const isMobile = useIsMobile();
    const grid = isMobile ? "grid-cols-1 p-6" : "grid-cols-3  ";
    const margin = isMobile ? "mx-2" : "my-10 ";
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
            // //console.log("chndsjnj");
        }
    },[])

    useGetAllSaveJobs();
    return (
        <div className='bg-gray-100'>
            <Navbar />
     
     
            {!user ? (
                <div className="max-w-7xl mx-auto mt-5 px-4">
                    <div className="flex flex-col md:flex-row gap-5">
                        {/* Sidebar Section */}
                        {/* <div className="hidden md:block md:w-1/4">
                            <FilterCard />
                        </div> */}

                        {/* Main Content Section */}
                        <div className="flex-1 flex justify-center items-center h-[80vh]">
                            <div className="text-center">
                                <img src={logingif} alt="Login first" className="w-1/2 mx-auto" />
                                <p className="mt-4 text-lg font-semibold">Please log in to view jobs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
     
      (      
        <Block4>
      
      <div className='max-w-7xl mx-auto m-5 px-4 '>
                <h1 className={`font-bold text-xl  ${margin} `}>Search Results ({allJobs.length})</h1>
                <div className={`grid ${grid} gap-4 `}>
                    {
                        allJobs.map((job) => {
                            return (
                               <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
            </Block4> 
            )}
            <Footer></Footer>
        </div>
    )
}

export default Browse