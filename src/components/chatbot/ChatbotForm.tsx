
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import ChatPreview from './ChatPreview';
import EmbedCode from './EmbedCode';
import ThemeCustomizer from './ThemeCustomizer';
import { FileText, PlusCircle, Upload, Palette, MessageCircle, Settings2, Sparkles } from 'lucide-react';

// Mock knowledge base files for demonstration
const mockKnowledgeFiles = [
  { id: 1, name: 'Product Documentation', fileCount: 3 },
  { id: 2, name: 'FAQ Dataset', fileCount: 1 },
  { id: 3, name: 'Customer Support Guidelines', fileCount: 2 },
];

const ChatbotForm = ({ existingBot = null }: { existingBot?: any }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<number | null>(
    existingBot?.knowledgeBaseId || null
  );
  
  const [chatbot, setChatbot] = useState({
    name: existingBot?.name || '',
    description: existingBot?.description || '',
    type: existingBot?.type || 'bubble',
    welcomeMessage: existingBot?.welcomeMessage || 'Hello! How can I help you today?',
    primaryColor: existingBot?.primaryColor || '#3B82F6',
    secondaryColor: existingBot?.secondaryColor || '#10B981',
    fontFamily: existingBot?.fontFamily || 'Inter',
    fontSize: existingBot?.fontSize || 'medium',
    borderRadius: existingBot?.borderRadius || 'rounded',
    showLogo: existingBot?.showLogo !== false,
    logoUrl: existingBot?.logoUrl || 'https://via.placeholder.com/150',
    modelName: existingBot?.modelName || 'gpt-3.5-turbo',
    saveConversations: existingBot?.saveConversations !== false,
    status: existingBot?.status || 'draft',
    showTypingIndicator: existingBot?.showTypingIndicator !== false,
    chatHeaderText: existingBot?.chatHeaderText || 'AskForge Assistant',
    knowledgeBaseId: existingBot?.knowledgeBaseId || null,
    position: existingBot?.position || 'bottom-right',
    allowAttachments: existingBot?.allowAttachments || false,
    allowVoiceInput: existingBot?.allowVoiceInput || false,
    showEmojiPicker: existingBot?.showEmojiPicker || false,
    messageBubbleStyle: existingBot?.messageBubbleStyle || 'default',
    userBubbleColor: existingBot?.userBubbleColor || '#3B82F6',
    botBubbleColor: existingBot?.botBubbleColor || '#f3f4f6',
    inputStyle: existingBot?.inputStyle || 'default',
    showTimestamp: existingBot?.showTimestamp || false,
    animationStyle: existingBot?.animationStyle || 'fade',
    darkMode: existingBot?.darkMode || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChatbot({
      ...chatbot,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setChatbot({
      ...chatbot,
      [name]: value
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setChatbot({
      ...chatbot,
      [name]: checked
    });
  };

  const handleKnowledgeBaseSelect = (id: number) => {
    setSelectedKnowledgeBase(id);
    setChatbot({
      ...chatbot,
      knowledgeBaseId: id
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock saving - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
      toast.success(existingBot ? 'Chatbot updated!' : 'Chatbot created!');
      navigate('/dashboard/chatbots');
    }, 1000);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-askforge-gray-900 dark:text-white">
          {existingBot ? 'Edit Chatbot' : 'Create Chatbot'}
        </h1>
        <p className="text-askforge-gray-500 dark:text-gray-400">
          {existingBot 
            ? 'Update your chatbot settings' 
            : 'Configure your new chatbot instance'
          }
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Chatbot Configuration</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Customize your chatbot's appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="basic" className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Basic Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="flex items-center gap-1">
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Appearance</span>
                  </TabsTrigger>
                  <TabsTrigger value="theme" className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Theme</span>
                  </TabsTrigger>
                  <TabsTrigger value="knowledge" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">Knowledge</span>
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center gap-1">
                    <Settings2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Advanced</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Chatbot Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Customer Support Bot"
                      value={chatbot.name}
                      onChange={handleChange}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="What this chatbot will be used for"
                      value={chatbot.description}
                      onChange={handleChange}
                      rows={3}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Interface Type</Label>
                    <Select 
                      value={chatbot.type} 
                      onValueChange={(value) => handleSelectChange('type', value)}
                    >
                      <SelectTrigger id="type" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select interface type" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="bubble">Bubble Chat</SelectItem>
                        <SelectItem value="inline">Inline Embedded</SelectItem>
                        <SelectItem value="fullscreen">Full Screen</SelectItem>
                        <SelectItem value="sidebar">Sidebar Chat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Position (for Bubble Chat)</Label>
                    <Select 
                      value={chatbot.position} 
                      onValueChange={(value) => handleSelectChange('position', value)}
                      disabled={chatbot.type !== 'bubble'}
                    >
                      <SelectTrigger id="position" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="top-left">Top Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chatHeaderText">Chat Header Text</Label>
                    <Input
                      id="chatHeaderText"
                      name="chatHeaderText"
                      placeholder="Name displayed in chat header"
                      value={chatbot.chatHeaderText}
                      onChange={handleChange}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="welcomeMessage">Welcome Message</Label>
                    <Textarea
                      id="welcomeMessage"
                      name="welcomeMessage"
                      placeholder="Greeting message when chat starts"
                      value={chatbot.welcomeMessage}
                      onChange={handleChange}
                      rows={2}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="appearance" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="primaryColor"
                          name="primaryColor"
                          type="color"
                          value={chatbot.primaryColor}
                          onChange={handleChange}
                          className="w-12 h-10 p-1 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <Input
                          type="text"
                          value={chatbot.primaryColor}
                          onChange={handleChange}
                          name="primaryColor"
                          className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="secondaryColor"
                          name="secondaryColor"
                          type="color"
                          value={chatbot.secondaryColor}
                          onChange={handleChange}
                          className="w-12 h-10 p-1 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <Input
                          type="text"
                          value={chatbot.secondaryColor}
                          onChange={handleChange}
                          name="secondaryColor"
                          className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fontFamily">Font Family</Label>
                      <Select 
                        value={chatbot.fontFamily} 
                        onValueChange={(value) => handleSelectChange('fontFamily', value)}
                      >
                        <SelectTrigger id="fontFamily" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="Inter">Inter (Sans-serif)</SelectItem>
                          <SelectItem value="Roboto">Roboto (Sans-serif)</SelectItem>
                          <SelectItem value="Merriweather">Merriweather (Serif)</SelectItem>
                          <SelectItem value="JetBrains Mono">JetBrains Mono (Monospace)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fontSize">Font Size</Label>
                      <Select 
                        value={chatbot.fontSize} 
                        onValueChange={(value) => handleSelectChange('fontSize', value)}
                      >
                        <SelectTrigger id="fontSize" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="borderRadius">Border Radius</Label>
                    <Select 
                      value={chatbot.borderRadius} 
                      onValueChange={(value) => handleSelectChange('borderRadius', value)}
                    >
                      <SelectTrigger id="borderRadius" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select border radius style" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="square">Square Corners</SelectItem>
                        <SelectItem value="rounded">Slightly Rounded</SelectItem>
                        <SelectItem value="full">Fully Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showLogo">Display Logo</Label>
                      <Switch
                        id="showLogo"
                        checked={chatbot.showLogo}
                        onCheckedChange={(checked) => handleSwitchChange('showLogo', checked)}
                      />
                    </div>
                  </div>
                  
                  {chatbot.showLogo && (
                    <div className="space-y-2">
                      <Label htmlFor="logoUrl">Logo URL</Label>
                      <Input
                        id="logoUrl"
                        name="logoUrl"
                        placeholder="https://example.com/logo.png"
                        value={chatbot.logoUrl}
                        onChange={handleChange}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <p className="text-xs text-askforge-gray-500 dark:text-gray-400">
                        Recommended size: 150x150px, transparent background
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <Switch
                        id="darkMode"
                        checked={chatbot.darkMode}
                        onCheckedChange={(checked) => handleSwitchChange('darkMode', checked)}
                      />
                    </div>
                    <p className="text-xs text-askforge-gray-500 dark:text-gray-400">
                      Enable dark mode for the chatbot interface
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="theme" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="messageBubbleStyle">Message Bubble Style</Label>
                    <Select 
                      value={chatbot.messageBubbleStyle} 
                      onValueChange={(value) => handleSelectChange('messageBubbleStyle', value)}
                    >
                      <SelectTrigger id="messageBubbleStyle" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select message style" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="modern">Modern (Shadow)</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="outlined">Outlined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="userBubbleColor">User Message Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="userBubbleColor"
                          name="userBubbleColor"
                          type="color"
                          value={chatbot.userBubbleColor}
                          onChange={handleChange}
                          className="w-12 h-10 p-1 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <Input
                          type="text"
                          value={chatbot.userBubbleColor}
                          onChange={handleChange}
                          name="userBubbleColor"
                          className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="botBubbleColor">Bot Message Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="botBubbleColor"
                          name="botBubbleColor"
                          type="color"
                          value={chatbot.botBubbleColor}
                          onChange={handleChange}
                          className="w-12 h-10 p-1 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <Input
                          type="text"
                          value={chatbot.botBubbleColor}
                          onChange={handleChange}
                          name="botBubbleColor"
                          className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inputStyle">Input Field Style</Label>
                    <Select 
                      value={chatbot.inputStyle} 
                      onValueChange={(value) => handleSelectChange('inputStyle', value)}
                    >
                      <SelectTrigger id="inputStyle" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select input style" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="outlined">Outlined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="animationStyle">Animation Style</Label>
                    <Select 
                      value={chatbot.animationStyle} 
                      onValueChange={(value) => handleSelectChange('animationStyle', value)}
                    >
                      <SelectTrigger id="animationStyle" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select animation style" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="fade">Fade In</SelectItem>
                        <SelectItem value="bounce">Bounce</SelectItem>
                        <SelectItem value="pulse">Pulse</SelectItem>
                        <SelectItem value="slide">Slide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showTimestamp">Show Message Timestamps</Label>
                      <Switch
                        id="showTimestamp"
                        checked={chatbot.showTimestamp}
                        onCheckedChange={(checked) => handleSwitchChange('showTimestamp', checked)}
                      />
                    </div>
                  </div>
                  
                  <ThemeCustomizer 
                    config={chatbot} 
                    onChange={(newConfig) => setChatbot(prevConfig => ({...prevConfig, ...newConfig}))} 
                  />
                </TabsContent>
                
                <TabsContent value="knowledge" className="space-y-4">
                  <div className="space-y-2 mb-4">
                    <Label>Knowledge Base</Label>
                    <p className="text-sm text-askforge-gray-500 dark:text-gray-400 mb-3">
                      Select a knowledge base to power your chatbot's responses
                    </p>
                    
                    <div className="grid gap-3">
                      {mockKnowledgeFiles.map((kb) => (
                        <div 
                          key={kb.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-askforge-gray-50 dark:hover:bg-gray-700 ${
                            selectedKnowledgeBase === kb.id 
                              ? 'border-askforge-blue bg-askforge-blue/5 ring-1 ring-askforge-blue dark:bg-blue-900/30 dark:border-blue-700' 
                              : 'dark:border-gray-700'
                          }`}
                          onClick={() => handleKnowledgeBaseSelect(kb.id)}
                        >
                          <div className="flex items-center">
                            <FileText className="h-8 w-8 text-askforge-gray-400 dark:text-gray-300 mr-3" />
                            <div className="flex-1">
                              <h4 className="font-medium dark:text-white">{kb.name}</h4>
                              <p className="text-sm text-askforge-gray-500 dark:text-gray-400">{kb.fileCount} file{kb.fileCount !== 1 ? 's' : ''}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="mt-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700" onClick={() => navigate('/dashboard/knowledge')}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create New Knowledge Base
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="modelName">AI Model</Label>
                    <Select 
                      value={chatbot.modelName} 
                      onValueChange={(value) => handleSelectChange('modelName', value)}
                    >
                      <SelectTrigger id="modelName" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="claude-2">Claude 2</SelectItem>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showTypingIndicator">Show Typing Indicator</Label>
                      <Switch
                        id="showTypingIndicator"
                        checked={chatbot.showTypingIndicator}
                        onCheckedChange={(checked) => handleSwitchChange('showTypingIndicator', checked)}
                      />
                    </div>
                    <p className="text-xs text-askforge-gray-500 dark:text-gray-400">
                      Show an animation when the chatbot is "typing" a response
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowAttachments">Allow File Attachments</Label>
                      <Switch
                        id="allowAttachments"
                        checked={chatbot.allowAttachments}
                        onCheckedChange={(checked) => handleSwitchChange('allowAttachments', checked)}
                      />
                    </div>
                    <p className="text-xs text-askforge-gray-500 dark:text-gray-400">
                      Enable users to upload files in the chat
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allowVoiceInput">Allow Voice Input</Label>
                      <Switch
                        id="allowVoiceInput"
                        checked={chatbot.allowVoiceInput}
                        onCheckedChange={(checked) => handleSwitchChange('allowVoiceInput', checked)}
                      />
                    </div>
                    <p className="text-xs text-askforge-gray-500 dark:text-gray-400">
                      Enable voice messages and speech-to-text
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showEmojiPicker">Show Emoji Picker</Label>
                      <Switch
                        id="showEmojiPicker"
                        checked={chatbot.showEmojiPicker}
                        onCheckedChange={(checked) => handleSwitchChange('showEmojiPicker', checked)}
                      />
                    </div>
                    <p className="text-xs text-askforge-gray-500 dark:text-gray-400">
                      Allow users to send emojis easily
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="saveConversations">Save Conversations</Label>
                      <Switch
                        id="saveConversations"
                        checked={chatbot.saveConversations}
                        onCheckedChange={(checked) => handleSwitchChange('saveConversations', checked)}
                      />
                    </div>
                    <p className="text-xs text-askforge-gray-500 dark:text-gray-400">
                      Store conversation history for analytics and training
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={chatbot.status} 
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger id="status" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6 dark:border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard/chatbots')}
                className="dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading} 
                className="transition-all duration-200 hover:scale-105"
              >
                {isLoading 
                  ? (existingBot ? 'Updating...' : 'Creating...') 
                  : (existingBot ? 'Update Chatbot' : 'Create Chatbot')
                }
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-6 transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Preview</CardTitle>
              <CardDescription className="dark:text-gray-400">
                See how your chatbot will appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChatPreview config={chatbot} />
            </CardContent>
          </Card>
          
          {existingBot && (
            <Card className="mt-6 transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Embed Code</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Add this chatbot to your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmbedCode botId={existingBot.id} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotForm;
