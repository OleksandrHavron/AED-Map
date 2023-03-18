import React from 'react';
import { useEffect, createContext } from 'react';

import { authProvider } from 'shared/auth';
import { BASE_URL } from 'shared/consts/url';

const AuthContext = createContext();

const withConfiguredAuth = Cmp => props => {
  const oConfig = {
    baseUrl:
      BASE_URL
  };

  useEffect(() => {
    authProvider.configure(oConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={authProvider}>
      <Cmp {...props} />
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default withConfiguredAuth;
