import React, { useContext, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskContext from '../context/TaskContext';
import { Link } from 'react-router-dom';
import { formatDate } from '../helper';

function CreateTask(props) { 
    const { latestTasks, recentTasks } = useContext(TaskContext);
    const [isUpdate, setIsUpdate] = useState(false);
  

    const handleEdit = () => {    // to ask return ?
         setIsUpdate(true);
    }

    return (
        <div className='container-fluid h-100'>
             <div className='row h-100'>
                 <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center h-100
                   bg-primary text-white'>
                       <TaskForm isUpdate = {isUpdate} data={latestTasks} setIsUpdate={setIsUpdate}/>
                 </div>
             

                 <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center h-100'>
                    
                    <div className='card bg-primary mb-3 text-white w-75'>
                        <div className='card-body'>
                            <div className='d-flex align-items-center'>
                                <h3>Latest Task</h3>
                                <button className='btn btn-info ms-auto' onClick={handleEdit}>Edit</button>
                                
                            </div>
                            <div className='py-2'>
                                    <h5>{latestTasks?.title}</h5>
                                    <p>{latestTasks?.description}</p>
                                    <div className='d-flex align-items-center'>
                                        <p>Modified: {formatDate(latestTasks?.modified)}</p>
                                        <p className='ms-auto'>Due on: {formatDate(latestTasks?.duedate)}</p>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className='card bg-primary mb-3 text-white w-75'>
                        <div className='card-body'>
                            <div className='d-flex align-items-center'>
                                <h3>Recent Tasks</h3>

                                
                            </div>
                            {
                                recentTasks!= null ? 
                                recentTasks.map((task)=>{
                                    return (
                                        <div className='d-flex border border-warning p-2'>
                                            <p>{task.title}</p>
                                            <p className='ms-auto'>{formatDate(task.duedate)}</p>
                                        </div>
                                        )
                                }) : ""
                            }
                            <Link className='text-info d-block mt-3' to='/task-list'>View All</Link>
                        </div>
                    </div>
                         
                      
                 </div>

             </div>        
        </div>
    );
}

export default CreateTask;