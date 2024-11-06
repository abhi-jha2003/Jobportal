import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
const shortListingStatus=["accepted","rejected"];
export default function ApplicantsTable() {
    const {applicants}=useSelector(store=>store.application);
  const statusHandler=async(status,id)=>{

    
    try {
      
  
        const res = await axios.post(
            `${APPLICATION_API_END_POINT}/status/${id}/update`,
            {status},{
                withCredentials: true
            }
             // Set credentials for this request
        );
      

  
        if(res.data.success){
    toast.success(res.data.message);
    
    }
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
       
    }
  }
  
  
  
    return (
   
    <div>
        <Table >
            <TableCaption>
                A list of your recent applied user.
            </TableCaption>
            <TableHeader>
                <TableRow className="text-[#9F9FA6] hover:bg-[#F9F9FA]"> 
                    <TableHead>FullName</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead  className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants.applications?.map((item)=>(
                            <tr className='hover:bg-[#F9F9FA]'key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ?
                               <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target="_blank" rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOrignalName}</a>:<span>NA</span> }
                               </TableCell>
                            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="float-right cursor-pointer">
                            
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal/>
                                </PopoverTrigger>
                                <PopoverContent className="w-32 gap-2">
                                {
                                    shortListingStatus.map((status,index)=>{
                    return( 
                            <div onClick={()=>statusHandler(status,item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                <span>{status}</span>
    
    </div>
    )
                                    })
                                }
                                </PopoverContent>
                            </Popover>
              
                            </TableCell>
                        </tr>
                        ))
                    }
                  
                </TableBody>
            
        </Table>
        </div>
  )
}