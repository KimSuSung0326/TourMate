import App from '../App';
import RTKStore from '../redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import { Main } from 'pages/Main';
import { MyPage } from 'pages/MyPage';
import { Provider as RTKProvider } from 'react-redux';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      { index: true, element: <Main /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <SignUp /> },
]);

export const Providers = () => {
  return (
    <RTKProvider store={RTKStore}>
      <RouterProvider router={router}></RouterProvider>
    </RTKProvider>
  );
};
