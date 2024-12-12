import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from "./components/ui/toaster"
import LoginPage from './pages/LoginPage';
import PreferencesPage from './pages/PreferencesPage';
import RecommendationsPage from './pages/RecommendationsPage';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

