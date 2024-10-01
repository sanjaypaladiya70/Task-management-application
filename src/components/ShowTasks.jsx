import { useEffect, useState } from 'react'

import { MdDelete } from "react-icons/md";
import Addtask from './Addtask';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { v4 as uuidv4 } from 'uuid';
// import { createBrowserRouter } from 'react-router-dom';

function ShowTasks() {

  const [Tasks, setTasks] = useState([]);
  const [Num, setNum] = useState(0)

  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/');
        const taskArr = await response.json();
        console.log(taskArr)
        setTasks(taskArr);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, [Num]);

  const deleteTask = async(_id) =>{
    try{
      const response = await fetch(`http://localhost:3000/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: _id }),
      });

      const result = await response.json();
      if (result.success) {
        setTasks(Tasks.filter(task => task._id !== _id));
      } else {
        console.error('Failed to delete task');
      }

    } catch(err){
      console.log(err);
    }

    setNum(Num+1);
  }

  const filteredTasks = Tasks.filter((task) => {
    return (
      (selectedPriority === '' || task.priority === selectedPriority) &&
      (selectedStatus === '' || task.status === selectedStatus)
    );
  });
  

  return (
    <>
      <Navbar/>
      <Addtask setNum={setNum} Num={Num}/>
      {/* <div className='flex-col mx-14 bg-yellow-400 w-[90%] min-h-[20vh] my-3'>
        <div className=''>Title</div>
        <div><span>Priority:High</span><span className='px-3'>status:todo</span><span>due date: 14 Aug</span><span className='px-3'>Assigned to: Sanjay</span></div>
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro earum nulla at minus aliquam modi ducimus, minima maxime pariatur ab, possimus incidunt quibusdam cupiditate recusandae! Facilis laudantium hic eveniet ab laboriosam suscipit commodi temporibus beatae amet vitae soluta iusto architecto quidem, al</div>
      </div>
      
      {Tasks.map((t)=>{
        return <div key = {t._id}>
          <div className='flex-col mx-14 bg-gray-400 w-[90%] min-h-[20vh] my-3'>
        <div className=''>{t.title}</div>
        <div><span>Priority:{t.priority}</span><span className='px-3'>status:{t.status}</span><span>due date: {t.dueDate}</span><span className='px-3'>Assigned to: {t.assignedTo}</span></div>
        <div>{t.description}</div>
        <MdDelete onClick={()=>{deleteTask(t._id)}} />
        <Link className='bg-yellow-300' to={`/update/${t._id}`}>Update</Link>
      </div>
        </div>
      })} */}

      <div className='text-center text-xl my-3'>Tasks assigned to you</div>

    <div className='flex justify-center'>
    <div className="filter-section">
        <div className="filter-controls">
          <select 
            value={selectedPriority} 
            onChange={(e) => setSelectedPriority(e.target.value)} 
            className="filter-select mx-1"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)} 
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

    </div>


      {/* Render Filtered Tasks */}
      {filteredTasks.map((t) => {
        return (
          <div className='' key={t._id}>
            <div className='task p-2 flex-col mx-14 w-[90%] min-h-[20vh] my-3'>
              <div className='text-lg'>{t.title}</div>
              <div>
                <span>Priority: {t.priority}</span>
                <span className='px-3'>Status: {t.status}</span>
                <span>Due Date: {t.dueDate}</span>
                <span className='px-3'>Assigned to: {t.assignedTo}</span>
              </div>
              <div>{t.description}</div>
              <div className='flex my-1'>
              <button className='py-1 px-3 rounded-md mx-4 bg-green-300' onClick={() => { deleteTask(t._id) }} >Delete</button>
              <Link className='bg-green-300 py-1 px-3 rounded-md ' to={`/update/${t._id}`}>Update</Link>
              </div>
            </div>
          </div>
        );
      })}

      
    </>
  )
}

export default ShowTasks
