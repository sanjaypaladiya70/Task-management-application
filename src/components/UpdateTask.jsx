import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateTask() {
  const { id } = useParams(); // Get the task ID from the URL
  const [task, setTask] = useState(null); // Set task to null initially
  const navigate = useNavigate();


  // Fetch the existing task details when the component loads
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/task/${id}`);
        const data = await response.json();
        setTask(data); // Set fetched task data to state
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  // Update the task when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const result = await response.json();
      if (result.success) {
        alert('Task updated successfully');
        navigate('/'); // Navigate back to the home page
      } else {
        console.error('Error updating task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  
  if (!task) {
    return <div>Loading...</div>; // Show loading while the task is being fetched
  }

  return (
    <div className='flex-col mx-14 bg-gray-400 w-[90%] min-h-[20vh] my-3'>
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          value={task.title}
          onChange={handleChange}
          placeholder='Title'
        />
        <input
          type='text'
          name='description'
          value={task.description}
          onChange={handleChange}
          placeholder='Description'
        />
        <input
          type='text'
          name='priority'
          value={task.priority}
          onChange={handleChange}
          placeholder='Priority'
        />
        <input
          type='text'
          name='status'
          value={task.status}
          onChange={handleChange}
          placeholder='Status'
        />
        <input
          type='text'
          name='assignedTo'
          value={task.assignedTo}
          onChange={handleChange}
          placeholder='Assigned To'
        />
        <input
          type='text'
          name='dueDate'
          value={task.dueDate}
          onChange={handleChange}
        />
        <button type='submit' className='bg-yellow-700'>Update Task</button>
      </form>
    </div>
  );
}

export default UpdateTask;
