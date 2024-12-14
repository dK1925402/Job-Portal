import React from 'react';
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
import {bounce} from 'react-animations'
import styled, { keyframes } from 'styled-components';



const controlledBounce = keyframes`
0%, 20%, 50%, 80%, 100% {
  transform: translateY(0); /* Stay at original position */
}
40% {
  transform: translateY(-10px); /* Move up slightly */
}
60% {
  transform: translateY(-5px); /* Move up even less */
}
`;

// Apply the Animation
const Bounce = styled.div`
animation: 2s ${controlledBounce} infinite;
`;


const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

   
    return (
    <div className='max-w-7xl mx-auto p-6'>
        <nav className="bg-white px-6 py-4 shadow-md rounded-md max-w-7xl mx-auto flex items-center justify-between ">
           <Bounce> <h1 className="text-2xl font-bold text-teal-600">
                Sarvagya<span className="text-[#F83002]">Nirakar</span>
            </h1></Bounce>
            <ul className="flex space-x-6 text-gray-600 font-medium">
                {user && user.role === 'recruiter' ? (
                    <>
                        <li><Link to="/admin/companies" className="hover:text-teal-500">Companies</Link></li>
                        <li><Link to="/admin/jobs" className="hover:text-teal-500">Jobs</Link></li>
                        <li><Link to="/admin/event" className="hover:text-teal-500">Event</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/" className="hover:text-teal-500">Home</Link></li>
                        <li><Link to="/jobs" className="hover:text-teal-500">Jobs</Link></li>
                        <li><Link to="/browse" className="hover:text-teal-500">Browse</Link></li>
                        <li><Link to="/event" className="hover:text-teal-500">Event</Link></li>
                    </>
                )}
            </ul>
            {!user ? (
                <div className="flex items-center gap-2">
                    <Link to="/login">
                        <Button variant="outline" className="hover:text-teal-500">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button className="px-4 py-2 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600">Signup</Button>
                    </Link>
                </div>
            ) : ( 
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar className="cursor-pointer border-orange-400 border-2">
                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div>
                            <div className="flex gap-2 items-center mb-4">
                                <Avatar>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
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
                                        <Link to="/profile" className="text-teal-600 hover:underline">View Profile</Link>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 cursor-pointer mt-2">
                                    <LogOut />
                                    <button onClick={logoutHandler} className="text-teal-600 hover:underline">Logout</button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </nav>
        </div>
    );
};

export default Navbar;
