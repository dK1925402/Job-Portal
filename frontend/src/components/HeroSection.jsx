import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="text-center  ">
        <div className="flex flex-col  max-w-4xl mx-auto">
            {/* <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm">
                No. 1 Job Hunt Website
            </span> */}
            <h1 className="text-4xl font-extrabold text-gray-800">
                Sarvagya Nirakar Community
            </h1>
            <p className="mt-4 text-gray-600">
                Our Mission - Youth Empowerment for Nation Building
            </p>
            <div className="flex justify-center mt-6">
                <div className="flex w-full max-w-2xl shadow-lg border border-gray-200 rounded-xl overflow-hidden justify-center items-center">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-3 text-gray-700 text-base focus:outline-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                       class="px-6 py-3 bg-orange-500 text-white rounded-r-md hover:bg-orange-600"
                    >
                        {/* <Search className="h-5 w-5" /> */}
                        Search
                    </Button>

                    {/* <button class="px-6 py-3 bg-orange-500 text-white rounded-r-md hover:bg-orange-600">
          Search
        </button> */}

                </div>
            </div>
        </div>
    </div>
    
    
    )
}

export default HeroSection