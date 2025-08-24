import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

// Lazy imports for all pages
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'));
const DashboardPage = lazy(() => import('@/features/home/pages/DashboardPage'));
const ChatbotsDashboard = lazy(() => import('@/features/chatbot/pages/ChatbotsDashboard'));
const ChatbotEditor = lazy(() => import('@/features/chatbot/pages/ChatbotEditor'));
const KnowledgeBaseDashboard = lazy(() => import('@/features/chatbot/pages/KnowledgeBaseDashboard'));
const AnalyticsDashboard = lazy(() => import('@/features/analytics/pages/AnalyticsDashboard'));
const SettingsDashboard = lazy(() => import('@/features/settings/pages/SettingsDashboard'));
const NotFoundPage = lazy(() => import('@/features/home/pages/NotFoundPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/chatbots" element={<ChatbotsDashboard />} />
          <Route path="/dashboard/chatbots/:id" element={<ChatbotEditor />} />
          <Route path="/dashboard/knowledge" element={<KnowledgeBaseDashboard />} />
          <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />
          <Route path="/dashboard/settings" element={<SettingsDashboard />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default AppRoutes;
