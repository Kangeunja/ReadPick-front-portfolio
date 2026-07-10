import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BrowserRouterDom from './router';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
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
