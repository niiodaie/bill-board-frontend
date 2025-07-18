import { Navigation } from "@/components/navigation";
import { Billboard } from "@/components/billboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-darker-bg text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 billboard-gradient opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 neon-text text-neon-cyan animate-neon-flicker">
            DIGITAL BILLBOARD
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
            The Times Square of the internet. Create, display, and manage ads on the most vibrant digital advertising platform.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/create-ad">
              <Button className="bg-neon-pink hover:bg-pink-600 px-8 py-4 text-lg font-bold animate-pulse-glow">
                Launch Your Ad Campaign
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-2 border-neon-gold text-neon-gold hover:bg-neon-gold hover:text-black px-8 py-4 text-lg font-bold"
              onClick={() => {
                document.getElementById('billboard')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Live Billboard
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-dark-bg border-gray-700">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-neon-pink mb-2">1,247</div>
                <div className="text-gray-400">Active Ads</div>
              </CardContent>
            </Card>
            <Card className="bg-dark-bg border-gray-700">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-neon-cyan mb-2">2.8M</div>
                <div className="text-gray-400">Daily Views</div>
              </CardContent>
            </Card>
            <Card className="bg-dark-bg border-gray-700">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-neon-gold mb-2">15,000+</div>
                <div className="text-gray-400">Advertisers</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Billboard Display */}
      <section id="billboard" className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold mb-4 text-neon-gold neon-text">LIVE BILLBOARD</h2>
            <p className="text-xl text-gray-300">Experience the most dynamic advertising space on the web</p>
          </div>
          
          <Billboard />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-darker-bg to-dark-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-orbitron font-bold mb-4 text-neon-gold neon-text">PRICING PLANS</h2>
            <p className="text-xl text-gray-300">Choose the perfect advertising package for your needs</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="bg-dark-bg border-gray-700 relative">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <div className="text-4xl font-bold text-neon-cyan mb-2">
                    $99<span className="text-lg text-gray-400">/day</span>
                  </div>
                  <p className="text-gray-400">Perfect for small businesses</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Standard billboard slots
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Up to 15K daily impressions
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    AI ad creation (5/month)
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Email support
                  </li>
                </ul>
                <Link href="/auth">
                  <Button className="w-full bg-neon-cyan text-black hover:bg-cyan-400">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="bg-dark-bg border-2 border-neon-pink relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-neon-pink text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <div className="text-4xl font-bold text-neon-pink mb-2">
                    $199<span className="text-lg text-gray-400">/day</span>
                  </div>
                  <p className="text-gray-400">Best for growing businesses</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Featured billboard slots
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Up to 30K daily impressions
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Advanced analytics & insights
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Unlimited AI ad creation
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Geographic targeting
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Priority support
                  </li>
                </ul>
                <Link href="/auth">
                  <Button className="w-full bg-neon-pink text-white hover:bg-pink-600 animate-pulse-glow">
                    Choose Professional
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-dark-bg border-gray-700 relative">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-neon-gold mb-2">
                    $299<span className="text-lg text-gray-400">/day</span>
                  </div>
                  <p className="text-gray-400">For large-scale campaigns</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Premium billboard slots
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Up to 50K daily impressions
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Real-time analytics dashboard
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Custom AI ad generation
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Advanced targeting options
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-green-400 mr-3"></i>
                    Dedicated account manager
                  </li>
                </ul>
                <Button className="w-full bg-neon-gold text-black hover:bg-yellow-500">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-8">Why Choose Billboard?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-neon-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-rocket text-2xl text-white"></i>
                </div>
                <h4 className="text-xl font-semibold mb-2">Instant Launch</h4>
                <p className="text-gray-400">Get your ads live in minutes, not days</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-neon-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-2xl text-black"></i>
                </div>
                <h4 className="text-xl font-semibold mb-2">Real-time Analytics</h4>
                <p className="text-gray-400">Track performance with detailed insights</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-neon-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-2xl text-black"></i>
                </div>
                <h4 className="text-xl font-semibold mb-2">Quality Guarantee</h4>
                <p className="text-gray-400">Premium placements with maximum visibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darker-bg border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-orbitron font-bold text-neon-pink mb-4">Billboard</h3>
              <p className="text-gray-400 mb-4">The most dynamic digital advertising platform on the web.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-neon-gold transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#billboard" className="hover:text-white transition-colors">Live Billboard</a></li>
                <li><Link href="/create-ad"><a className="hover:text-white transition-colors">Create Ads</a></Link></li>
                <li><Link href="/dashboard"><a className="hover:text-white transition-colors">Analytics</a></Link></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Billboard. All rights reserved. Built for the digital advertising revolution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
