import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();



export const TaskProvider = ({ children })=>{    // children by default property
    
    const {setMessage, user} = useContext(AuthContext);
    const [allTasks, setAllTasks] = useState(null);
    const [recentTasks, setRecentTasks] = useState(null);
    const [latestTasks, setLatestTasks] = useState(null);

    // create task
    const createTask = async(formData) =>{
        const config = {
            method: 'POST',
            headers:{
                'Content-type':'application/json' 
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch('http://localhost:5000/tasks',config);
        if(response.status === 201){
           setMessage('Task created successfully');
           getAllTasks(user.id);
        }
        else{
            setMessage('Something went wrong');
        }
    }

    // to get the tasks
    const getAllTasks = async (id) => {
         const response = await fetch(`http://localhost:5000/tasks?userId=${id}`,{method: 'GET'});
         if(response.ok){
            const tasks = await response.json();
            setAllTasks(tasks);
            const recent = tasks.slice(-3);     
            setRecentTasks(recent);
            const latest = tasks[tasks.length-1]
            setLatestTasks(latest);
         }else{
            console.log("Something went wrong");
         }
    }

    const updateTask = async(formData) =>{
        const config = {
            method: 'PATCH',
            headers:{
                'Content-type':'application/json' 
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(`http://localhost:5000/tasks/${formData.id}`,config);
        if(response.status === 200){
           setMessage('Task updated successfully');
           getAllTasks(user.id);
        }
        else{
            setMessage('Something went wrong');
        }
    }


    const deleteTask = async(id) =>{
       

        const response = await fetch(`http://localhost:5000/tasks/${id}`,{method: "DELETE"});
        if(response.status === 200){
           setMessage('Task deleted successfully');
           getAllTasks(user.id);
        }
        else{
            setMessage('Something went wrong');
        }
    }

    useEffect(()=>{
        if(user){
            getAllTasks(user.id)
        }
    },[user])

    return(
        <TaskContext.Provider value={{
            createTask,
            allTasks,
            latestTasks,
            recentTasks,
            updateTask,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}


export default TaskContext;