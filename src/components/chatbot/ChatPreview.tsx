
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Send, Maximize2, Minimize2, CornerUpLeft, ThumbsUp, ThumbsDown } from "lucide-react";

type ChatbotConfig = {
  type: string;
  primaryColor: string;
  secondaryColor?: string;
  fontFamily?: string;
  fontSize?: string;
  borderRadius?: string;
  welcomeMessage: string;
  showLogo: boolean;
  logoUrl: string;
  chatHeaderText?: string;
  showTypingIndicator?: boolean;
};

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
};

const defaultMessages: Message[] = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
  }
];

const ChatPreview = ({ config }: { config: ChatbotConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [inputValue, setInputValue] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Use config's welcome message if different from default
  useEffect(() => {
    if (config.welcomeMessage !== defaultMessages[0].text) {
      setMessages([
        {
          id: 1,
          text: config.welcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
        }
      ]);
    }
  }, [config.welcomeMessage]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Show typing indicator if enabled
    if (config.showTypingIndicator) {
      setIsTyping(true);
      const typingMessage: Message = {
        id: messages.length + 2,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, typingMessage]);
      }, 500);
    }
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: messages.length + 2,
        text: "I'm a demo chatbot. This is a simulated response to your message.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => prev.filter(m => !m.isTyping).concat([botMessage]));
    }, config.showTypingIndicator ? 2000 : 1000);
  };

  // Determine the border radius based on the configuration
  const getBorderRadius = () => {
    switch(config.borderRadius) {
      case 'square': return 'rounded-none';
      case 'full': return 'rounded-2xl';
      case 'rounded':
      default: return 'rounded-lg';
    }
  };
  
  // Determine the font size based on the configuration
  const getFontSize = () => {
    switch(config.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'medium':
      default: return 'text-base';
    }
  };
  
  // If not open and not fullscreen, just show the chat button
  if (!isOpen && !isFullscreen && config.type === 'bubble') {
    return (
      <button
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 animate-fade-in"
        style={{ backgroundColor: config.primaryColor }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </button>
    );
  }

  // Determine container classes based on chat type
  let containerClasses = '';
  let maxHeight = '';
  let chatContentClasses = '';
  
  switch(config.type) {
    case 'bubble':
      containerClasses = 'w-80 h-[400px] rounded-lg shadow-lg';
      maxHeight = 'max-h-64';
      break;
    case 'inline':
      containerClasses = 'w-full h-96 rounded-lg';
      maxHeight = 'max-h-64';
      break;
    case 'fullscreen':
      containerClasses = 'w-full h-full rounded-none';
      maxHeight = 'max-h-80';
      setIsFullscreen(true);
      break;
    case 'sidebar':
      containerClasses = 'w-80 h-full rounded-r-lg shadow-lg';
      maxHeight = 'max-h-[calc(100%-120px)]';
      chatContentClasses = 'h-full';
      break;
  }

  // Apply font family
  const fontFamilyClass = config.fontFamily ? `font-${config.fontFamily.toLowerCase().replace(' ', '-')}` : '';

  return (
    <div className={`flex flex-col bg-white border overflow-hidden ${containerClasses} ${getBorderRadius()} ${fontFamilyClass} ${getFontSize()} animate-fade-in`}>
      {/* Header */}
      <div 
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="flex items-center text-white">
          {config.showLogo && (
            <img 
              src={config.logoUrl} 
              alt="Logo" 
              className="w-6 h-6 mr-2 rounded"
            />
          )}
          <span className="font-medium">{config.chatHeaderText || 'Chat Assistant'}</span>
        </div>
        <div className="flex items-center space-x-1">
          {config.type === 'fullscreen' ? (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(false)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7 text-white hover:bg-white/20"
            onClick={() => {
              setIsOpen(false);
              setIsFullscreen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className={`flex-1 p-4 overflow-y-auto ${maxHeight} ${chatContentClasses}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            } animate-fade-in`}
          >
            {message.isTyping ? (
              <div className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg rounded-bl-none">
                <div className="flex space-x-1 items-center h-5">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            ) : (
              <div
                className={`inline-block px-4 py-2 ${getBorderRadius()} ${
                  message.sender === 'user'
                    ? 'text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
                style={{
                  backgroundColor: message.sender === 'user' ? config.primaryColor : undefined,
                }}
              >
                {message.text}
              </div>
            )}
            
            {/* Feedback buttons for bot messages */}
            {message.sender === 'bot' && !message.isTyping && (
              <div className="flex mt-1 ml-1 space-x-1">
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors">
                  <ThumbsUp className="h-3 w-3" />
                </button>
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors">
                  <ThumbsDown className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className="border-t p-3">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1"
            style={{ 
              borderColor: "var(--input)",
              outlineColor: config.primaryColor 
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            className="px-3 py-2 rounded-r-lg transition-transform hover:scale-105"
            style={{ backgroundColor: config.primaryColor }}
            onClick={handleSend}
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
