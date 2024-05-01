import React, { useContext, useEffect, useReducer, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Popup from '../components/Popup';
import { formatDate } from '../helper/index.js';

const reducer = (state,action)=>{
    switch(action.type){
       case "view": return {type: "View", data: action.payload};
       case "edit": return {type: "Edit", data: action.payload};
       case "delete": return {type: "Delete", data: action.payload};
       default: return state;
    }
}

function TaskList(props) {

    const { allTasks } = useContext(TaskContext);
    const [state, dispatch] = useReducer(reducer,null);
    const [taskArray, setTaskArray] = useState(null);

    useEffect(()=>{
        if(allTasks){
            setTaskArray(allTasks)
        }
    },[allTasks])

    const handleSearch = (e) => {
        let {value} = e.target;
        let filteredArray = allTasks.filter((item)=>{
            return item.title.toLowerCase().includes(value.toLowerCase());
        })
       // console.log(filteredArray)
       setTaskArray(filteredArray);
    }
    return (
        <div className='container'>
           <div className='bg-primary p-4 mt-5 text-white'>
                 <div className='d-flex'>
                    <h3>Task List</h3>
                    <Link to='/create-task' className='btn btn-info ms-auto'>Create Task</Link>
                 </div>

                 <div className='py-3'>
                     <div className='mb-2'>
                        <input type='text' className='form-control' onChange={handleSearch} />
                     </div>
                    <div className='row border border-white py-2'>
                        <div className='col-lg-1'>Sr.No.</div>
                        <div className='col-lg-2'>Title</div>
                        <div className='col-lg-5'>Description</div>
                        <div className='col-lg-2'>Due Date</div>
                        <div className='col-lg-2'>Actions</div>
                    </div>
                    {
                       taskArray ? 
                       taskArray.map((task)=>(
                        <div key={task.id} className='row border border-white py-2'>
                        <div className='col-lg-1'>{task.id}</div>
                        <div className='col-lg-2'>{task.title}</div>
                        <div className='col-lg-5'>{task.description}</div>
                        <div className='col-lg-2'>{formatDate(task.duedate)}</div>
                        <div className='col-lg-2'>
                            <span className='px-2' data-bs-toggle='modal' data-bs-target='#task-modal' onClick={()=> {dispatch({type: "view",payload: task})}}>
                                <FontAwesomeIcon icon={faEye} />
                            </span>
                            <span className='px-2'  data-bs-toggle='modal' data-bs-target='#task-modal' onClick={()=> {dispatch({type: "edit",payload: task})}}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </span>
                            <span className='px-2'  data-bs-toggle='modal' data-bs-target='#task-modal' onClick={()=> {dispatch({type: "delete",payload: task})}}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        </div>
                    </div>
                       )) : <p>No tasks to show</p>
                    }
                 </div>
           </div>
           <Popup type={state?.type} data={state?.data}/>
        </div>
    );
}

export default TaskList;