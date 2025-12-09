"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setMessage('');

    try {
      // TODO: Add your newsletter subscription API call here
      // await subscribeToNewsletter(email);
      console.log('Subscribing email:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setMessage('Failed to subscribe. Please try again.');
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-tight">
              SUBSCRIBE TO OUR
              <br />
              NEWSLETTER NOW!
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-xl">
              Get top trends, exclusive deals, and expert style tips delivered to your inbox weekly.
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2 space-y-3">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter Your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 md:h-14 px-6 rounded-full bg-white border-0 text-base"
              />
              <Button
                onClick={handleSubscribe}
                disabled={isLoading || !email}
                className="h-12 md:h-14 px-8 md:px-12 rounded-full bg-black hover:bg-gray-800 text-white font-semibold text-base"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center lg:text-left">
              Weekly newsletter. Unsubscribe anytime.
            </p>
            {message && (
              <p className={`text-sm text-center lg:text-left ${
                message.includes('Success') ? 'text-green-600' : 'text-red-600'
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;