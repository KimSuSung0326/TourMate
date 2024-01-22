import App from '../App';
import RTKStore from '../redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import { Main } from 'pages/Main';
import { MyPage } from 'pages/MyPage';
import { MyTravel } from 'pages/MyTravel';
import { Provider as RTKProvider } from 'react-redux';
import { SharingTravel } from 'pages/SharingTravel';
import { PlanTravel } from 'pages/PlanTravel';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      { index: true, element: <Main /> },
      { path: 'mypage', element: <MyPage /> },
      { path: '/mytravel', element: <MyTravel /> },
      { path: '/sharetravel', element: <SharingTravel /> },
      { path: '/plantravel', element: <PlanTravel /> },
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
