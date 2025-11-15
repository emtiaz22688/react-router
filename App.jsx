import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './layout/Main';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import About from './components/About/About';
import SignUp from './components/SignUp/SignUp';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/sign-in', element: <SignIn /> },
        { path: '/sign-up', element: <SignUp /> }, // 🔥 ঠিক আছে
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
