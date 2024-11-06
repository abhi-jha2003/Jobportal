import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontalIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AdminJobsTable() {
    const navigate=useNavigate();

    const{allAdminJobs,searchJobByText}=useSelector(store=>store.job)
    const [filterJobs,setFilterJobs] =useState(allAdminJobs);
    useEffect(()=>{
        const filterredjobs= allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filterredjobs);

    },[allAdminJobs,searchJobByText])
  return (
    <div>
        <Table>
            <TableCaption>
                A list of your recent posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name </TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date </TableHead>
                        <TableHead className="text-right">Action </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      filterJobs?.map((job)=>(
<tr>

                  
                
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger >
                         <MoreHorizontalIcon/>
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
<div onClick={()=>navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
<Edit2 className='w-4'/>
<span>Edit</span>
</div>
<div className='flex items-center w-fit gap-2 cursor-pointer mt-2' onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}>
    <Eye className='w-4'/>
    <span>Applicants</span>
</div>
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
