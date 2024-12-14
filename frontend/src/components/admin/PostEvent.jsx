

import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EVENT_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const PostEvent = () => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        organisation: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {

        console.log(input);

        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("location", input.location);
        formData.append("date", input.date);
        formData.append("organisation", input.organisation);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${EVENT_API_END_POINT}/post`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
              
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/event");
            }
         
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    // useEffect(()=>{
    //     if(user){
    //         navigate("/");
    //     }
    // },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Add Event</h1>
                    <div className='my-2'>
                        <Label>Event Title</Label>
                        <Input
                            type="text"
                            value={input.title}
                            name="title"
                            onChange={changeEventHandler}
                           
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Description</Label>
                        <Input
                            type="text"
                            value={input.description}
                            name="description"
                            onChange={changeEventHandler}
                          
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Date</Label>
                        <Input
                            type="text"
                            value={input.date}
                            name="date"
                            onChange={changeEventHandler}
                           
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Location</Label>
                        <Input
                            type="text"
                            value={input.location}
                            name="location"
                            onChange={changeEventHandler}

                        />
                    </div>
                    <div className='my-2'>
                        <Label>Organisation</Label>
                        <Input
                            type="text"
                            value={input.organisation}
                            name="organisation"
                            onChange={changeEventHandler}
                            
                        />
                    </div>
                   
                    <div className='flex items-center justify-between'>
                       
                            
                        <div className='flex items-center gap-2'>
                            <Label>Poster</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4  bg-teal-500">Post Event</Button>
                    }
             
                </form>
            </div>
        </div>
    )
}

export default PostEvent
