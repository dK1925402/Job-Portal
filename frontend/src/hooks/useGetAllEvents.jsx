import { setAllEvents } from '@/redux/eventSlice'
import { EVENT_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const useGetAllEvents = () => {
    const dispatch = useDispatch();
    // const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllEvents = async () => {
            //console.log("sabh badiya ")
            try {
                const res = await axios.get(`${EVENT_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllEvents(res.data.events));
                    // //console.log("dekhle ",res.data.events);
                    // toast.success(res.data.message);
                    
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllEvents();
    },[])
}

export default useGetAllEvents