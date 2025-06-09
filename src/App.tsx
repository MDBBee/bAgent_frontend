import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import Error from './components/Error';
import GenerateChallenges from './pages/GenerateChallenges';
import ErrorElement from './components/ErrorElement';
import ChallengesHistory from './pages/ChallengesHistory';
import SingleChallenge from './components/SingleChallenge';
import ClerkProviderContext from './auth/ClerkProvider';
import Login from './auth/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

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
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <ClerkProviderContext>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />;
      </QueryClientProvider>
    </ClerkProviderContext>
  );
}

export default App;
