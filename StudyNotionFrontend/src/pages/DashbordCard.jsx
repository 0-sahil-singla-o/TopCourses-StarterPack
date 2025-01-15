import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify'
export default function SingleCard({course,index,alldata}){
    const [toggle,setToggle]= useState(false);
    function like(index){
        let courseExist= alldata[index];
        setToggle(!toggle);
        if(toggle){
            toast.success(`You liked the Course:-> ${courseExist.title}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        else{
            toast.error(`You Disliked the Course:-> ${courseExist.title}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
      }
    return (
        <>
            
                    <Card  style={{position:"relative",maxWidth:"300px",backgroundColor:"#35374B", color:"white"}} sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={course.image.url}
                        title="green iguana"
                      />
                      <button onClick={()=>{return like(index)}} className='w-[35px] h-[35px] bg-white rounded-full flex justify-center items-center absolute top-24 right-1'>{toggle ?  <FavoriteBorderIcon style={{color:"red"}}/> :  <FavoriteIcon  style={{color:"red"}}/> }</button> 
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                          {course.title}
                        </Typography>
                        <Typography style={{color:"white"}} variant="body2" sx={{ color: 'text.secondary' }}>
                        {(course.description).length>100 ? course.description.substr(0,100)+"..." : course.description}
                        </Typography>
                      </CardContent>

                    </Card>
        </>
    )
}