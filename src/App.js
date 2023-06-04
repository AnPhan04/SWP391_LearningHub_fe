import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import FlipCard from './pages/Flashcard/FlipCard';
import CardList from './pages/Flashcard/CardList';
import AccountSetting from './pages/AccountSetting';
import UserList from './pages/UserList';
import UserDashBoard from './pages/UserDashboard';
import Header from './components/layout/Header';
import FlashcardDashBoard from './pages/FlashcardDashBoard';
import ChangePassword from './pages/ChangePassword';
function App() {
  return (
    <div className="App">
      {/* <UserDashBoard />  */}
      {/* <UserDashBoard /> */}
      <UserList></UserList>
      {/* <SignIn/> */}
      {/* <AccountSetting /> */}
      {/* <Header></Header>*/}
      {/* <FlashcardDashBoard></FlashcardDashBoard>  */}
      {/* <ChangePassword></ChangePassword> */}
    </div>
  );
}

export default App;
