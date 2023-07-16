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
import Kanban from './components/Kanban/Kanban';
import Flashcard from './components/MUIComponent/Flashcard/Flashcard';
import FlashcardSet from './components/MUIComponent/Flashcard/FlashcardSet';
/* const flashcard = [{
  term: "flashcard 1",
  definition: "1"
}, {
  term: "flashcard 2",
  definition: "2"
}]; */
const App = () => {
  return (
    
    <TaskManagementDashBoard />
  );
};

export default App;
