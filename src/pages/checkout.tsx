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

const CheckoutForm = ({ amount, placement }: { amount: number; placement: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    } else {
      toast({
        title: "Payment Successful",
        description: "Your campaign is now live!",
      });
      setLocation('/dashboard');
    }
    
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-neon-gold text-black py-4 text-lg font-bold hover:bg-yellow-500"
      >
        {processing ? (
          <>
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <i className="fas fa-credit-card mr-2"></i>
            Pay ${amount} - Launch Campaign
          </>
        )}
      </Button>
    </form>
  );
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

  const selectedPlacement = placementDetails[placement as keyof typeof placementDetails];

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
    return (
      <div className="min-h-screen bg-darker-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth?.user) {
    return null; // Will redirect in useEffect
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-darker-bg">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Initializing payment...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darker-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-orbitron font-bold mb-4 text-neon-gold neon-text">
              COMPLETE YOUR ORDER
            </h1>
            <p className="text-xl text-gray-300">Secure payment powered by Stripe</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="bg-dark-bg border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <i className="fas fa-receipt mr-3 text-neon-cyan"></i>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Placement Details */}
                <div className="bg-gray-800 p-6 rounded-lg border-2 border-neon-gold">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{selectedPlacement.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedPlacement.name}</h3>
                      <p className="text-gray-400">{selectedPlacement.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedPlacement.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-300">
                        <i className="fas fa-check text-green-400 mr-2"></i>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-4">Pricing Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily Rate</span>
                      <span className="text-white">${amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Setup Fee</span>
                      <span className="text-white">$0.00</span>
                    </div>
                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total Today</span>
                        <span className="text-neon-gold">${amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-4">Campaign Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Billing Cycle</span>
                      <span className="text-white">Daily</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Campaign Duration</span>
                      <span className="text-white">Until paused</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Auto-renewal</span>
                      <Badge className="bg-green-500 text-white">Enabled</Badge>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-blue-500">
                  <div className="flex items-start">
                    <i className="fas fa-shield-alt text-blue-400 mr-3 mt-1"></i>
                    <div>
                      <h5 className="font-semibold text-blue-400 mb-1">Secure Payment</h5>
                      <p className="text-sm text-blue-300">
                        Your payment information is encrypted and secure. Powered by Stripe.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="bg-dark-bg border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <i className="fas fa-credit-card mr-3 text-neon-pink"></i>
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm amount={amount} placement={placement} />
                </Elements>
                
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-4 text-gray-400">
                    <i className="fab fa-cc-visa text-2xl"></i>
                    <i className="fab fa-cc-mastercard text-2xl"></i>
                    <i className="fab fa-cc-amex text-2xl"></i>
                    <i className="fab fa-cc-discover text-2xl"></i>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    We accept all major credit cards
                  </p>
                </div>
                
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h5 className="font-semibold text-white mb-2">Money-Back Guarantee</h5>
                  <p className="text-sm text-gray-400">
                    Not satisfied with your campaign performance? Contact us within 7 days for a full refund.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
