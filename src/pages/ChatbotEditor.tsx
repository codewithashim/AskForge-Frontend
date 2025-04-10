
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ChatbotForm from '@/components/chatbot/ChatbotForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatbotKnowledgeBase from '@/components/chatbot/ChatbotKnowledgeBase';

// Mock data for chatbots with added knowledge base IDs
const mockChatbots = [
  {
    id: 1,
    name: 'Customer Support Bot',
    description: 'Answers common customer questions and helps with product issues',
    type: 'bubble',
    status: 'active',
    created: '2023-11-15',
    interactions: 1248,
    welcomeMessage: 'Hello! How can I help you with our product today?',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    fontFamily: 'Inter',
    fontSize: 'medium',
    borderRadius: 'rounded',
    showLogo: true,
    logoUrl: 'https://via.placeholder.com/150',
    modelName: 'gpt-3.5-turbo',
    saveConversations: true,
    showTypingIndicator: true,
    chatHeaderText: 'AskForge Support',
    knowledgeBaseId: 1
  },
  {
    id: 2,
    name: 'Product Documentation',
    description: 'Helps users navigate and understand product documentation',
    type: 'inline',
    status: 'active',
    created: '2023-12-01',
    interactions: 756,
    welcomeMessage: 'Hello! What can I help you find in our documentation?',
    primaryColor: '#8B5CF6',
    secondaryColor: '#3B82F6',
    fontFamily: 'Roboto',
    fontSize: 'medium',
    borderRadius: 'rounded',
    showLogo: true,
    logoUrl: 'https://via.placeholder.com/150',
    modelName: 'gpt-3.5-turbo',
    saveConversations: true,
    showTypingIndicator: true,
    chatHeaderText: 'AskForge Docs',
    knowledgeBaseId: 2
  },
  {
    id: 3,
    name: 'Sales Assistant',
    description: 'Assists potential customers with product information and pricing',
    type: 'fullscreen',
    status: 'draft',
    created: '2024-01-10',
    interactions: 0,
    welcomeMessage: 'Hi there! Interested in learning more about our products?',
    primaryColor: '#10B981',
    secondaryColor: '#3B82F6',
    fontFamily: 'Merriweather',
    fontSize: 'large',
    borderRadius: 'full',
    showLogo: false,
    logoUrl: '',
    modelName: 'gpt-4',
    saveConversations: false,
    showTypingIndicator: true,
    chatHeaderText: 'AskForge Sales',
    knowledgeBaseId: null
  },
];

const ChatbotEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const [activeTab, setActiveTab] = useState('settings');
  
  // Find existing chatbot if editing
  const existingBot = !isNew 
    ? mockChatbots.find(bot => bot.id === Number(id)) 
    : null;
  
  if (!existingBot && !isNew) {
    // Chatbot not found, redirect to chatbots list
    navigate('/dashboard/chatbots');
    return null;
  }
  
  return (
    <DashboardLayout>
      <div className="mb-6 animate-fade-in">
        {/* <h1 className="text-2xl font-bold text-askforge-gray-900">
          {isNew ? 'Create Chatbot' : `Edit: ${existingBot?.name}`}
        </h1> */}
        {/* <p className="text-askforge-gray-500">
          {isNew 
            ? 'Configure your new chatbot instance' 
            : 'Manage your chatbot settings and knowledge base'
          }
        </p> */}
      </div>
      
      {!isNew && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-6 max-w-md">
            <TabsTrigger value="settings" className="transition-all duration-200">Settings</TabsTrigger>
            <TabsTrigger value="knowledge" className="transition-all duration-200">Knowledge Base</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="animate-fade-in">
            <ChatbotForm existingBot={existingBot} />
          </TabsContent>
          
          <TabsContent value="knowledge" className="animate-fade-in">
            <ChatbotKnowledgeBase chatbotId={Number(id)} chatbotName={existingBot?.name || ''} />
          </TabsContent>
        </Tabs>
      )}
      
      {isNew && <ChatbotForm existingBot={null} />}
    </DashboardLayout>
  );
};

export default ChatbotEditor;
