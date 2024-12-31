
import { saveJob } from '@/redux/saveSlice'
import { SAVE_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch} from 'react-redux'
// import { toast } from 'sonner'

const useGetAllSaveJobs = () => {
    const dispatch = useDispatch();
  
    useEffect(()=>{
        const fetchAllSaveJobs = async () => {
            try {
                const res = await axios.get(`${SAVE_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(saveJob(res.data.SaveJobId));
                    // //console.log("jobs",res.data.SaveJobId);
                    // toast.success(res.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllSaveJobs();
    },[])
}

export default useGetAllSaveJobs