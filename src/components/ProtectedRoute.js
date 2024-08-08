import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { GetCurrentUser } from "../APICALLS/user";
import { SetUser } from "../redux/userSlice";
import { message } from "antd";
import { useEffect } from "react";


function ProtectedRoute({children}){
    const {user} = useSelector((state)=>state.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    

    const getcurrentUser = async () =>{
        console.log("Calling GetCurrentUser API");
        try {
            const response = await GetCurrentUser();
            console.log("API Response:", response); // This logs the response to the console
    
            if(response.success){
                dispatch(SetUser(response.data));
            }
            else{
                dispatch(SetUser(null));
                message.error(response.message);
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.log("API Error:", error); // This logs any errors to the console
            dispatch(SetUser(null));
            message.error(error.message);
        }
    }
    

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getcurrentUser();
        }
        else{
            navigate('/login')
        }
    },[])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

  return(
    user &&(
        <div>
             <header className="bg-blue-500 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        {user && <span className="text-white text-lg font-bold">Welcome {user.name}</span>}
      </div>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-500 px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none hover:bg-blue-200 transition duration-300"
      >
        Logout
      </button>
    </header>
    <div>{children}</div>
        </div>
    )
  )
}


export default ProtectedRoute