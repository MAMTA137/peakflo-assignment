import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/task/${task.id}`);
  };

  return (
   
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow:' 0px 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          <p style={{fontWeight:"normal", border:'1px solid rgb(222, 220, 220)',borderRadius: '5px', padding:"8px" }}>{task.title}</p>
          {/* <p>{task.description}</p> */}
        </div>
      )}
    </Draggable>
   
  );
};

export default TaskCard;
