import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{     // destructuring props.children => children
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    //register user

    const registerUser = async (formData)=>{
       
        const obj = {
           method: 'POST',
           headers: {                                // requirement of json server
               'Content-Type':'application/json'     // optional
           },
           body:JSON.stringify(formData)   // object to json
        }

        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`,{method: 'GET'});

        if(checkUser.ok){
           const user = await checkUser.json();     // readable stream to js object
           console.log(user);
           if(user.length>0){
               setMessage("User already exists");
           }
           else{
               
               const response = await fetch('http://localhost:5000/users',obj);
               console.log(response);
      
               if(response.status === 201){
                   const user = await  response.json();                // readable stream to js object
                   localStorage.setItem('todouser',JSON.stringify(user));  // saved in local storage
                   setUser(user);
                   setMessage("User created Successfully....Redirecting");
                   setTimeout(()=>{
                       navigate('/task-list');
                   }, 3000);
               } 
               else{
                  setMessage("Something went wrong");
               }
           }
        }

        //fetch() method:- api request using fetch()

       
   }

   // login user

   const loginUser = async (formData)=>{
    const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`,{method: 'GET'});
    console.log(response);
    if(response.ok){
      const user = await response.json(); 
      console.log(user);
     if(user.length>0){
        // create token with help of jwt library and save it in local storage in real world projects
        localStorage.setItem('todouser',JSON.stringify(user[0]));  // saved in local storage
        setUser(user[0]);
        setMessage("Logged in successfully....redirecting")
        setTimeout(()=>{
            navigate('/task-list');
        }, 3000);
      
     }
     else{
        setMessage("Incorrect details")
      }
   }
   else{
    setMessage("Something went wrong")
  }

}

const logout = ()=>{
    setUser(null);
    localStorage.removeItem('todouser');
    navigate('/');
}

// check if user is already logged in

const getUser = async (email) => {
    const response = await fetch(`http://localhost:5000/users?email=${email}`,{method: 'GET'})
    if(response.ok){
        const userData = await response.json();
        if(userData.length>0){
            setUser(userData[0]);
        }else{
            localStorage.removeItem('todouser');
        }
    }
    else{
         console.log("Somthing went wrong");
    }
   
}

 //useEffect();
 useEffect(()=> { 
    const localData = localStorage.getItem('todouser');
    if(localData){
        let localUser = JSON.parse(localData);
        getUser(localUser.email);
    }
   
  }, [])



    return(
        <AuthContext.Provider value={{
             registerUser,                  // register: registerUser
             loginUser,
             message,
             user,
             setMessage,
             logout
            
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

