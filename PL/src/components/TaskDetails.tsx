import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import { TextField, Button, MenuItem } from '@mui/material';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask, statuses } = useContext(BoardContext)!;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return <h1>Task not found</h1>;
  }

  const [taskData, setTaskData] = useState(task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    updateTask(taskData);
    navigate('/');
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Edit Task</h1>
      <TextField
        label="Title"
        name="title"
        value={taskData.title}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Description"
        name="description"
        value={taskData.description}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
      />
      <TextField
        select
        label="Status"
        name="status"
        value={taskData.status}
        onChange={handleInputChange}
        fullWidth
        margin="dense"
      >
        {statuses.map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
      <div style={{ marginTop: '1rem' }}>
        <Button variant="contained" onClick={handleSave} style={{ marginRight: '1rem',backgroundColor:"#960F1D" }}>
          Save
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;
