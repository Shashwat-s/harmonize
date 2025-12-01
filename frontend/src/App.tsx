import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { MainLayout } from './components/MainLayout';
import FeedPage from './pages/FeedPage';
import AlliesPage from './pages/AlliesPage';
import MessagesPage from './pages/MessagesPage';
import Survey from './pages/Survey';
import { ChatTab } from './components/ChatTab'; // Temporary until ChatPage is created
import { ProfileTab } from './components/ProfileTab'; // Temporary until ProfilePage is created
import { JourneyTab } from './components/JourneyTab'; // Temporary until JourneyPage is created
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/survey" element={<Survey />} />

          {/* Main App Routes wrapped in Layout */}
          <Route element={<MainLayout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/allies" element={<AlliesPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/journey" element={<JourneyTab />} />
            <Route path="/chat" element={<ChatTab />} />
            <Route path="/profile" element={<ProfileTab />} />
            <Route path="/" element={<Navigate to="/feed" replace />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
