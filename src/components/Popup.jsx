import React, { useRef } from 'react';
import TaskForm from './TaskForm';
import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { formatDate } from '../helper';

function Popup(props) {
    const {type,data} = props;
    const closeBtn = useRef( null);
    // console.log(closeBtn.current)
    const { deleteTask } = useContext(TaskContext);

    return (
        <div className="modal" tabindex="-1" id='task-modal'>
          <div className="modal-dialog">
        {
          type ?
        <div className="modal-content bg-primary text-white">
         <div className="modal-header">
           <h5 className="modal-title">{type}</h5>
        <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
          {
            type === "View" ? 
            <div className='py-2'>
                                    <h5>{data?.title}</h5>
                                    <p>{data?.description}</p>
                                    <div className='d-flex align-items-center'>
                                        <p>Modified: {formatDate(data?.modified)}</p>
                                        <p className='ms-auto'>Due on: {formatDate(data?.duedate)}</p>
                                    </div>
                            </div> 
            : type === "Edit" ?  
            <div>
               <TaskForm closeBtn={closeBtn} data={data} isUpdate={true} isPopup={true}/>
            </div> : 
            <div>
              <p>Are you sure? you want to delete this task</p>
              <div className='d-flex align-items-center'>
                <button onClick={() => {deleteTask(data?.id)}} className='btn btn-danger ms-auto' data-bs-dismiss="modal">Yes</button>
                <button className='btn btn-warning ms-2' data-bs-dismiss="modal">No</button>               
              </div>
            </div>
          }
      </div>
        </div> : ""
        }
  </div>
</div>
    );
}

export default Popup;