import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home';
import Reservations from '../pages/reservations';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/reservations/:id',
        element: <Reservations />,
      },
    ],
  },
]);
