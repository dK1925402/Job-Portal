import React from 'react'
import { useSelector } from 'react-redux';
import Event from './Event';
import Navbar from './shared/Navbar';
import { useIsMobile } from './Responsive';
import Footer from './shared/Footer';
import { Block5 } from './ui/animation';
 

const Events = () => {

  const {allEvents} = useSelector(store=>store.event);
  const isMobile = useIsMobile();
  const grid = isMobile ? "grid-cols-1 " : " grid-cols-3";
  // const grid = isMobile ? "grid-cols-1 : " grid-cols-3 ";
  // //console.log(allEvents);
  //console.log(allEvents?.length);
  if(allEvents?.length == 0){
    return(

      <div>
          <Navbar></Navbar>
      <div className='h-[100vh] flex justify-center items-center text-2xl '>
        <h1>Events Not Found !!</h1>
      </div>
      <Footer></Footer>
      
      </div>
    )
  }

  return (


<div className='bg-gray-100'>
  <Navbar></Navbar>

  <Block5> 
    <div className='max-w-6xl mx-auto ' >
      

      <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>

      <h3 className="text-2xl font-bold text-gray-700 mt-2 mx-2 ">Latest Events </h3>
      <div  className={`grid ${grid} gap-4`}>
        {
          allEvents?.map((event )=> ( <Event key={event._id} event={event} ></Event>))
      
        }
      </div>
      </div>
    </div>
    </Block5>
    <Footer></Footer>
    </div>
  )
}

export default Events
