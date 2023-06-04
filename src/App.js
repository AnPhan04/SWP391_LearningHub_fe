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

function App() {
  return (
    <div className="App">
      {/* <ResetPassword/> */}
      <SignIn />
      
    </div>
  );
}

export default App;
