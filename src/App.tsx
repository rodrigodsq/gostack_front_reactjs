import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
// import SignIn from './pages/SignIn';
import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
