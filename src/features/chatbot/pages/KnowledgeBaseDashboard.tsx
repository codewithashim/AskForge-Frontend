
import React from 'react';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import KnowledgeBase from '@/features/chatbot/components/KnowledgeBase';

const KnowledgeBaseDashboard = () => {
  return (
    <DashboardLayout>
      <KnowledgeBase />
    </DashboardLayout>
  );
};

export default KnowledgeBaseDashboard;
