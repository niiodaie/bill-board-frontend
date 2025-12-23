import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const CheckoutForm = ({ amount, placement }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast();
    const [, setLocation] = useLocation();
    const [processing, setProcessing] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        if (!stripe || !elements) {
            setProcessing(false);
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard`,
            },
        });
        if (error) {
            toast({
                title: "Payment Failed",
                description: error.message,
                variant: "destructive",
            });
        }
        else {
            toast({
                title: "Payment Successful",
                description: "Your campaign is now live!",
            });
            setLocation('/dashboard');
        }
        setProcessing(false);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx("div", { className: "bg-gray-800 p-6 rounded-lg", children: _jsx(PaymentElement, { options: {
                        layout: 'tabs'
                    } }) }), _jsx(Button, { type: "submit", disabled: !stripe || processing, className: "w-full bg-neon-gold text-black py-4 text-lg font-bold hover:bg-yellow-500", children: processing ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" }), "Processing Payment..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fas fa-credit-card mr-2" }), "Pay $", amount, " - Launch Campaign"] })) })] }));
};
export default function Checkout() {
    const [, setLocation] = useLocation();
    const { data: auth, isLoading } = useAuth();
    const { toast } = useToast();
    const [clientSecret, setClientSecret] = useState("");
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const placement = urlParams.get('placement') || 'standard';
    const amount = parseFloat(urlParams.get('amount') || '99');
    const placementDetails = {
        premium: {
            name: "Premium Banner",
            description: "Top billboard placement with maximum visibility",
            features: ["Prime top position", "50K+ daily impressions", "Premium analytics", "Priority support"],
            icon: "👑"
        },
        featured: {
            name: "Featured Slot",
            description: "Center billboard placement with high engagement",
            features: ["Center position", "30K+ daily impressions", "Advanced analytics", "Standard support"],
            icon: "⭐"
        },
        standard: {
            name: "Standard Slot",
            description: "Side billboard placement for targeted reach",
            features: ["Side position", "15K+ daily impressions", "Basic analytics", "Email support"],
            icon: "📍"
        }
    };
    const selectedPlacement = placementDetails[placement];
    useEffect(() => {
        if (!auth?.user && !isLoading) {
            setLocation('/auth');
            return;
        }
        if (auth?.user && !clientSecret) {
            // Create PaymentIntent as soon as the page loads
            apiRequest("POST", "/api/create-payment-intent", {
                amount: amount,
                campaignId: 1 // This would come from the campaign creation flow
            })
                .then((res) => res.json())
                .then((data) => {
                setClientSecret(data.clientSecret);
            })
                .catch((error) => {
                toast({
                    title: "Error",
                    description: "Failed to initialize payment",
                    variant: "destructive",
                });
            });
        }
    }, [auth, isLoading, amount, clientSecret, setLocation, toast]);
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-darker-bg flex items-center justify-center", children: _jsx("div", { className: "w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" }) }));
    }
    if (!auth?.user) {
        return null; // Will redirect in useEffect
    }
    if (!clientSecret) {
        return (_jsxs("div", { className: "min-h-screen bg-darker-bg", children: [_jsx(Navigation, {}), _jsx("div", { className: "container mx-auto px-4 py-20", children: _jsx("div", { className: "max-w-md mx-auto flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-gray-400", children: "Initializing payment..." })] }) }) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-darker-bg", children: [_jsx(Navigation, {}), _jsx("div", { className: "container mx-auto px-4 py-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-orbitron font-bold mb-4 text-neon-gold neon-text", children: "COMPLETE YOUR ORDER" }), _jsx("p", { className: "text-xl text-gray-300", children: "Secure payment powered by Stripe" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs(Card, { className: "bg-dark-bg border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-2xl font-bold text-white flex items-center", children: [_jsx("i", { className: "fas fa-receipt mr-3 text-neon-cyan" }), "Order Summary"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "bg-gray-800 p-6 rounded-lg border-2 border-neon-gold", children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx("span", { className: "text-3xl mr-3", children: selectedPlacement.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: selectedPlacement.name }), _jsx("p", { className: "text-gray-400", children: selectedPlacement.description })] })] }), _jsx("div", { className: "space-y-2", children: selectedPlacement.features.map((feature, index) => (_jsxs("div", { className: "flex items-center text-sm text-gray-300", children: [_jsx("i", { className: "fas fa-check text-green-400 mr-2" }), feature] }, index))) })] }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h4", { className: "text-lg font-semibold text-white mb-4", children: "Pricing Breakdown" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Daily Rate" }), _jsxs("span", { className: "text-white", children: ["$", amount.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Setup Fee" }), _jsx("span", { className: "text-white", children: "$0.00" })] }), _jsx("div", { className: "border-t border-gray-600 pt-3", children: _jsxs("div", { className: "flex justify-between text-lg font-bold", children: [_jsx("span", { className: "text-white", children: "Total Today" }), _jsxs("span", { className: "text-neon-gold", children: ["$", amount.toFixed(2)] })] }) })] })] }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsx("h4", { className: "text-lg font-semibold text-white mb-4", children: "Campaign Details" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Billing Cycle" }), _jsx("span", { className: "text-white", children: "Daily" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Campaign Duration" }), _jsx("span", { className: "text-white", children: "Until paused" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Auto-renewal" }), _jsx(Badge, { className: "bg-green-500 text-white", children: "Enabled" })] })] })] }), _jsx("div", { className: "bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-500", children: _jsxs("div", { className: "flex items-start", children: [_jsx("i", { className: "fas fa-shield-alt text-blue-400 mr-3 mt-1" }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-blue-400 mb-1", children: "Secure Payment" }), _jsx("p", { className: "text-sm text-blue-300", children: "Your payment information is encrypted and secure. Powered by Stripe." })] })] }) })] })] }), _jsxs(Card, { className: "bg-dark-bg border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-2xl font-bold text-white flex items-center", children: [_jsx("i", { className: "fas fa-credit-card mr-3 text-neon-pink" }), "Payment Information"] }) }), _jsxs(CardContent, { children: [_jsx(Elements, { stripe: stripePromise, options: { clientSecret }, children: _jsx(CheckoutForm, { amount: amount, placement: placement }) }), _jsxs("div", { className: "mt-6 text-center", children: [_jsxs("div", { className: "flex items-center justify-center space-x-4 text-gray-400", children: [_jsx("i", { className: "fab fa-cc-visa text-2xl" }), _jsx("i", { className: "fab fa-cc-mastercard text-2xl" }), _jsx("i", { className: "fab fa-cc-amex text-2xl" }), _jsx("i", { className: "fab fa-cc-discover text-2xl" })] }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "We accept all major credit cards" })] }), _jsxs("div", { className: "mt-6 p-4 bg-gray-800 rounded-lg", children: [_jsx("h5", { className: "font-semibold text-white mb-2", children: "Money-Back Guarantee" }), _jsx("p", { className: "text-sm text-gray-400", children: "Not satisfied with your campaign performance? Contact us within 7 days for a full refund." })] })] })] })] })] }) })] }));
}
