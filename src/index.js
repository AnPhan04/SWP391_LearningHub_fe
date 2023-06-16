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
  </React.StrictMode>
);
