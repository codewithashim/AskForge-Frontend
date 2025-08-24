
import React, { useState, useEffect } from 'react';
import { Button } from "@/shared/ui/button";
import { MessageSquare, X, Send, Maximize2, Minimize2, CornerUpLeft, ThumbsUp, ThumbsDown, Paperclip, MicIcon, Image, Smile } from "lucide-react";

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
  position?: string;
  allowAttachments?: boolean;
  allowVoiceInput?: boolean;
  showEmojiPicker?: boolean;
  messageBubbleStyle?: string;
  userBubbleColor?: string;
  botBubbleColor?: string;
  inputStyle?: string;
  showTimestamp?: boolean;
  animationStyle?: string;
  darkMode?: boolean;
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

  // Get position classes
  const getPositionClasses = () => {
    switch(config.position) {
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'bottom-right':
      default: return 'bottom-4 right-4';
    }
  };

  // Get message bubble styles
  const getMessageBubbleStyle = (sender: 'user' | 'bot') => {
    const baseClasses = `px-4 py-2 ${getBorderRadius()}`;
    
    if (sender === 'user') {
      const userBubbleColor = config.userBubbleColor || config.primaryColor;
      
      if (config.messageBubbleStyle === 'modern') {
        return `${baseClasses} text-white rounded-br-none shadow-md` + 
               (config.darkMode ? ' bg-opacity-90' : '');
      } else if (config.messageBubbleStyle === 'minimal') {
        return `${baseClasses} text-white border border-white/10 rounded-br-none`;
      } else if (config.messageBubbleStyle === 'outlined') {
        return `${baseClasses} bg-transparent border-2 text-gray-800 dark:text-white rounded-br-none`;
      } else {
        // Default style
        return `${baseClasses} text-white rounded-br-none`;
      }
    } else {
      const botBubbleColor = config.botBubbleColor || 'bg-gray-100';
      const botTextColor = config.darkMode ? 'text-white' : 'text-gray-800';
      
      if (config.messageBubbleStyle === 'modern') {
        return `${baseClasses} ${botTextColor} bg-gray-100 dark:bg-gray-700 rounded-bl-none shadow-md`;
      } else if (config.messageBubbleStyle === 'minimal') {
        return `${baseClasses} ${botTextColor} bg-gray-100 dark:bg-gray-700 border border-white/10 rounded-bl-none`;
      } else if (config.messageBubbleStyle === 'outlined') {
        return `${baseClasses} bg-transparent border-2 border-gray-200 dark:border-gray-700 ${botTextColor} rounded-bl-none`;
      } else {
        // Default style
        return `${baseClasses} bg-gray-100 dark:bg-gray-700 ${botTextColor} rounded-bl-none`;
      }
    }
  };
  
  // Get animation style class
  const getAnimationClass = () => {
    switch(config.animationStyle) {
      case 'bounce': return 'animate-bounce-slow';
      case 'pulse': return 'animate-pulse-slow';
      case 'slide': return 'animate-slide-right';
      case 'fade':
      default: return 'animate-fade-in';
    }
  };
  
  // If not open and not fullscreen, just show the chat button
  if (!isOpen && !isFullscreen && config.type === 'bubble') {
    return (
      <button
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 ${getAnimationClass()}`}
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
  
  // Dark mode classes
  const darkModeClasses = config.darkMode 
    ? 'bg-gray-800 border-gray-700 text-white' 
    : 'bg-white border-gray-200 text-gray-800';

  // Input style classes
  const getInputStyleClasses = () => {
    const baseClasses = 'flex-1 px-3 py-2 focus:outline-none focus:ring-1';
    
    switch(config.inputStyle) {
      case 'modern':
        return `${baseClasses} rounded-l-lg border-0 shadow-inner ${config.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`;
      case 'minimal':
        return `${baseClasses} rounded-l-lg border-t-0 border-b-0 border-l-0 border-r ${config.darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'}`;
      case 'outlined':
        return `${baseClasses} rounded-l-lg border ${config.darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`;
      default:
        return `${baseClasses} rounded-l-lg border ${config.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`;
    }
  };

  return (
    <div className={`flex flex-col overflow-hidden ${containerClasses} ${getBorderRadius()} ${fontFamilyClass} ${getFontSize()} ${getAnimationClass()} ${darkModeClasses}`}>
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
      <div className={`flex-1 p-4 overflow-y-auto ${maxHeight} ${chatContentClasses} ${config.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            } ${getAnimationClass()}`}
          >
            {message.isTyping ? (
              <div className={`inline-block px-4 py-2 ${config.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg rounded-bl-none`}>
                <div className="flex space-x-1 items-center h-5">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            ) : (
              <div
                className={`inline-block ${getMessageBubbleStyle(message.sender)}`}
                style={{
                  backgroundColor: message.sender === 'user' 
                    ? (config.userBubbleColor || config.primaryColor) 
                    : (config.botBubbleColor || (config.darkMode ? '#374151' : '#f3f4f6')),
                  borderColor: message.sender === 'user' && config.messageBubbleStyle === 'outlined'
                    ? config.userBubbleColor || config.primaryColor
                    : undefined
                }}
              >
                {message.text}
                {config.showTimestamp && (
                  <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </div>
                )}
              </div>
            )}
            
            {/* Feedback buttons for bot messages */}
            {message.sender === 'bot' && !message.isTyping && (
              <div className="flex mt-1 ml-1 space-x-1">
                <button className={`${config.darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} p-1 rounded-full transition-colors`}>
                  <ThumbsUp className="h-3 w-3" />
                </button>
                <button className={`${config.darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} p-1 rounded-full transition-colors`}>
                  <ThumbsDown className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Input */}
      <div className={`border-t p-3 ${config.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className={getInputStyleClasses()}
            style={{ 
              outlineColor: config.primaryColor 
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          {config.allowAttachments && (
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 ${config.darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
          )}
          {config.showEmojiPicker && (
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 ${config.darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Smile className="h-5 w-5" />
            </Button>
          )}
          {config.allowVoiceInput && (
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 ${config.darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <MicIcon className="h-5 w-5" />
            </Button>
          )}
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
