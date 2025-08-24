import React, { useState } from 'react';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Users, 
  HelpCircle, 
  BarChart2, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  ChevronDown,
  Clock,
  RefreshCw,
  ChevronUp
} from 'lucide-react';
import { Button } from "@/shared/ui/button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

// Sample data for the charts
const conversationData = [
  { day: '04/01', conversations: 58, users: 42 },
  { day: '04/02', conversations: 65, users: 48 },
  { day: '04/03', conversations: 72, users: 53 },
  { day: '04/04', conversations: 78, users: 57 },
  { day: '04/05', conversations: 63, users: 49 },
  { day: '04/06', conversations: 52, users: 41 },
  { day: '04/07', conversations: 48, users: 38 },
  { day: '04/08', conversations: 58, users: 45 },
  { day: '04/09', conversations: 72, users: 52 },
  { day: '04/10', conversations: 80, users: 59 },
  { day: '04/11', conversations: 85, users: 62 },
  { day: '04/12', conversations: 76, users: 55 },
  { day: '04/13', conversations: 68, users: 49 },
  { day: '04/14', conversations: 60, users: 45 },
  { day: '04/15', conversations: 72, users: 52 },
  { day: '04/16', conversations: 78, users: 58 },
  { day: '04/17', conversations: 82, users: 61 },
  { day: '04/18', conversations: 87, users: 65 },
  { day: '04/19', conversations: 74, users: 55 },
  { day: '04/20', conversations: 69, users: 50 },
  { day: '04/21', conversations: 65, users: 47 },
  { day: '04/22', conversations: 73, users: 54 },
  { day: '04/23', conversations: 77, users: 58 },
  { day: '04/24', conversations: 82, users: 62 },
  { day: '04/25', conversations: 89, users: 68 },
  { day: '04/26', conversations: 95, users: 71 },
  { day: '04/27', conversations: 88, users: 65 },
  { day: '04/28', conversations: 79, users: 60 },
  { day: '04/29', conversations: 83, users: 62 },
  { day: '04/30', conversations: 90, users: 67 },
];

// Time distribution data
const timeDistribution = [
  { time: '12am', value: 15 },
  { time: '2am', value: 8 },
  { time: '4am', value: 5 },
  { time: '6am', value: 12 },
  { time: '8am', value: 35 },
  { time: '10am', value: 68 },
  { time: '12pm', value: 72 },
  { time: '2pm', value: 98 },
  { time: '4pm', value: 85 },
  { time: '6pm', value: 65 },
  { time: '8pm', value: 48 },
  { time: '10pm', value: 30 },
];

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [showInsights, setShowInsights] = useState(true);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your chatbot performance and user interactions</p>
        </div>
        
        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Total Conversations
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">2,045</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <TrendingUp className="text-green-500 dark:text-green-400 h-3 w-3" /> +24% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: "50ms" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Positive Feedback
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center">
                <ThumbsUp className="h-4 w-4 text-green-500 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">92%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                346 positive ratings
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Negative Feedback
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center">
                <ThumbsDown className="h-4 w-4 text-red-500 dark:text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">8%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                30 negative ratings
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Unique Users
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-500 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">863</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <TrendingUp className="text-green-500 dark:text-green-400 h-3 w-3" /> +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Analytics - Conversation Trends (Redesigned) */}
        <Card className="overflow-hidden border shadow-card bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-blue-500/10 dark:from-blue-500/10 dark:to-blue-500/20 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                  <BarChart2 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  Conversation Trends
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                  View trends over time for all your chatbots
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs gap-1 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Calendar className="h-3 w-3" />
                      {timeRange === '7days' ? 'Last 7 days' : 
                       timeRange === '14days' ? 'Last 14 days' : 
                       timeRange === '30days' ? 'Last 30 days' : 
                       'Custom Range'}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                    <DropdownMenuItem onClick={() => setTimeRange('7days')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      Last 7 days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange('14days')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      Last 14 days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeRange('30days')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      Last 30 days
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  onClick={() => setShowInsights(!showInsights)}
                >
                  {showInsights ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                
                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              {/* Interactive Chart */}
              <div className="h-[350px] bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
                <div className="px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Conversations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500 dark:bg-purple-400 opacity-60"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Users</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    April 1 - April 30, 2025
                  </div>
                </div>
                
                <div className="flex-1 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={conversationData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#374151' : '#e5e7eb'} className="dark:[&>line]:stroke-gray-700" />
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 12, fill: '#6b7280' }} 
                        tickLine={false}
                        axisLine={{ stroke: '#e5e7eb' }}
                        interval="preserveStartEnd"
                        className="dark:[&>text]:fill-gray-400 dark:[&>line]:stroke-gray-700"
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#6b7280' }} 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        className="dark:[&>text]:fill-gray-400"
                      />
                      <Tooltip
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: '1px solid #e2e8f0', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                          padding: '8px 12px',
                          fontSize: '12px',
                          backgroundColor: '#ffffff',
                          color: '#1f2937',
                          ...(window.matchMedia('(prefers-color-scheme: dark)').matches && {
                            backgroundColor: '#1F2937',
                            color: '#F3F4F6',
                            border: '1px solid #374151'
                          })
                        }}
                        formatter={(value, name) => {
                          return [value, name === 'conversations' ? 'Conversations' : 'Unique Users']
                        }}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="conversations" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorConversations)" 
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        fillOpacity={0.6}
                        fill="url(#colorUsers)"
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Insights Cards */}
              {showInsights && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100">
                        <Clock className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                        Peak Activity Times
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">2-4 PM</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Users are most active during afternoons
                      </p>
                      
                      <div className="h-[60px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={timeDistribution} barCategoryGap={1}>
                            <defs>
                              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                              </linearGradient>
                            </defs>
                            <Bar 
                              dataKey="value" 
                              fill="url(#colorActivity)" 
                              radius={[2, 2, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100">
                        <Clock className="h-4 w-4 text-green-500 dark:text-green-400" />
                        Session Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">4m 12s</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Average conversation duration
                      </p>
                      
                      <div className="flex flex-col gap-2 mt-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 dark:text-gray-400">0-1 min</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">12%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 dark:text-gray-400">1-5 min</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">58%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: '58%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 dark:text-gray-400">5+ min</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">30%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-900 dark:text-gray-100">
                        <MessageSquare className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                        Interaction Depth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">3.7</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        Messages per conversation
                      </p>
                      
                      <div className="space-y-2">
                        <div className="text-xs text-gray-700 dark:text-gray-400 flex justify-between">
                          <span>Conversation depth</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">Good</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" 
                               style={{ 
                                 width: '75%', 
                                 background: 'linear-gradient(to right, #10B981, #8B5CF6)' 
                               }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <Button variant="ghost" size="sm" className="text-xs text-blue-500 dark:text-blue-400 flex items-center hover:text-blue-600 dark:hover:text-blue-300">
                            View detailed report
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Detailed Analytics */}
        <Tabs defaultValue="conversations" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="conversations" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100">Conversations</TabsTrigger>
            <TabsTrigger value="feedback" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100">User Feedback</TabsTrigger>
            <TabsTrigger value="queries" className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100">Popular Queries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversations">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Conversations by Chatbot</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Compare usage across different chatbot instances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <p className="text-gray-500 dark:text-gray-400">Conversations chart will display here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">User Satisfaction</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Analyze user feedback and satisfaction metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <p className="text-gray-500 dark:text-gray-400">Feedback chart will display here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="queries">
            <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Most Common Queries</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  See what questions users are asking most frequently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">How do I reset my password?</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Asked 42 times</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">What are your pricing plans?</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Asked 38 times</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">How do I update my billing information?</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Asked 29 times</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Is there a free trial available?</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Asked 24 times</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start">
                    <HelpCircle className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">How do I contact customer support?</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Asked 19 times</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">View All Queries</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;