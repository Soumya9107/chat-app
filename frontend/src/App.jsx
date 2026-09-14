import { ThemeProvider } from './context/ThemeContext';
import { WallpaperProvider } from './context/WallpaperContext';
import { Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from '@clerk/react';

function App() {

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Router>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
          <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/chat"} replace />} />

        </Router>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
