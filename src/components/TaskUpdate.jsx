import React from 'react'

const TaskUpdate = () => {
  return (
    <div>
      <div className='flex-col mx-14 bg-gray-400 w-[90%] min-h-[20vh] my-3'>
        <div className=''>{t.title}</div>
        <div><span>Priority:{t.priority}</span><span className='px-3'>status:{t.status}</span><span>due date: {t.dueDate}</span><span className='px-3'>Assigned to: {t.assignedTo}</span></div>
        <div>{t.description}</div>
        <MdDelete onClick={()=>{deleteTask(t._id)}} />
      </div>
    </div>
  )
}

export default TaskUpdate
