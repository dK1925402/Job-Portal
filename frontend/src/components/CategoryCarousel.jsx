import React, { useState, useEffect } from "react";

import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: "Frontend Developer", description: "Design and build stunning interfaces." },
    { name: "Backend Developer", description: "Build scalable backend systems." },
    { name: "Data Science", description: "Welcome to the world of data!" },
    { name: "Graphic Designer", description: "Creativity at its best!" },
    { name: "FullStack Developer", description: "Master of both frontend and backend!" },
    { name: "Mobile Developer", description: "Develop apps for iOS and Android." },
    { name: "UI/UX Designer", description: "Create seamless user experiences and intuitive interfaces." },
    { name: "DevOps Engineer", description: "Automate and streamline software development and operations." },
    { name: "Cybersecurity Specialist", description: "Protect networks, systems, and data from cyber threats." },
    { name: "Artificial Intelligence Engineer", description: "Design and implement intelligent systems that mimic human behavior." },
    { name: "Blockchain Developer", description: "Build decentralized applications and systems using blockchain technology." },
    { name: "Game Developer", description: "Create interactive games and simulations for various platforms." },
    { name: "Cloud Engineer", description: "Design and manage cloud infrastructure and services." },
    { name: "Software Engineer", description: "Develop, test, and maintain software applications." },
    { name: "web", description: "Ensure the quality and performance of software through testing." }
];

const CategoryCarousel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
        }, 3000); // 3 seconds

        return () => clearInterval(interval); // Cleanup
    }, []);

    // Dynamic styles for positioning
    const getSlideClass = (index) => {
        const totalSlides = categories.length;
        const relativeIndex = (index - activeIndex + totalSlides) % totalSlides;

        if (relativeIndex === 0) return "translate-x-0 scale-100 opacity-100 z-10"; // Active slide
        if (relativeIndex === 2) return "translate-x-32 scale-90 opacity-80 z-0"; // Next slide
        if (relativeIndex === 1) return "translate-x-64 scale-75 opacity-60 z-0"; // Second next slide
        if (relativeIndex === totalSlides - 1) return "-translate-x-32 scale-90 opacity-80 z-0"; // Previous slide
        if (relativeIndex === totalSlides - 2) return "-translate-x-64 scale-75 opacity-60 z-0"; // Second previous slide
        return "hidden"; // Hidden slides
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h3 className="text-2xl font-bold text-gray-700 mt-2 ">Browse by Categories</h3>
            <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                    {categories.map((category, index) => {
                        const isActive = (index - activeIndex + categories.length) % categories.length === 0;
                        return (
                            <div

                              onClick={() => searchJobHandler(category.name.split(' ')[0])}
                                key={index}
                                className={`absolute transition-all duration-500 ease-in-out ${getSlideClass(index)} w-1/4 text-center`}
                            >
                                <div className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:scale-105">
                                    <h3
                                        className={`text-lg font-bold ${isActive ? 'text-orange-600' : 'text-teal-600'}`}
                                    >
                                        {category.name}
                                    </h3>
                                    <p       className={`${isActive ? 'text-black mt-2' : 'text-gray-600 mt-2'}`} >{category.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Controls */}
                <button
                    onClick={() =>
                        setActiveIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length)
                    }
                    className="absolute left-5 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
                >
                    &#8592;
                </button>
                <button
                    onClick={() =>
                        setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length)
                    }
                    className="absolute right-5 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
};

export default CategoryCarousel;
