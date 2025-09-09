import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateSurvey from './pages/CreateSurvey';
import SurveyList from './pages/SurveyList';
import SurveyParticipate from './pages/SurveyParticipate';
import SurveyDetail from './pages/SurveyDetail';
import SurveyResponseDetail from './pages/SurveyResponseDetail';
import EditSurveyResponse from './pages/EditSurveyResponse';
import Rewards from './pages/Rewards';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminSurveys from './pages/admin/Surveys';
import AdminRewards from './pages/admin/Rewards';
import AdminResponseReview from './pages/admin/ResponseReview';
import AdminFinance from './pages/admin/Finance';
import AdminCancellationRequests from './pages/admin/CancellationRequests';
import AdminWithdrawalRequests from './pages/admin/WithdrawalRequests';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('userUpdate', handleUserUpdate);
    
    return () => {
      window.removeEventListener('userUpdate', handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/surveys/create" element={<CreateSurvey />} />
            <Route path="/surveys/:id" element={<SurveyDetail />} />
            <Route path="/surveys/:id/participate" element={<SurveyParticipate />} />
            <Route path="/surveys/:id/edit-response" element={<EditSurveyResponse />} />
            <Route path="/surveys/:id/responses" element={<SurveyResponseDetail />} />
            <Route path="/surveys" element={<SurveyList />} />
            <Route path="/rewards" element={<Rewards />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/surveys" element={<AdminSurveys />} />
            <Route path="/admin/surveys/:surveyId/responses" element={<AdminResponseReview />} />
            <Route path="/admin/rewards" element={<AdminRewards />} />
            <Route path="/admin/cancellation-requests" element={<AdminCancellationRequests />} />
            <Route path="/admin/withdrawal-requests" element={<AdminWithdrawalRequests />} />
            <Route path="/admin/finance" element={<AdminFinance />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
