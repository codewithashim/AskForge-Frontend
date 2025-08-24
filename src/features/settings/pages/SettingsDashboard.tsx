
import React, { useState } from 'react';
import DashboardLayout from '@/app/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { toast } from "sonner";

const SettingsDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };
  
  const handleSaveAPI = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('API settings updated successfully');
    }, 1000);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-chatcanvas-gray-900">Settings</h1>
          <p className="text-chatcanvas-gray-500">Manage your account and preferences</p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Update Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>AI Model API Keys</CardTitle>
                <CardDescription>
                  Connect your preferred AI model providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveAPI} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="openaiKey">OpenAI API Key</Label>
                      <Input id="openaiKey" placeholder="sk-..." />
                      <p className="text-xs text-chatcanvas-gray-500">
                        Used for GPT-3.5 Turbo and GPT-4 models
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="anthropicKey">Anthropic API Key</Label>
                      <Input id="anthropicKey" placeholder="sk-ant-..." />
                      <p className="text-xs text-chatcanvas-gray-500">
                        Used for Claude models
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="googleKey">Google AI API Key</Label>
                      <Input id="googleKey" placeholder="AIza..." />
                      <p className="text-xs text-chatcanvas-gray-500">
                        Used for Gemini models
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save API Keys'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-chatcanvas-gray-500">
                        Receive chatbot activity summaries via email
                      </p>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-chatcanvas-gray-500">
                        Receive weekly performance reports for your chatbots
                      </p>
                    </div>
                    <Switch id="weeklyReports" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-chatcanvas-gray-500">
                        Receive updates about new features and promotions
                      </p>
                    </div>
                    <Switch id="marketingEmails" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Default Settings</CardTitle>
                <CardDescription>
                  Set default preferences for new chatbots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultModel">Default AI Model</Label>
                    <Select defaultValue="gpt-3.5-turbo">
                      <SelectTrigger id="defaultModel">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="claude-2">Claude 2</SelectItem>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultInterface">Default Interface</Label>
                    <Select defaultValue="bubble">
                      <SelectTrigger id="defaultInterface">
                        <SelectValue placeholder="Select interface" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bubble">Bubble Chat</SelectItem>
                        <SelectItem value="inline">Inline Embedded</SelectItem>
                        <SelectItem value="fullscreen">Full Screen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultWelcome">Default Welcome Message</Label>
                    <Textarea 
                      id="defaultWelcome" 
                      defaultValue="Hello! How can I help you today?" 
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Defaults</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Manage your subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-chatcanvas-blue/5 border border-chatcanvas-blue/20 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-chatcanvas-blue">Free Plan</h3>
                      <p className="text-chatcanvas-gray-600">Basic features to get started</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-sm text-chatcanvas-gray-500">Current Plan</span>
                      <span className="text-xl font-bold">$0</span>
                      <span className="text-chatcanvas-gray-500">/month</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-chatcanvas-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Up to 3 chatbots</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-chatcanvas-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">10MB knowledge base storage</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-chatcanvas-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">1,000 AI responses per month</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Available Plans</h3>
                  
                  <div className="border rounded-lg p-4 hover:border-chatcanvas-blue hover:bg-chatcanvas-blue/5 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Pro Plan</h4>
                        <p className="text-sm text-chatcanvas-gray-500">For growing businesses</p>
                      </div>
                      <div>
                        <span className="font-bold">$49</span>
                        <span className="text-chatcanvas-gray-500">/month</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      Unlimited chatbots, 100MB storage, 10,000 AI responses
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:border-chatcanvas-blue hover:bg-chatcanvas-blue/5 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Business Plan</h4>
                        <p className="text-sm text-chatcanvas-gray-500">For teams and companies</p>
                      </div>
                      <div>
                        <span className="font-bold">$149</span>
                        <span className="text-chatcanvas-gray-500">/month</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      Everything in Pro + team access, analytics, priority support
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">Upgrade Plan</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Add or update your payment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center p-8 bg-chatcanvas-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="mb-4 text-chatcanvas-gray-500">
                      No payment method required for Free Plan
                    </p>
                    <Button variant="outline">Add Payment Method</Button>
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

export default SettingsDashboard;
