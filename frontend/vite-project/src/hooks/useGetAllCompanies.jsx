import { setCompanies  } from '@/redux/companySlice';

import { COMPANY_API_END_POINT, } from '@/utils/constant';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function useGetAllCompanies() {
const dispatch=useDispatch();
    useEffect(()=>{
        const fetchCompanies=async()=>{
            try {
                const res=await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true})
              
         if(res.data.success){
            dispatch(setCompanies(res.data.companies));
         }
            } catch (error) {
                console.error(error);
            }
        }
       fetchCompanies();

    },[])
}