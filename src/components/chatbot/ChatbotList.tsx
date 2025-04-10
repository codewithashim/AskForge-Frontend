
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, MoreVertical, Edit, Trash2, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock data for chatbots
const mockChatbots = [
  {
    id: 1,
    name: 'Customer Support Bot',
    description: 'Answers common customer questions and helps with product issues',
    type: 'bubble',
    status: 'active',
    created: '2023-11-15',
    interactions: 1248,
  },
  {
    id: 2,
    name: 'Product Documentation',
    description: 'Helps users navigate and understand product documentation',
    type: 'inline',
    status: 'active',
    created: '2023-12-01',
    interactions: 756,
  },
  {
    id: 3,
    name: 'Sales Assistant',
    description: 'Assists potential customers with product information and pricing',
    type: 'fullscreen',
    status: 'draft',
    created: '2024-01-10',
    interactions: 0,
  },
];

const ChatbotList = () => {
  const [chatbots, setChatbots] = useState(mockChatbots);

  const handleDelete = (id: number) => {
    setChatbots(chatbots.filter(bot => bot.id !== id));
    toast.success('Chatbot deleted');
  };

  const handleDuplicate = (id: number) => {
    const botToDuplicate = chatbots.find(bot => bot.id === id);
    if (!botToDuplicate) return;
    
    const newBot = {
      ...botToDuplicate,
      id: Math.max(...chatbots.map(b => b.id)) + 1,
      name: `${botToDuplicate.name} (Copy)`,
      status: 'draft' as const,
    };
    
    setChatbots([...chatbots, newBot]);
    toast.success('Chatbot duplicated');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-chatcanvas-gray-900">Your Chatbots</h1>
          <p className="text-chatcanvas-gray-500">Manage and create chatbot instances</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/chatbots/new">
            <Plus className="mr-2 h-4 w-4" />
            New Chatbot
          </Link>
        </Button>
      </div>
      
      {chatbots.length === 0 ? (
        <Card className="text-center p-12">
          <CardContent className="pt-6">
            <MessageSquare className="mx-auto h-12 w-12 text-chatcanvas-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">No chatbots yet</h3>
            <p className="text-chatcanvas-gray-500 mb-6">
              Create your first chatbot to get started
            </p>
            <Button asChild>
              <Link to="/dashboard/chatbots/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Chatbot
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chatbots.map((bot) => (
            <Card key={bot.id} className="shadow-soft hover:shadow-card transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge
                    variant={bot.status === 'active' ? 'default' : 'secondary'}
                    className="mb-2"
                  >
                    {bot.status === 'active' ? 'Active' : 'Draft'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/dashboard/chatbots/${bot.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(bot.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(bot.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle>{bot.name}</CardTitle>
                <CardDescription>{bot.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-chatcanvas-gray-500">
                  <div className="flex justify-between mb-1">
                    <span>Type:</span>
                    <span className="font-medium text-chatcanvas-gray-700 capitalize">{bot.type}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Created:</span>
                    <span className="font-medium text-chatcanvas-gray-700">{bot.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interactions:</span>
                    <span className="font-medium text-chatcanvas-gray-700">{bot.interactions.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/dashboard/chatbots/${bot.id}`}>
                    Manage
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatbotList;
