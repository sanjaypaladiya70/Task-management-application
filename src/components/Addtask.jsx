import React from 'react'
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const Addtask = ({setNum , Num}) => {


    const [Task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do', 
    assignedTo: '',
    priority: 'Low' 
    
    });

    const handleChange = (e)=>{
        setTask({...Task , [e.target.name]: e.target.value});
      }

      const submitTask = async (e) => {
          
          const response = await fetch('http://localhost:3000/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Task)
          });
    
          setNum(Num + 1);
            setTask({
              title: '',
              description: '',
              dueDate: '',
              status: 'To Do',
              assignedTo: '',
              priority: 'Low'
            });
          
      };

  return (
    <div className='flex justify-center my-10'>
    <div >
      <div className='my-4 text-xl'>Add new task</div>
        <input type="text" name='title' placeholder='Title of new Task' className='w-80' value={Task.title} onChange={handleChange} required />  <br />
      <input type="text" name='description' placeholder='Description of new Task' className='w-[60vw] my-2' value={Task.description} onChange={handleChange} required />  <br />
      <input type="text" name='assignedTo' placeholder='Assign to' className='w-60 my-2' value={Task.assignedTo} onChange={handleChange} required />  <br />
      <input type="text" name="dueDate" placeholder='Due date' className='my-2' value={Task.dueDate} onChange={handleChange} />  <br />
      
      <label className=''>Status:</label>
        <select className='mx-1' name="status" value={Task.status} onChange={handleChange} required>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <span className='mx-2'></span>

      <label className=''>Priority</label>
      <select className='mx-1' name="priority" value={Task.priority} onChange={handleChange} required>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <br />
      <button className='py-1 px-3 rounded-md bg-green-300 my-3' onClick={submitTask}>Add task</button>

    </div>

    </div>
  )
}

export default Addtask
