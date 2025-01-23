import { useContext } from 'react';
import { BoardContext } from '../context/BoardContext';
import Column from './Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const Board = () => {
  const { tasks, statuses, updateTask } = useContext(BoardContext)!;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const updatedTask = tasks.find((task) => task.id === draggableId);
    if (updatedTask) {
      updateTask({ ...updatedTask, status: destination.droppableId });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '1rem',justifyContent:"space-between", padding: '0.5rem' }}>
        {statuses.map((status) => (
          <Column key={status} status={status} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
