import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import styled, { keyframes } from 'styled-components';
import {bounce} from 'react-animations';
import { useIsMobile } from '../Responsive';
import { Block, Block1 } from '../ui/animation';
import { Bounce } from '../ui/bounce';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

   const isMobile = useIsMobile();
    const textsize = isMobile ? "text-lg" : "text-2xl ";
   const pad = isMobile ? "p-3" : "p-6 ";


 const location = useLocation();

  const isActive = (path) => location.pathname === path;


  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null)); // Clear user state
        navigate('/'); // Redirect to home
        toast.success(res.data.message);
      }
    } catch (error) {
      //console.log(error);
      toast.error(error.response?.data?.message || 'Error logging out');
    }
  };

  return (
    <Block1>
    <div className={`max-w-7xl mx-auto ${pad}`}>
     
    
      <nav className={`bg-white ${pad} py-4 shadow-md rounded-md max-w-7xl mx-auto flex items-center justify-between`}>
      { !isMobile? ( <Bounce> <h1 className={` ${textsize} font-bold text-teal-600 `}>
          Sarvagya<span className="text-[#F83002]">Nirakar</span>
        </h1> </Bounce>)
        :
        ( <Bounce> <h1 className={` ${textsize} font-bold text-teal-600 text-center  flex flex-col space-y-[-8px]`}>
          Sarvagya <br /><span className="text-[#F83002]">Nirakar</span>
        </h1> </Bounce> )}

        {/* Hamburger Menu Button */}
       

        {/* Desktop Menu */}
     <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
              {user && user.role === 'recruiter' ? (
                <>
                  <li>
                    <Link to="/admin/companies" className={`hover:text-teal-500 hover:font-bold  ${
                        isActive('/admin/companies')
                          ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                          : ''
                      }`}>
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" className={`hover:text-teal-500 hover:font-bold ${
                        isActive('/admin/jobs')
                          ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                          : ''
                      }`}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/event" className={`hover:text-teal-500 hover:font-bold ${
                        isActive('/admin/event')
                          ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                          : ''
                      }`}>
                      Event
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className={`hover:text-teal-500 hover:font-bold ${
                        isActive('/')
                          ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                          : ''
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className={`hover:text-teal-500 hover:font-bold ${
                        isActive('/jobs')
                          ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                          : ''
                      }`}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className={`hover:text-teal-500 hover:font-bold ${
                        isActive('/browse')
                          ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                          : ''
                      }`}
                    >
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/event"
                      className={`hover:text-teal-500 hover:font-bold ${
                        isActive('/event')
                          ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                          : ''
                      }`}
                    >
                      Event
                    </Link>
                  </li>
                </>
              )}
            </ul>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-24 left-0 w-full bg-white shadow-lg rounded-md md:hidden text-gray-600 font-medium z-10">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="px-4 py-2 border-b hover:text-teal-500">
                  <Link to="/admin/companies"
                  
                   className={`hover:text-teal-500 ${
                    isActive('/admin/companies')
                      ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                      : ''
                  }`}
                  
                  >Companies</Link>
                </li>
                <li className="px-4 py-2 border-b hover:text-teal-500">
                  <Link to="/admin/jobs"
                  
                   className={`hover:text-teal-500 ${
                    isActive('/admin/jobs')
                      ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                      : ''
                  }`}
                  
                  >Jobs</Link>
                </li>
                <li className="px-4 py-2 hover:text-teal-500">
                  <Link to="/admin/event"
                  
                   className={`hover:text-teal-500 ${
                    isActive('/admin/event')
                      ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                      : ''
                  }`}
                  
                  >Event</Link>
                </li>
              </>
            ) : (
              <>
                <li className="px-4 py-2 border-b hover:text-teal-500">
                  <Link to="/"
                  
                   className={`hover:text-teal-500 ${
                    isActive('/')
                      ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                      : ''
                  }`}
                  
                  >Home</Link>
                </li>
                <li className="px-4 py-2 border-b hover:text-teal-500">
                  <Link to="/jobs"
                  
                   className={`hover:text-teal-500 ${
                    isActive('/jobs')
                      ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                      : ''
                  }`}
                  
                  >Jobs</Link>
                </li>
                <li className="px-4 py-2 border-b hover:text-teal-500">
                  <Link to="/browse"
                  
                   className={`hover:text-teal-500 ${
                    isActive('/browse')
                      ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                      : ''
                  }`}
                  
                  >Browse</Link>
                </li>
                <li className="px-4 py-2 hover:text-teal-500">
                  <Link to="/event"
                  
                   className={`hover:text-teal-500 ${
                    isActive('/event')
                      ? 'text-orange-500 font-bold underline underline-offset-4 decoration-2'
                      : ''
                  }`}
                  
                  >Event</Link>
                </li>
              </>
            )}
          </ul>
        )}

        {!user ? (

          <div  className='flex justify-center items-center '>

<div>
<button
          className="block md:hidden text-gray-600 focus:outline-none  "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        </div>


          <div className="flex items-center gap-2 ml-2" >
            <Link to="/login">
              <Button variant="outline" className="hover:text-teal-500">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="px-4 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600">
                Signup
              </Button>
            </Link>
          </div>
          </div>
        ) : (

          <div  className='flex justify-center items-center'>

          <div>
          <button
                    className="block md:hidden text-gray-600 focus:outline-none mr-3"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                  </div>


          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer border-orange-400 border-2">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname || 'User'}
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div>
                <div className="flex gap-2 items-center mb-4">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || 'User'}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600">
                  {user.role === 'student' && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Link to="/profile" className="text-teal-600 hover:underline">
                        View Profile
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer mt-2">
                    <LogOut />
                    <button
                      onClick={logoutHandler}
                      className="text-teal-600 hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          </div>
        )}
      </nav>
    </div>
    </Block1>
    
  );
};

export default Navbar;
