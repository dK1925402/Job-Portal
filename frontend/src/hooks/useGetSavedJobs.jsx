// import { saveJob } from '@/redux/jobSlice';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// const useGetSavedJobs = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchAllSavedJobs = async () => {
//             try {
//                 // Updated to the PUT request route for saving a job
//                 const res = await axios.put(`${JOB_API_END_POINT}/save-job/${jobId}`, { withCredentials: true });

//                 if (res.data.success) {
//                     dispatch(saveJob(res.data.booldata));  // Dispatch the updated saved status
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         // Assuming `jobId` is passed to the hook, you can get it from props or context
//         fetchAllSavedJobs();
//     }, [dispatch, jobId]);  // Add jobId as dependency

// };

// export default useGetSavedJobs;
