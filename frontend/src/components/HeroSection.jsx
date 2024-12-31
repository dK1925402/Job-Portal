import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Block2, Block3 } from './ui/animation';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (


        <div className="text-center">
            <div className="flex flex-col max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
               <Block2><h1 className="text-4xl font-extrabold text-gray-800">
                    Sarvagya Nirakar Community
                </h1>
                
                <p className="mt-4 text-gray-600">
                    Our Mission - Youth Empowerment for Nation Building
                </p>

                </Block2> 
                <Block3>
                <div className="flex justify-center mt-6 w-full">
                    
                   
                    <div className="flex w-full max-w-2xl shadow-lg border border-gray-200 rounded-xl overflow-hidden items-center">
                 
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
                            Search
                        </Button>
                        
                    </div>
                    
                </div>
                </Block3>
            </div>
        </div>
    )
}

export default HeroSection
