import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './services/Routes'
import Kanban from './components/Kanban/Kanban';
import NoteScreen from './pages/NoteScreen/NoteScreen';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    {/* <Kanban/> */}
     {/* <NoteScreen/>  */}
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
