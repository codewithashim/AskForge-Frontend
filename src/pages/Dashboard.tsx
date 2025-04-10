
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { MessageSquare, Users, BarChart3, FileText, Plus, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-chatcanvas-gray-900">Dashboard</h1>
            <p className="text-chatcanvas-gray-500">Welcome back to ChatCanvas</p>
          </div>
          <Button asChild>
            <Link to="/dashboard/chatbots/new">
              <Plus className="mr-2 h-4 w-4" />
              New Chatbot
            </Link>
          </Button>
        </div>
        
        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Chatbots
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-chatcanvas-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-chatcanvas-gray-500">
                2 active, 1 draft
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Conversations
              </CardTitle>
              <Users className="h-4 w-4 text-chatcanvas-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,045</div>
              <p className="text-xs text-chatcanvas-gray-500">
                +24% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Knowledge Files
              </CardTitle>
              <FileText className="h-4 w-4 text-chatcanvas-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-chatcanvas-gray-500">
                All processed successfully
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                User Satisfaction
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-chatcanvas-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-chatcanvas-gray-500">
                Based on user feedback
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Access Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Chatbots</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-chatcanvas-gray-500 mb-4">
                    Manage your existing chatbots or create a new one
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard/chatbots">
                      View All Chatbots
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Knowledge Base</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-chatcanvas-gray-500 mb-4">
                    Upload documents to train your chatbots
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard/knowledge">
                      Manage Knowledge
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-chatcanvas-gray-500 mb-4">
                    View performance metrics and conversation stats
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard/analytics">
                      View Analytics
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-chatcanvas-gray-100 rounded-md">
                  <p className="text-chatcanvas-gray-500">Analytics chart will display here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-chatcanvas-blue pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">Chatbot Updated</p>
                    <p className="text-xs text-chatcanvas-gray-500">Customer Support Bot - Today, 9:41 AM</p>
                  </div>
                  
                  <div className="border-l-2 border-chatcanvas-green pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">File Processed</p>
                    <p className="text-xs text-chatcanvas-gray-500">pricing-sheet-2024.docx - Today, 8:15 AM</p>
                  </div>
                  
                  <div className="border-l-2 border-chatcanvas-purple pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">New Conversation</p>
                    <p className="text-xs text-chatcanvas-gray-500">Customer Support Bot - Yesterday, 4:23 PM</p>
                  </div>
                  
                  <div className="border-l-2 border-chatcanvas-blue pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">Chatbot Created</p>
                    <p className="text-xs text-chatcanvas-gray-500">Sales Assistant - Yesterday, 11:52 AM</p>
                  </div>
                  
                  <div className="border-l-2 border-chatcanvas-green pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">File Processed</p>
                    <p className="text-xs text-chatcanvas-gray-500">product-manual-v2.pdf - Apr 7, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
