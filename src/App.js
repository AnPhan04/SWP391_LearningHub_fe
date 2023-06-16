import './App.css';
import { RouterProvider, BrowserRouter, Route } from 'react-router-dom';
import routes from './services/Routes';
import FeatureList from './pages/Admin/FeatureList';
import UserDashBoard from './pages/User/UserDashboard';
import SignIn from './pages/Auth/SignIn';
import RecentlyVisited from './components/MUIComponent/RecentlyVisited';
import FlashcardDashBoard from './pages/Flashcard/FlashcardDashBoard';
import TaskManagementDashBoard from './pages/Task/TaskManagementDashboard';
import NavBar from './components/layout/NavBar';
import AddTask from './pages/Task/AddTask';

const App = () => {
  return (
    // <TaskManagementDashBoard />
    <AddTask />
    
  );
};

export default App;
