import Button from '@mui/material/Button';
import { useState } from 'react';
export default function Filter({filterData,category,setcategory}){
    const [border,setborder]= useState("")
    function onFilterChange(data){
        setcategory(data.title)
    }
    
    return (
        <>
            <div className='filter flex justify-center  p-2'>
                  <div className='tabs  flex justify-evenly flex-wrap' style={{width:"600px"}}>
                         {filterData.map((data,index)=>{return <Button onClick={()=>{onFilterChange(data)}}  style={{ border:border,backgroundColor:"#35374B",fontWeight:"700",marginBottom:"0.5rem" }} variant="contained">{data.title}</Button>})}
                  </div>
            </div>
        </>
    )
}











