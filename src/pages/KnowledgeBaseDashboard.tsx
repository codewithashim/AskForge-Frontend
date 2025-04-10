
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KnowledgeBase from '@/components/chatbot/KnowledgeBase';

const KnowledgeBaseDashboard = () => {
  return (
    <DashboardLayout>
      <KnowledgeBase />
    </DashboardLayout>
  );
};

export default KnowledgeBaseDashboard;
