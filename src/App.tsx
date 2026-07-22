import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BrowserRouterDom from './router';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 3000,

      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouterDom />
    </QueryClientProvider>
  );
};

export default App;
