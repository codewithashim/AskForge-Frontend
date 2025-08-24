
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { toast } from "sonner";
import Navbar from '@/app/layouts/Navbar';
import { MessageSquare } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock signup - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 bg-chatcanvas-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MessageSquare className="h-8 w-8 text-chatcanvas-blue" />
              <h1 className="text-2xl font-bold">ChatCanvas</h1>
            </div>
            <h2 className="text-2xl font-bold text-chatcanvas-gray-900">Create an Account</h2>
            <p className="text-chatcanvas-gray-500">Sign up for your ChatCanvas account</p>
          </div>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Fill in your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-chatcanvas-gray-500">
                    Password must be at least 8 characters long
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="w-full text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-chatcanvas-blue hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
          
          <p className="text-center mt-8 text-sm text-chatcanvas-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-chatcanvas-blue hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-chatcanvas-blue hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
