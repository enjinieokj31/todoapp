import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';


function TaskForm(props) {

    const init = {
        title: "",
        description: "",
        duedate: ""
    }
    const {isUpdate, data, setIsUpdate, isPopup, closeBtn} = props;   //  props is only read only data
    const { createTask, updateTask } = useContext(TaskContext);
    const {message, setMessage, user} = useContext(AuthContext);
    const [formData, setFormData] = useState(init);

  

    const handleChange = (e)=>{
        const {value, name} = e.target;
        setFormData((prev)=>(
            {
                ...prev,
                [name]: value,
                userId: user?.id,    // ? => optional
                modified: Date(),  
                role: 'user'
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(formData);
    }

    useEffect(()=>{
        if(isUpdate && data){
            setFormData(data);
        }
    },[isUpdate, data])

    useEffect(()=>{
        setMessage("");
    },[]) 

    const handleCancel = (e)=>{
        e.preventDefault();          
        setFormData(init);
        if(isPopup){               // in case of task list 
          closeBtn.current.click();
        }else{
            setIsUpdate(false);      // in case of create task
        }
          
    }

    const handleUpdate = (e)=>{
        e.preventDefault();
        updateTask(formData);
    }

    return (
        <div className='w-50'>
            <h3 className='text-white'>{isUpdate ? 'Update Task' : 'Create Task'}</h3>
            <div className='card'>
                <div className='card-body'>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label'>Title</label>
                            <input type='text' name='title' className='form-control' value={formData?.title} onChange={handleChange}/>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea name='description' className='form-control' value={formData?.description} onChange={handleChange}></textarea>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Due Date</label>
                            <input type='datetime-local' name='duedate' className='form-control' value={formData?.duedate} onChange={handleChange}/>
                        </div>
                        <h3>{message}</h3>
                        {
                          isUpdate ?  
                           <>
                             <button className='btn btn-primary' onClick={handleUpdate}>Update Task</button>
                             <button className='btn btn-warning ms-2' onClick={handleCancel}>Cancel</button>
                           </> 
                           :
                           <button className='btn btn-primary' onClick={handleSubmit}>Create Task</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;