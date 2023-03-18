import React from 'react';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';

const withQueryClient = Cmp => props => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Cmp {...props} />
    </QueryClientProvider>
  );
};

export default withQueryClient;
