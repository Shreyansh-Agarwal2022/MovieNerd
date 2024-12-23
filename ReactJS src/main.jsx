import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Search from './Search.jsx';
import Category from './Category.jsx';
import Movie from './Movie.jsx';
import Profile from './Profile.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/category",
    element: <Category />
  },
  {
    path: "/movie",
    element: <Movie />
  },
  {
    path: "/profile",
    element: <Profile />
  }
  ,
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
