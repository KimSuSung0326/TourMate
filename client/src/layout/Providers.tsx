import App from '../App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    // children: [{ index: true, element: <Home /> }],
  },
  // { path: 'login', element:  },
  // { path: 'signup', element:  },
]);

export const Providers = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
