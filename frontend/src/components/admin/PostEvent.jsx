import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EVENT_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import Footer from '../shared/Footer';

const PostEvent = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organisation: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white border border-gray-200 rounded-md shadow-md p-6"
        >
          <h1 className="font-bold text-xl text-gray-800 mb-6 text-center">Add Event</h1>
          <div className="space-y-4">
            <div>
              <Label>Event Title</Label>
              <Input
                type="text"
                value={input.title}
                name="title"
                onChange={changeEventHandler}
                placeholder="Enter event title"
                className="w-full"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                value={input.description}
                name="description"
                onChange={changeEventHandler}
                placeholder="Enter event description"
                className="w-full"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={input.date}
                name="date"
                onChange={changeEventHandler}
                className="w-full"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                value={input.location}
                name="location"
                onChange={changeEventHandler}
                placeholder="Enter event location"
                className="w-full"
              />
            </div>
            <div>
              <Label>Organisation</Label>
              <Input
                type="text"
                value={input.organisation}
                name="organisation"
                onChange={changeEventHandler}
                placeholder="Enter organisation name"
                className="w-full"
              />
            </div>
            <div>
              <Label>Poster</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="w-full cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-6">
            {loading ? (
              <Button className="w-full bg-gray-300 text-gray-700" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md"
              >
                Post Event
              </Button>
            )}
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PostEvent;
