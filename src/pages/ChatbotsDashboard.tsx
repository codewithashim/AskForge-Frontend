
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatbotList from '@/components/chatbot/ChatbotList';

const ChatbotsDashboard = () => {
  return (
    <DashboardLayout>
      <ChatbotList />
    </DashboardLayout>
  );
};

export default ChatbotsDashboard;
