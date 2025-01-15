import { useState, useEffect} from 'react'
import Home from './pages/Home'
import Dashbord from './pages/Dashbord'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MainProvider from './MainProvider'
import Navbar from './components/Navbar'
import './App.css'
import { Route,Routes,NavLink } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
function App() {
  const [isLoggedIn,setLoggedIn]=useState(false);

  useEffect(()=>{
    let tokenexist= localStorage.getItem("token");
    if(tokenexist){
       setLoggedIn(true);
    }
  },[]);

  return (
    <>
    <MainProvider>
    <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
        <div className='main container mx-auto'>
              <Routes>
                          <Route path='/' element={<Home/>}/>
                          <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}/>
                          <Route path='/signup' element={<Signup setLoggedIn={setLoggedIn}/>}/>
                          <Route path='/dashbord' element={<PrivateRoute><Dashbord/></PrivateRoute>}/>
              </Routes> 
        </div>
    </MainProvider>
    </>
  )
}

export default App
