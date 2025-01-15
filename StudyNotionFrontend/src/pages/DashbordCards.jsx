
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useState } from 'react';
import SingleCard from './DashbordCard';
export default function Cards({data,category}){

const alldata=[];
function getdata(data){
    console.log("data:-",data)
    if(category=="All"){
        Object.values(data).forEach((courseCategory)=>{courseCategory.forEach((course)=>{
            alldata.push(course);
           })})
           return alldata;
    }
   else{
     data[category].forEach((course)=>{return alldata.push(course)})
     return alldata;
   }
}

getdata(data);
console.log("alldata:-",alldata)
    return (
        <>
           <div className="cards max-w-[1000px]  mx-auto flex  justify-center  gap-4 flex-wrap mb-4">
                   {alldata.length==0?   <Box sx={{ display: 'flex',marginTop:"10rem", flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                                                 <CircularProgress style={{width:"5rem"}} />
                                                 <h1 className='mt-5' style={{fontSize:'3rem',color:"white"}}>Loading</h1>
                                         </Box>  : alldata.map((course,index)=>{

                  return  <> <SingleCard course={course} index={index} alldata={alldata}/> </>
                     
                    })}
           </div>
        </>
    )
}