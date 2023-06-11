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
    // <BrowserRouter>
    //   <div className="App">
    //     <Switch>
    //       <Route path="/login" component={SignIn} />
    //       <Route path="/signup" component={SignUp} />
    //       <Route path="/flipcard" component={FlipCard} />
    //       <Route path="/cardlist" component={CardList} />
    //       <Route path="/accountsetting" component={AccountSetting} />
    //       <Route path="/userlist" component={UserList} />
    //       <Route path="/changepw" component={ChangePassword} />
    //       <Route path="/forgotpassword" component={ResetPassword} />
    //       <Route path="/flashcard" component={FlashcardDashBoard} />
    //       <Route exact path="/" component={UserDashBoard} />
    //     </Switch>
    //   </div>
    // </BrowserRouter>
    <CreateSet />
    // <FlipCard />
    // <UserList />
  );
}

export default App;
