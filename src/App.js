import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './services/Routes';

function App() {
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
