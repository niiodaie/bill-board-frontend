import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLogin, useRegister, useAuth } from "@/lib/auth";

export default function Auth() {
  const [, setLocation] = useLocation();
  const { data: auth } = useAuth();
  const login = useLogin();
  const register = useRegister();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already authenticated
  if (auth?.user) {
    setLocation("/dashboard");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync(loginData);
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      await register.mutateAsync({
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-darker-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-orbitron font-bold text-neon-cyan neon-text mb-4">
              Join Billboard
            </h1>
            <p className="text-gray-300">
              Create your account and start advertising on the digital billboard
            </p>
          </div>

          <Card className="bg-dark-bg border-gray-700">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-white">
                Get Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger value="login" className="data-[state=active]:bg-neon-pink data-[state=active]:text-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-black">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Email
                      </label>
                      <Input
                        type="email"
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-neon-pink"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Password
                      </label>
                      <Input
                        type="password"
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-neon-pink"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={login.isPending}
                      className="w-full bg-neon-pink hover:bg-pink-600 text-white py-3 font-bold"
                    >
                      {login.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Username
                      </label>
                      <Input
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Email
                      </label>
                      <Input
                        type="email"
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Password
                      </label>
                      <Input
                        type="password"
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        required
                        className="bg-gray-800 border-gray-600 text-white focus:border-neon-cyan"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={register.isPending}
                      className="w-full bg-neon-cyan text-black hover:bg-cyan-400 py-3 font-bold"
                    >
                      {register.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
