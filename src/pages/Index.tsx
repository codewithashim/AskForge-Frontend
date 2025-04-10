
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/Navbar';
import { 
  ArrowRight, Bot, MessageSquare, Database, 
  Terminal, Code, Upload, BarChart4, CheckCircle, Zap, Shield
} from 'lucide-react';

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

// Hero section component
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useIntersectionObserver(heroRef);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-askforge-gray-50">
      <div ref={heroRef} className="container mx-auto text-center max-w-4xl opacity-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-askforge-gray-900 tracking-tight">
          Create & Deploy AI Chatbots <span className="text-askforge-blue">in Minutes</span>
        </h1>
        <p className="text-xl text-askforge-gray-600 mb-8 max-w-2xl mx-auto">
          Build intelligent AI chatbots that understand your content and help your customers. 
          No coding required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-askforge-blue hover:bg-askforge-blue/90 transition-all duration-300 hover:scale-105" asChild>
            <Link to="/login">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="transition-all duration-300 hover:scale-105" asChild>
            <Link to="/login">
              View Demo
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-soft transform transition-all duration-500 hover:shadow-lg">
          <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden border border-askforge-gray-100">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-askforge-blue/5 pointer-events-none"></div>
            
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center mb-6 border-b pb-2">
                <Bot className="h-6 w-6 text-askforge-blue mr-2" />
                <h3 className="font-medium">AskForge Assistant</h3>
              </div>
              
              <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                <div className="bg-askforge-gray-100 text-askforge-gray-800 p-3 rounded-lg rounded-bl-none max-w-xs animate-scale-in" style={{animationDelay: '0.3s'}}>
                  Hello! How can I help you today?
                </div>
                
                <div className="bg-askforge-blue text-white p-3 rounded-lg rounded-br-none max-w-xs ml-auto animate-scale-in" style={{animationDelay: '1s'}}>
                  I'd like to learn about your premium plan.
                </div>
                
                <div className="bg-askforge-gray-100 text-askforge-gray-800 p-3 rounded-lg rounded-bl-none max-w-xs animate-scale-in" style={{animationDelay: '1.5s'}}>
                  Our premium plan includes unlimited chatbot deployments, file uploads up to 100MB, and priority support. Would you like to know more?
                </div>
                
                <div className="bg-askforge-blue text-white p-3 rounded-lg rounded-br-none max-w-xs ml-auto animate-scale-in" style={{animationDelay: '2s'}}>
                  Yes, please tell me about the pricing options.
                </div>
                
                <div className="flex items-center space-x-2 animate-scale-in" style={{animationDelay: '2.5s'}}>
                  <div className="bg-askforge-gray-100 text-askforge-gray-800 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-askforge-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-askforge-gray-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-askforge-gray-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-3 mt-auto">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-askforge-blue"
                  />
                  <button
                    className="px-3 py-2 rounded-r-lg bg-askforge-blue text-white"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    <section className="py-16 bg-askforge-gray-50 px-4">
      <div ref={featuresRef} className="container mx-auto max-w-6xl opacity-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-askforge-gray-900">
            Powerful Features for Your Chatbot Needs
          </h2>
          <p className="text-lg text-askforge-gray-600 max-w-2xl mx-auto">
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
              className="bg-white p-6 rounded-xl shadow-soft hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] opacity-0 animate-fade-in"
              style={{ animationDelay: `${feature.delay}s` }}
            >
              <div className={`w-12 h-12 bg-${feature.color}/10 rounded-lg mb-4 flex items-center justify-center`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-askforge-gray-600">
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
    <section className="py-16 px-4 bg-white">
      <div ref={benefitsRef} className="container mx-auto max-w-6xl opacity-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-askforge-gray-900">
            Why Choose AskForge?
          </h2>
          <p className="text-lg text-askforge-gray-600 max-w-2xl mx-auto">
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
              icon: <CheckCircle className="h-6 w-6 text-askforge-purple" />,
              title: "Custom Branding",
              description: "Match your brand's look and feel with fully customizable chatbot interfaces."
            },
          ].map((benefit, index) => (
            <div 
              key={index}
              className="border p-6 rounded-xl hover:border-askforge-blue/50 transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-askforge-gray-50 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-askforge-gray-600">
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
        <div className="bg-gradient-to-r from-askforge-blue to-askforge-purple rounded-2xl p-10 text-white shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80')] opacity-10 mix-blend-overlay"></div>
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
              className="bg-white text-askforge-blue hover:bg-askforge-gray-100 transition-all duration-300 hover:scale-105" 
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

// Missing Send icon definition (referenced in the Hero component)
const Send = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

// Main Index component
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
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
