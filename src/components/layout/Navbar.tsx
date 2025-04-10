
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MessageSquare, Bell, User } from "lucide-react";

const Navbar = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  return (
    <nav className="border-b bg-white shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-askforge-blue" />
          <Link to="/" className="text-xl font-bold text-askforge-gray-900">
            AskForge
          </Link>
        </div>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
