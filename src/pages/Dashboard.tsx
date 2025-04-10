
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Users, 
  BarChart3, 
  FileText, 
  Plus, 
  ExternalLink, 
  Clock, 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  ArrowUpRight
} from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const conversationTrendsData = [
    { date: '04/01', conversations: 45, users: 32 },
    { date: '04/03', conversations: 52, users: 36 },
    { date: '04/05', conversations: 48, users: 30 },
    { date: '04/07', conversations: 70, users: 52 },
    { date: '04/09', conversations: 61, users: 46 },
    { date: '04/11', conversations: 85, users: 62 },
    { date: '04/13', conversations: 68, users: 48 },
    { date: '04/15', conversations: 74, users: 55 },
    { date: '04/17', conversations: 84, users: 64 },
    { date: '04/19', conversations: 98, users: 73 },
    { date: '04/21', conversations: 87, users: 58 },
    { date: '04/23', conversations: 92, users: 69 },
    { date: '04/25', conversations: 75, users: 52 },
    { date: '04/27', conversations: 72, users: 49 },
    { date: '04/30', conversations: 89, users: 63 },
  ];

  const chatbotPerformanceData = [
    { name: 'Customer Support', conversations: 980, color: '#3b82f6' },
    { name: 'Sales Assistant', conversations: 750, color: '#10b981' },
    { name: 'Technical Help', conversations: 315, color: '#6366f1' },
  ];

  const sessionDurationData = [
    { name: '0-1 min', value: 12, color: '#94a3b8' },
    { name: '1-5 min', value: 58, color: '#3b82f6' },
    { name: '5+ min', value: 30, color: '#10b981' },
  ];

  const commonQueriesData = [
    { query: 'How do I reset my password?', count: 42 },
    { query: 'What are your pricing plans?', count: 38 },
    { query: 'How do I update my billing information?', count: 29 },
    { query: 'Is there a free trial available?', count: 24 },
    { query: 'How do I contact customer support?', count: 19 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to ChatCanvas</p>
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
          <Card className="dark:bg-card dark:text-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Chatbots
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                2 active, 1 draft
              </p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-card dark:text-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Conversations
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,045</div>
              <p className="text-xs text-muted-foreground">
                +24% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-card dark:text-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Knowledge Files
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                All processed successfully
              </p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-card dark:text-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                User Satisfaction
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                Based on user feedback
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="dark:bg-card/80">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 w-full">
            {/* Quick Access Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="dark:bg-card dark:text-foreground">
                <CardHeader>
                  <CardTitle className="text-lg">Your Chatbots</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
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
              
              <Card className="dark:bg-card dark:text-foreground">
                <CardHeader>
                  <CardTitle className="text-lg">Knowledge Base</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
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
              
              <Card className="dark:bg-card dark:text-foreground">
                <CardHeader>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
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
            
            {/* Recent Performance */}
            <Card className="dark:bg-card dark:text-foreground overflow-hidden">
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pb-6">
                <div className="h-[300px] w-full px-4">
                  <ChartContainer
                    config={{
                      conversations: { 
                        theme: { 
                          light: "#3b82f6", 
                          dark: "#60a5fa" 
                        }, 
                        label: "Conversations" 
                      },
                      users: { 
                        theme: { 
                          light: "#10b981", 
                          dark: "#34d399" 
                        }, 
                        label: "Users" 
                      },
                    }}
                  >
                    <AreaChart data={conversationTrendsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-conversations)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--color-conversations)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }} 
                        stroke="currentColor" 
                        opacity={0.6} 
                        tickMargin={10}
                        axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                        tickLine={{ stroke: 'currentColor', opacity: 0.3 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }} 
                        stroke="currentColor" 
                        opacity={0.6}
                        tickMargin={10}
                        axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                        tickLine={{ stroke: 'currentColor', opacity: 0.3 }}
                      />
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="conversations" 
                        stroke="var(--color-conversations)" 
                        fillOpacity={1} 
                        fill="url(#colorConversations)" 
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="var(--color-users)" 
                        fillOpacity={1} 
                        fill="url(#colorUsers)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Additional Analytics Section */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {/* Conversations by Chatbot */}
              <Card className="dark:bg-card dark:text-foreground overflow-hidden">
                <CardHeader>
                  <CardTitle>Conversations by Chatbot</CardTitle>
                  <CardDescription>Compare usage across different chatbot instances</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pb-6">
                  <div className="h-[300px] w-full px-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chatbotPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }} 
                          stroke="currentColor" 
                          opacity={0.6}
                          tickMargin={10}
                          axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                          tickLine={{ stroke: 'currentColor', opacity: 0.3 }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          stroke="currentColor" 
                          opacity={0.6}
                          tickMargin={10}
                          axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                          tickLine={{ stroke: 'currentColor', opacity: 0.3 }}
                        />
                        <Tooltip 
                          cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background dark:bg-card border border-border p-2 rounded-md shadow-md">
                                  <p className="font-semibold">{payload[0].payload.name}</p>
                                  <p className="text-sm">Conversations: {payload[0].value}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="conversations" radius={[4, 4, 0, 0]}>
                          {chatbotPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* User Satisfaction & Session Engagement */}
              <Card className="dark:bg-card dark:text-foreground">
                <CardHeader>
                  <CardTitle>User Satisfaction</CardTitle>
                  <CardDescription>Analyze user feedback and satisfaction metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <ThumbsUp className="h-5 w-5 mr-2 text-emerald-500" />
                          <span className="font-medium">Positive Feedback</span>
                        </div>
                        <span className="font-bold text-lg">92%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">346 positive ratings</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <ThumbsDown className="h-5 w-5 mr-2 text-red-500" />
                          <span className="font-medium">Negative Feedback</span>
                        </div>
                        <span className="font-bold text-lg">8%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">30 negative ratings</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-blue-500" />
                          <span className="font-medium">Unique Users</span>
                        </div>
                        <span className="font-bold text-lg">863</span>
                      </div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center h-full">
                      <h4 className="text-sm font-medium mb-2">Session Engagement</h4>
                      <div className="h-[150px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={sessionDurationData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={2}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {sessionDurationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-background dark:bg-card border border-border p-2 rounded-md shadow-md">
                                      <p className="font-semibold">{payload[0].name}</p>
                                      <p className="text-sm">{payload[0].value}% of sessions</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-2">Average conversation: 4m 12s</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Most Common Queries */}
              <Card className="dark:bg-card dark:text-foreground">
                <CardHeader>
                  <CardTitle>Most Common Queries</CardTitle>
                  <CardDescription>See what questions users are asking most frequently</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {commonQueriesData.map((item, index) => (
                      <li key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50 dark:bg-muted/20">
                        <div className="flex items-start">
                          <MessageCircle className="h-5 w-5 mr-3 text-primary mt-0.5" />
                          <span className="font-medium">{item.query}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Asked {item.count} times</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Peak Activity Times & Interaction Depth */}
              <Card className="dark:bg-card dark:text-foreground">
                <CardHeader>
                  <CardTitle>Conversation Insights</CardTitle>
                  <CardDescription>Detailed metrics about user interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          Peak Activity Times
                        </h4>
                        <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-lg">
                          <p className="text-xl font-bold">2-4 PM</p>
                          <p className="text-xs text-muted-foreground">Users are most active during afternoons</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-emerald-500" />
                          Interaction Depth
                        </h4>
                        <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-lg">
                          <p className="text-xl font-bold">3.7</p>
                          <p className="text-xs text-muted-foreground">Messages per conversation</p>
                          <div className="mt-2 flex items-center">
                            <span className="text-xs mr-2">Conversation depth</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Good</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium mb-3">Performance Summary</h4>
                      <div className="space-y-3 flex-1">
                        <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-lg flex items-center justify-between">
                          <span className="text-sm">Response Time</span>
                          <span className="text-sm font-medium flex items-center">
                            1.2s
                            <span className="text-xs text-emerald-500 ml-1 flex items-center">
                              <ArrowUpRight className="h-3 w-3" />
                              12%
                            </span>
                          </span>
                        </div>
                        
                        <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-lg flex items-center justify-between">
                          <span className="text-sm">Query Resolution</span>
                          <span className="text-sm font-medium flex items-center">
                            87%
                            <span className="text-xs text-emerald-500 ml-1 flex items-center">
                              <ArrowUpRight className="h-3 w-3" />
                              5%
                            </span>
                          </span>
                        </div>
                        
                        <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-lg flex items-center justify-between">
                          <span className="text-sm">Human Handoffs</span>
                          <span className="text-sm font-medium">
                            13%
                          </span>
                        </div>
                      </div>
                      
                      <Button asChild variant="outline" className="w-full mt-4" size="sm">
                        <Link to="/dashboard/analytics">
                          View detailed report
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <Card className="dark:bg-card dark:text-foreground">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-500 pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">Chatbot Updated</p>
                    <p className="text-xs text-muted-foreground">Customer Support Bot - Today, 9:41 AM</p>
                  </div>
                  
                  <div className="border-l-2 border-emerald-500 pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">File Processed</p>
                    <p className="text-xs text-muted-foreground">pricing-sheet-2024.docx - Today, 8:15 AM</p>
                  </div>
                  
                  <div className="border-l-2 border-purple-500 pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">New Conversation</p>
                    <p className="text-xs text-muted-foreground">Customer Support Bot - Yesterday, 4:23 PM</p>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">Chatbot Created</p>
                    <p className="text-xs text-muted-foreground">Sales Assistant - Yesterday, 11:52 AM</p>
                  </div>
                  
                  <div className="border-l-2 border-emerald-500 pl-4 ml-4 py-1">
                    <p className="text-sm font-medium">File Processed</p>
                    <p className="text-xs text-muted-foreground">product-manual-v2.pdf - Apr 7, 2024</p>
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
