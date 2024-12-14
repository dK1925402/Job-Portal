import React from 'react'
import { useSelector } from 'react-redux';
import Event from './Event';
import Navbar from './shared/Navbar';
 

const Events = () => {

  const {allEvents} = useSelector(store=>store.event);
  // console.log(allEvents);
  console.log(allEvents?.length);
  if(allEvents?.length == 0){
    return(

      <div>
          <Navbar></Navbar>
      <div className='h-[100vh] flex justify-center items-center text-2xl '>
        <h1>Events Not Found !!</h1>
      </div>
      </div>
    )
  }

  return (


<div className='bg-gray-100'>
  <Navbar></Navbar>
    <div className='max-w-6xl mx-auto ' >
      

      <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>

      <h3 className="text-2xl font-bold text-gray-700 mt-2 ">Latest Events </h3>
      <div  className='grid grid-cols-3 gap-4'>
        {
          allEvents?.map((event )=> ( <Event key={event._id} event={event} ></Event>))
      
        }
      </div>
      </div>
    </div>
    </div>
  )
}

export default Events
