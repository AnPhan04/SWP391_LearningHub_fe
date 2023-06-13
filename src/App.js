import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import FlipCard from './pages/Flashcard/FlipCard';
import CardList from './pages/Flashcard/CardList';
import AccountSetting from './pages/AccountSetting';
import UserList from './pages/UserList';
import UserDashBoard from './pages/UserDashboard';
import Header from './components/layout/Header';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FlashcardDashBoard from './pages/FlashcardDashBoard';
import SignUp from './pages/SignUp';
import CreateSet from './pages/Flashcard/CreateSet';

function App() {
  return (
    
    <>
    <FlipCard></FlipCard>
    </>

    // <UserList />
  );
}

export default App;
