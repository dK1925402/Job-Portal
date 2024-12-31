import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
// import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminEvents from '@/hooks/useGetAllAdminEvents'
import { setSearchEventByText } from '@/redux/eventSlice'
import AllAdminEvents from './AllAdminEvents'

const AdminEvent = () => {
  useGetAllAdminEvents();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchEventByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 p-4'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="bg-teal-500"  onClick={() => navigate("/admin/event/create")}>New Event</Button>
        </div>
        {/* <AdminJobsTable /> */}
        <AllAdminEvents></AllAdminEvents>
      </div>
    </div>
  )
}

export default AdminEvent