import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import BrowserRouterDom from './router';

import './index.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouterDom />
    </QueryClientProvider>
  );
};

export default App;
