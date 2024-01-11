import App from '../App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import { Main } from 'pages/Main';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [{ index: true, element: <Main /> }],
  },
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <SignUp /> },
]);

export const Providers = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
