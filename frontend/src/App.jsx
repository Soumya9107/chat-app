import { ThemeProvider } from './context/ThemeContext';
import { WallpaperProvider } from './context/WallpaperContext';
import { Navigate, Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import { useAuth } from '@clerk/react';
import PageLoader from './components/PageLoader';
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from "react";
import { axiosInstance } from './lib/axios';

import {Toaster} from 'react-hot-toast';

function App() {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  // 1) Attach the Clerk token to every request (must come first)
  useEffect(() => {
    const id = axiosInstance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return () => axiosInstance.interceptors.request.eject(id);
  }, [getToken]);

  // 2) Then check auth
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth();
    else clearAuth();
  }, [checkAuth, clearAuth, isSignedIn, isLoaded]);

  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader />;
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
          <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} />

        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
