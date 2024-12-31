import { setAllAdminEvents } from '@/redux/eventSlice'
import { EVENT_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminEvents = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminEvents = async () => {
            try {
                const res = await axios.get(`${EVENT_API_END_POINT}/getadminevents`,{withCredentials:true});
                if(res.data.success){
                    // //console.log("all data , ",res.data.events);
                    dispatch(setAllAdminEvents(res.data.events));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminEvents();
    },[])
}

export default useGetAllAdminEvents