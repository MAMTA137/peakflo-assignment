import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext';
import Board from './components/Board';
import TaskDetails from './components/TaskDetails';

const App = () => {
  return (
    <BoardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Router>
    </BoardProvider>
  );
};

export default App;
