import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import axios from 'axios';
import ProtectedRouteComponent from './components/ProtectedRouteComponent.js';
import VerifyEmail from './pages/VerifyEmail.jsx';
import Mfa from './pages/Mfa.jsx';
import Settings from './pages/Settings.jsx';
import Transactions from './pages/Transactions.jsx';

axios.defaults.baseURL = 'http://localhost:8101/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json';

const routes = [
  {
    path: '/',
    element: <ProtectedRouteComponent><App /></ProtectedRouteComponent>,
  },
  {
    path: '/verify-email',
    element: <ProtectedRouteComponent><VerifyEmail /></ProtectedRouteComponent>,
  },
  {
    path: '/mfa',
    element: <ProtectedRouteComponent><Mfa /></ProtectedRouteComponent>,
  },
  {
    path: '/settings',
    element: <ProtectedRouteComponent><Settings /></ProtectedRouteComponent>,
  },
  {
    path: '/transactions',
    element: <ProtectedRouteComponent><Transactions /></ProtectedRouteComponent>,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
];

let router = createBrowserRouter(routes);



ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
