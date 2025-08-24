
import React from 'react';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import ChatbotList from '@/features/chatbot/components/ChatbotList';

const ChatbotsDashboard = () => {
  return (
    <DashboardLayout>
      <ChatbotList />
    </DashboardLayout>
  );
};

export default ChatbotsDashboard;
