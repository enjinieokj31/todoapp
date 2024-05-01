import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const getUser = async (email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`,{method: 'GET'})
        if(response.ok){
            const userData = await response.json();
            if(userData.length>0){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
                localStorage.removeItem('todouser');
                navigate('/');
            }
        }
        else{
             console.log("Somthing went wrong");
        }
       
    }

    useEffect(()=> { 
        const localData = localStorage.getItem('todouser');
        if(localData){
            let localUser = JSON.parse(localData);
            getUser(localUser.email);
        }
       
      }, [])

    return (
       isLoggedIn ? children : null
    );
}

export default ProtectedRoute;