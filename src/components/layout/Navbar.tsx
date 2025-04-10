
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MessageSquare, Bell, User, Sun, Moon } from "lucide-react";
import { useTheme } from '@/components/theme/ThemeProvider';

const Navbar = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b bg-white dark:bg-askforge-gray-900 dark:border-askforge-gray-800 shadow-sm py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-askforge-gray-900/90">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-askforge-blue" />
          <Link to="/" className="text-xl font-bold text-askforge-gray-900 dark:text-white">
            AskForge
          </Link>
        </div>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className="mr-2 text-askforge-gray-600 dark:text-askforge-gray-300 hover:text-askforge-gray-900 dark:hover:text-white">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="hover:text-askforge-blue">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-askforge-blue hover:bg-askforge-blue/90">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
