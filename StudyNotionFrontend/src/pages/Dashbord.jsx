import { useState,useEffect } from "react"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { apiUrl,filterData } from '../data'
import Filter from "./DashbordFilter";
import Cards from "./DashbordCards";
export default function Dashbord(){
    
    let navigate= useNavigate();
    const [data,setdata]= useState([]);
    const [category,setcategory]= useState(filterData[0].title)
    
   useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await fetch(apiUrl);
        const data= await response.json();
        console.log(data)
        setdata(data.data);
      }catch(err){
        toast.error(err.message);
      }
    }
   fetchData()},[])
   return (
    <>
       <Filter filterData={filterData} category={category} setcategory={setcategory}/>
       <Cards data={data} category={category} />
    </>
  )
}