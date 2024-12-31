import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllEvents from '@/hooks/useGetAllEvents'
import { Block4 } from './ui/animation'


const Home = () => {
  useGetAllJobs();
  useGetAllEvents();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className='bg-gray-100 text-gray-800 font-sans '>
      {/* <div className='max-w-7xl mx-auto p-6'> */}

      <Navbar />
     
      <HeroSection />
      <Block4><CategoryCarousel /></Block4>
      <LatestJobs />
      <Footer />
    </div>
    // </div>
  )
}

export default Home
