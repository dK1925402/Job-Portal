
import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { saveAs } from 'file-saver';
// import "./Event.css"


const Event = ({event}) => {
  const navigate = useNavigate();

  const downloadImage = (url) => {
          if (!url) {
              //console.error("Image URL is not provided!");
              return;
          }
          saveAs(url, 'Event.jpg');
      };
 
  return (


      <div key={event._id}>





        
        <div className='p-6'>


<div className=" rounded-xl shadow-xl bg-white border border-grey-600 m-5  ">

<div class=" rounded-t-xl h-[30vh] bg-cover bg-no-repeat bg-top ..."  style={{ backgroundImage: `url(${event?.image})`}} > </div>
 



<div className="content p-5" >
{/* Event Details */}
<h1 className="font-bold text-xl mb-2">  {event?.title}</h1>
<p className="text-sm text-gray-600 mb-4">
{event?.description.substring(0,70)} ....
</p>
{/* `${info.substring(0,180)}...` */}
{/* Badges */}
<div className="flex flex-col items-start gap-2 mb-4">
 <div className='flex gap-2'> <span className="px-4 py-1 text-blue-700 font-bold bg-gray-100 rounded">{event?.date}</span>
  <span className="px-4 py-1 text-red-500 font-bold bg-gray-100 rounded">{event?.location}</span></div>
  <div className="px-4 py-1 text-red-500 font-bold bg-gray-100 rounded">{event?.organisation}</div>
</div>

{/* Buttons */}
<div className="flex items-center gap-4">
  {/* <button className="bg-[#7209b7] text-white px-4 py-2 rounded">See details</button> */}
  <Button className=" font-bold px-4 py-2 rounded  bg-orange-500 text-white"  onClick={()=> navigate(`/descriptionevent/${event?._id}`)} variant="outline">Details</Button>
  <Button   onClick={() => downloadImage(event?.image)} className="bg-teal-600 text-white px-4 py-2 rounded" variant="outline">Download Poster</Button>



</div>
</div>
</div>

</div>
      </div>



  


    
  )
}

export default Event
