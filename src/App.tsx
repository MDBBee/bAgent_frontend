import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Error from './components/Error';
import GenerateChallenges from './pages/GenerateChallenges';
import ErrorElement from './components/ErrorElement';
import ChallengesHistory from './pages/ChallengesHistory';
import SingleChallenge from './components/SingleChallenge';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <GenerateChallenges />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'history',
        element: <ChallengesHistory />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'history/:id',
        element: <SingleChallenge />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "/login",
    element: 
  },
  {}
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
