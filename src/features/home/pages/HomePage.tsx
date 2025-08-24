
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/shared/ui/button";
import Navbar from '@/app/layouts/Navbar';
import { 
  ArrowRight, Bot, MessageSquare, Database, Terminal, Code, 
  Upload, BarChart4, CheckCircle, Zap, Shield, Sun, Moon, 
  Send, ArrowDown, Sparkles, Brain, User
} from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';

// Animate elements when they enter the viewport
const useIntersectionObserver = (elementRef: React.RefObject<HTMLElement>, threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, threshold]);
};

// Blob Animation Component
const AnimatedBlob = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute rounded-full mix-blend-multiply filter blur-xl animate-blob-pulse opacity-70 ${className}`}></div>
  );
};

// Hero section component
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(heroRef);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Build AI Chatbots That Understand Your Content";
  const { theme } = useTheme();
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-r from-askforge-blue/20 to-askforge-purple/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-gradient-to-r from-askforge-purple/20 to-askforge-green/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-askforge-green/20 to-askforge-blue/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div ref={heroRef} className="container mx-auto text-center max-w-5xl opacity-0 relative z-10 animate-fade-in">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-askforge-blue/10 to-askforge-purple/10 dark:from-askforge-blue/20 dark:to-askforge-purple/20 border border-askforge-blue/20 dark:border-askforge-purple/30 backdrop-blur-sm">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-askforge-blue to-askforge-purple text-sm font-medium flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-askforge-blue" />
            AI-Powered Conversation Platform
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-askforge-blue via-askforge-purple to-askforge-green">
            {typedText}
            <span className={`absolute right-[-4px] top-0 h-full w-[3px] bg-askforge-blue ${currentIndex < fullText.length ? 'animate-blink' : 'opacity-0'}`}></span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-askforge-gray-600 dark:text-askforge-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Create intelligent chatbots trained on your specific data. Deploy anywhere
          in minutes with no coding required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-askforge-blue to-askforge-purple hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-askforge-blue/20 dark:shadow-askforge-purple/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-slow" 
            asChild
          >
            <Link to="/signup">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 animate-slide-right" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-askforge-gray-300 dark:border-askforge-gray-700 text-lg px-8 py-6 rounded-xl transition-all duration-300 backdrop-blur-sm bg-white/50 dark:bg-askforge-gray-900/50 hover:bg-white/80 dark:hover:bg-askforge-gray-800/80 hover:scale-105" 
            asChild
          >
            <Link to="/login">
              Watch Demo
              <Bot className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        
        <div className="relative mx-auto max-w-4xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-askforge-blue/30 to-askforge-purple/30 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
          
          <div className="relative bg-white dark:bg-askforge-gray-800 rounded-2xl overflow-hidden border border-askforge-gray-200 dark:border-askforge-gray-700 shadow-2xl">            
            <div className="p-2 h-[460px] flex flex-col">
              <div className="flex items-center border-b border-askforge-gray-200 dark:border-askforge-gray-700 p-3">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center flex-1 justify-center">
                  <Bot className="h-5 w-5 text-askforge-blue mr-2" />
                  <h3 className="font-medium text-sm text-center">AskForge Assistant</h3>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-askforge-blue/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4 text-askforge-blue" />
                  </div>
                  <div className="bg-askforge-gray-100 dark:bg-askforge-gray-700 text-askforge-gray-800 dark:text-white p-3 rounded-2xl rounded-tl-none max-w-sm animate-scale-in shadow-sm">
                    <p>Hello! I'm your AI assistant. How can I help you today?</p>
                  </div>
                </div>
                
                <div className="flex items-start justify-end">
                  <div className="bg-askforge-blue text-white p-3 rounded-2xl rounded-tr-none max-w-sm animate-scale-in shadow-sm" style={{animationDelay: '0.5s'}}>
                    <p>Can you tell me about your knowledge base features?</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-askforge-gray-200 dark:bg-askforge-gray-600 flex items-center justify-center ml-3 flex-shrink-0">
                    <User className="h-4 w-4 text-askforge-gray-600 dark:text-askforge-gray-300" />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-askforge-blue/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4 text-askforge-blue" />
                  </div>
                  <div className="bg-askforge-gray-100 dark:bg-askforge-gray-700 text-askforge-gray-800 dark:text-white p-3 rounded-2xl rounded-tl-none max-w-sm animate-scale-in shadow-sm" style={{animationDelay: '1s'}}>
                    <p>Absolutely! Our knowledge base allows you to upload documents, PDFs, and website content to train your chatbot on your specific information. The AI will understand and reference this content when answering customer questions.</p>
                  </div>
                </div>
                
                <div className="flex items-start justify-end">
                  <div className="bg-askforge-blue text-white p-3 rounded-2xl rounded-tr-none max-w-sm animate-scale-in shadow-sm" style={{animationDelay: '1.5s'}}>
                    <p>That sounds great! How many documents can I upload?</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-askforge-gray-200 dark:bg-askforge-gray-600 flex items-center justify-center ml-3 flex-shrink-0">
                    <User className="h-4 w-4 text-askforge-gray-600 dark:text-askforge-gray-300" />
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-askforge-blue/20 flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="h-4 w-4 text-askforge-blue" />
                  </div>
                  <div className="bg-askforge-gray-100 dark:bg-askforge-gray-700 text-askforge-gray-800 dark:text-white p-3 rounded-2xl rounded-tl-none max-w-sm animate-fadeIn" style={{animationDelay: '2s'}}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-askforge-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-askforge-gray-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-askforge-gray-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-askforge-gray-200 dark:border-askforge-gray-700">
                <div className="flex items-center relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full rounded-full px-4 py-3 border border-askforge-gray-300 dark:border-askforge-gray-600 focus:ring-2 focus:ring-askforge-blue focus:border-transparent bg-white dark:bg-askforge-gray-700 dark:text-white pr-12"
                  />
                  <button className="absolute right-2 p-2 rounded-full bg-askforge-blue text-white">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 animate-bounce-slow">
          <a href="#features" className="inline-flex flex-col items-center text-askforge-gray-500 dark:text-askforge-gray-400 hover:text-askforge-blue dark:hover:text-askforge-blue-light transition-colors">
            <span className="text-sm mb-1">Explore Features</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Features section component
const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(featuresRef);

  return (
    <section id="features" className="py-16 bg-askforge-gray-50 dark:bg-askforge-gray-900/50 px-4">
      <div ref={featuresRef} className="container mx-auto max-w-6xl opacity-0">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-askforge-purple/10 dark:bg-askforge-purple/20 border border-askforge-purple/20 dark:border-askforge-purple/30">
            <span className="text-askforge-purple dark:text-askforge-purple-light text-sm font-medium">
              Advanced Features
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-askforge-gray-900 dark:text-white">
            Powerful Features for Your Chatbot Needs
          </h2>
          <p className="text-lg text-askforge-gray-600 dark:text-askforge-gray-400 max-w-2xl mx-auto">
            Everything you need to create, deploy, and manage AI-powered chatbots that understand your content
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Database className="h-6 w-6 text-askforge-blue" />,
              title: "Knowledge Base Training",
              description: "Upload documents, PDFs, and website content to train your bot with your specific information.",
              color: "askforge-blue",
              delay: 0
            },
            {
              icon: <Terminal className="h-6 w-6 text-askforge-purple" />,
              title: "Multiple LLM Options",
              description: "Choose from leading AI models like GPT-4, Claude, Gemini, and more for your chatbot.",
              color: "askforge-purple",
              delay: 0.1
            },
            {
              icon: <Code className="h-6 w-6 text-askforge-green" />,
              title: "Easy Embedding",
              description: "Add your chatbot to any website with a simple embed code. No technical skills required.",
              color: "askforge-green",
              delay: 0.2
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-askforge-blue" />,
              title: "Multiple Chat Interfaces",
              description: "Choose from bubble chat, inline embedded, sidebar, or full-screen layouts for your chatbot.",
              color: "askforge-blue",
              delay: 0.3
            },
            {
              icon: <Upload className="h-6 w-6 text-askforge-purple" />,
              title: "Bulk File Processing",
              description: "Upload multiple files at once to quickly build a comprehensive knowledge base.",
              color: "askforge-purple",
              delay: 0.4
            },
            {
              icon: <BarChart4 className="h-6 w-6 text-askforge-green" />,
              title: "Analytics Dashboard",
              description: "Track chatbot performance, popular questions, and user satisfaction with detailed analytics.",
              color: "askforge-green", 
              delay: 0.5
            },
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-askforge-gray-800 p-6 rounded-xl shadow-soft hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] opacity-0 animate-fade-in border border-askforge-gray-100 dark:border-askforge-gray-700"
              style={{ animationDelay: `${feature.delay}s` }}
            >
              <div className={`w-12 h-12 bg-${feature.color}/10 dark:bg-${feature.color}/20 rounded-lg mb-4 flex items-center justify-center`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-askforge-gray-600 dark:text-askforge-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits section
const Benefits = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(benefitsRef);

  return (
    <section className="py-16 px-4 bg-white dark:bg-askforge-gray-900 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80')] bg-fixed opacity-5 mix-blend-overlay"></div>
      
      <div ref={benefitsRef} className="container mx-auto max-w-6xl opacity-0 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-askforge-green/10 dark:bg-askforge-green/20 border border-askforge-green/20 dark:border-askforge-green/30">
            <span className="text-askforge-green dark:text-askforge-green-light text-sm font-medium">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-askforge-gray-900 dark:text-white">
            Why Choose AskForge?
          </h2>
          <p className="text-lg text-askforge-gray-600 dark:text-askforge-gray-400 max-w-2xl mx-auto">
            Our platform offers unique advantages for businesses of all sizes
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="h-6 w-6 text-askforge-blue" />,
              title: "Fast Setup",
              description: "Get your first chatbot up and running in under 5 minutes with our intuitive interface."
            },
            {
              icon: <Shield className="h-6 w-6 text-askforge-green" />,
              title: "Data Privacy",
              description: "Your data stays private. We don't use your content to train our models."
            },
            {
              icon: <Brain className="h-6 w-6 text-askforge-purple" />,
              title: "Custom Branding",
              description: "Match your brand's look and feel with fully customizable chatbot interfaces."
            },
          ].map((benefit, index) => (
            <div 
              key={index}
              className="border border-askforge-gray-200 dark:border-askforge-gray-700 p-6 rounded-xl hover:border-askforge-blue/50 dark:hover:border-askforge-blue/50 transition-all duration-300 text-center bg-white/50 dark:bg-askforge-gray-800/50 backdrop-blur-sm transform hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-askforge-gray-50 dark:bg-askforge-gray-700 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{benefit.title}</h3>
              <p className="text-askforge-gray-600 dark:text-askforge-gray-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA section
const CallToAction = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(ctaRef);

  return (
    <section className="py-20 px-4">
      <div ref={ctaRef} className="container mx-auto max-w-5xl opacity-0">
        <div className="bg-gradient-to-r from-askforge-blue to-askforge-purple dark:from-askforge-blue/80 dark:to-askforge-purple/80 rounded-2xl p-10 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80')] opacity-10 mix-blend-overlay"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/20 animate-float"
                style={{
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 30 + 10}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Your AI Chatbot?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Get started today and deploy your first intelligent assistant in minutes.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-askforge-blue hover:bg-askforge-gray-100 transition-all duration-300 hover:scale-105 animate-pulse-slow" 
              asChild
            >
              <Link to="/login">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-askforge-gray-900 text-white py-12 px-4 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xl font-bold">AskForge</span>
            </div>
            <p className="max-w-xs text-askforge-gray-400">
              Build intelligent AI assistants for your website with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-askforge-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-askforge-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-askforge-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-askforge-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-askforge-gray-400 text-sm">
            © 2024 AskForge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-askforge-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-askforge-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-askforge-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Index component
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-askforge-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
