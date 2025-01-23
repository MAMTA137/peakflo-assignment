import { createContext, useState, ReactNode } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage';

interface Task { //interface-Defines the shape of a task object, ensuring every task has
  id: string;
  title: string;
  description: string;
  status: string;
}

interface BoardContextType {
  tasks: Task[];
  statuses: string[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  addStatus: (status: string) => void;
}

const initialTasks = getFromLocalStorage('tasks') || [];
const initialStatuses = getFromLocalStorage('statuses') || ['Not Started', 'In Progress', 'Completed'];

export const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [statuses, setStatuses] = useState<string[]>(initialStatuses);

  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveToLocalStorage('tasks', updatedTasks);
  };


const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  
  const deleteTask = (id: string) => {
    const tasksFromStorage = localStorage.getItem('tasks');
    
    if (tasksFromStorage) {
      const tasks = JSON.parse(tasksFromStorage);
  
      const updatedTasks = tasks.filter((task: { id: string }) => task.id !== id);
  
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
      setTasks(updatedTasks);
    }
  };
  
  

  const addStatus = (status: string) => {
    const updatedStatuses = [...statuses, status];
    setStatuses(updatedStatuses);
    saveToLocalStorage('statuses', updatedStatuses);
  };

  return (
    <BoardContext.Provider value={{ tasks, statuses, addTask, updateTask, deleteTask, addStatus }}>
      {children}
    </BoardContext.Provider>
  );
};
