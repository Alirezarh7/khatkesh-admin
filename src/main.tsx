import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SnackbarProvider} from "notistack";


const root = createRoot(document.getElementById('root')!);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    },
  },
});
  root.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SnackbarProvider autoHideDuration={4000}
                          iconVariant={{
                            success: '✅',
                            error: '❌',
                            warning: '⚠️',
                            info: '📢',
                          }}
        />
          {/*@ts-ignore*/}
        <App/>
      </BrowserRouter>
    </QueryClientProvider>
  );

