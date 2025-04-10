
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import { 
  MessageSquare, 
  Settings, 
  BarChart, 
  FileText, 
  Menu, 
  X,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from '@/components/theme/ThemeProvider';

type SidebarLinkProps = {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
};

const SidebarLink = ({ to, icon: Icon, children, isActive }: SidebarLinkProps) => (
  <Link to={to} className="w-full">
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start mb-1", 
        isActive 
          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground" 
          : "text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-primary-foreground"
      )}
    >
      <Icon className="mr-2 h-5 w-5" />
      {children}
    </Button>
  </Link>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <Navbar isLoggedIn={true} />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "w-64 border-r border-border bg-card dark:bg-card p-4 transition-all duration-300 ease-in-out",
            !sidebarOpen && "-ml-64"
          )}
        >
          <div className="mb-8 flex justify-between items-center">
            <h2 className="font-semibold text-lg text-foreground dark:text-foreground">Dashboard</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-muted-foreground dark:text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-6">
            <div>
              <h3 className="text-sm uppercase text-muted-foreground dark:text-muted-foreground mb-2">Main</h3>
              <div className="space-y-1">
                <SidebarLink 
                  to="/dashboard" 
                  icon={Home} 
                  isActive={location.pathname === '/dashboard'}
                >
                  Overview
                </SidebarLink>
                <SidebarLink 
                  to="/dashboard/chatbots" 
                  icon={MessageSquare}
                  isActive={location.pathname.includes('/chatbots')}
                >
                  Chatbots
                </SidebarLink>
                <SidebarLink 
                  to="/dashboard/knowledge" 
                  icon={FileText}
                  isActive={location.pathname.includes('/knowledge')}
                >
                  Knowledge Base
                </SidebarLink>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm uppercase text-muted-foreground dark:text-muted-foreground mb-2">Insights</h3>
              <div className="space-y-1">
                <SidebarLink 
                  to="/dashboard/analytics" 
                  icon={BarChart}
                  isActive={location.pathname.includes('/analytics')}
                >
                  Analytics
                </SidebarLink>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm uppercase text-muted-foreground dark:text-muted-foreground mb-2">Settings</h3>
              <div className="space-y-1">
                <SidebarLink 
                  to="/dashboard/settings" 
                  icon={Settings}
                  isActive={location.pathname.includes('/settings')}
                >
                  Settings
                </SidebarLink>
              </div>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 bg-background dark:bg-background/50 p-6 overflow-auto">
          {!sidebarOpen && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="mb-4 bg-card dark:bg-card/80"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
