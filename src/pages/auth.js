import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login.mutateAsync(loginData);
            toast({
                title: "Success",
                description: "Welcome back!",
            });
            setLocation("/dashboard");
        }
        catch (error) {
            toast({
                title: "Login Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };
    const handleRegister = async (e) => {
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
        }
        catch (error) {
            toast({
                title: "Registration Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-darker-bg", children: [_jsx(Navigation, {}), _jsx("div", { className: "container mx-auto px-4 py-20", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-orbitron font-bold text-neon-cyan neon-text mb-4", children: "Join Billboard" }), _jsx("p", { className: "text-gray-300", children: "Create your account and start advertising on the digital billboard" })] }), _jsxs(Card, { className: "bg-dark-bg border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-center text-2xl font-bold text-white", children: "Get Started" }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "login", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 bg-gray-800", children: [_jsx(TabsTrigger, { value: "login", className: "data-[state=active]:bg-neon-pink data-[state=active]:text-white", children: "Sign In" }), _jsx(TabsTrigger, { value: "register", className: "data-[state=active]:bg-neon-cyan data-[state=active]:text-black", children: "Sign Up" })] }), _jsx(TabsContent, { value: "login", children: _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Email" }), _jsx(Input, { type: "email", required: true, className: "bg-gray-800 border-gray-600 text-white focus:border-neon-pink", value: loginData.email, onChange: (e) => setLoginData({ ...loginData, email: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Password" }), _jsx(Input, { type: "password", required: true, className: "bg-gray-800 border-gray-600 text-white focus:border-neon-pink", value: loginData.password, onChange: (e) => setLoginData({ ...loginData, password: e.target.value }) })] }), _jsx(Button, { type: "submit", disabled: login.isPending, className: "w-full bg-neon-pink hover:bg-pink-600 text-white py-3 font-bold", children: login.isPending ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), "Signing in..."] })) : ("Sign In") })] }) }), _jsx(TabsContent, { value: "register", children: _jsxs("form", { onSubmit: handleRegister, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Username" }), _jsx(Input, { required: true, className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", value: registerData.username, onChange: (e) => setRegisterData({ ...registerData, username: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Email" }), _jsx(Input, { type: "email", required: true, className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", value: registerData.email, onChange: (e) => setRegisterData({ ...registerData, email: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Password" }), _jsx(Input, { type: "password", required: true, className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", value: registerData.password, onChange: (e) => setRegisterData({ ...registerData, password: e.target.value }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Confirm Password" }), _jsx(Input, { type: "password", required: true, className: "bg-gray-800 border-gray-600 text-white focus:border-neon-cyan", value: registerData.confirmPassword, onChange: (e) => setRegisterData({ ...registerData, confirmPassword: e.target.value }) })] }), _jsx(Button, { type: "submit", disabled: register.isPending, className: "w-full bg-neon-cyan text-black hover:bg-cyan-400 py-3 font-bold", children: register.isPending ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" }), "Creating account..."] })) : ("Create Account") })] }) })] }) })] })] }) })] }));
}
