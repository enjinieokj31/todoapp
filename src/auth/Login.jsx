import React, { useContext, useEffect, useState } from 'react';
import AuthContext from './AuthContext';

function Login(props) {

   const {loginUser, message, setMessage} = useContext(AuthContext);

    const [formData, setFormData] = useState(null);

    useEffect(()=>{
        setMessage("");
    },[])
    

    const handleChange = (e)=>{
        const{name,value} = e.target;
        setFormData((prev)=>({
          
              ...prev,
              [name]: value
           }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();   // so that form do not auto submit
        loginUser(formData);

    }

    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='email' className='form-control' name='email' onChange={handleChange}/>
            </div>

            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' className='form-control' name='password' onChange={handleChange}/>
            </div>

            <p>{message}</p>
            <button className='btn btn-primary' onClick={handleSubmit}>Login</button>
        </form>
    );
}

export default Login;