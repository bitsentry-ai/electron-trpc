import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ipcLink } from 'electron-trpc/renderer';
import superjson from 'superjson';
import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppRouter } from '../electron/api';

const trpcReact = createTRPCReact<AppRouter>();

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [ipcLink()],
      transformer: superjson,
    })
  );

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HelloElectron />
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}

function HelloElectron() {
  const { data } = trpcReact.greeting.useQuery({ name: 'Electron' });
  trpcReact.subscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data);
    },
  });

  if (!data) {
    return null;
  }

  return <div>{data.text}</div>;
}

const root = document.getElementById('react-root');

if (!root) {
  throw new Error('React root element is missing.');
}

createRoot(root).render(<App />);
