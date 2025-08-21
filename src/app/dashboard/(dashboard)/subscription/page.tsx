"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Phone } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/core';
import { motion, AnimatePresence } from 'framer-motion';
import SubscriptionCheckIcon from '@/app/icons/social-media/SubscriptionCheckIcon';
import SubScriptionIcon from '@/app/icons/(dashboard)/SubscriptionIcon';

// Zod validation schema
const subscriptionSchema = z.object({
  plan: z.enum(['basic', 'average', 'pro'], {
    required_error: "Please select a plan",
  }),
  billingCycle: z.enum(['quarterly', '6-months', 'annually'], {
    required_error: "Please select a billing cycle",
  }),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

const SubscriptionPricing = () => {
  const [selectedBilling, setSelectedBilling] = useState('quarterly');
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      billingCycle: 'quarterly'
    }
  });

  const watchedPlan = watch('plan');

  const billingOptions = [
    { id: 'quarterly', label: 'Quarterly' },
    { id: '6-months', label: '6-Months' },
    { id: 'annually', label: 'Annually' }
  ];

  // Dynamic pricing based on billing cycle
  const getPricing = (planId: string, billingCycle: string) => {
    const basePrices = {
      basic: { quarterly: 150000, '6-months': 280000, annually: 500000 },
      average: { quarterly: 300000, '6-months': 550000, annually: 1000000 },
      pro: { quarterly: 500000, '6-months': 900000, annually: 1600000 }
    };
    
    const price = basePrices[planId as keyof typeof basePrices][billingCycle as keyof typeof basePrices.basic];
    return `₦${price.toLocaleString()}`;
  };

  const getPeriodLabel = (billingCycle: string) => {
    switch (billingCycle) {
      case 'quarterly': return 'quarterly';
      case '6-months': return 'Bi-Annually';
      case 'annually': return 'Annually';
      default: return 'quarterly';
    }
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      features: ['1 Signal Daily', 'Basic Support', 'Limited Access'],
      buttonText: 'Subscribe',
      buttonStyle: 'bg-gray-700 hover:bg-gray-600 text-white',
      cardStyle: 'bg-[#090E29] border-[#4453DD] border-[0.5px]'
    },
    {
      id: 'average',
      name: 'Average Plan',
      features: ['3 Signals Daily', 'Priority Support', 'Full Access'],
      buttonText: 'Subscribe',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      cardStyle: 'bg-[#4453DD] border-none',
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      features: ['Unlimited Signals', '24/7 Support', 'Exclusive Access'],
      buttonText: 'Upgrade Plan',
      buttonStyle: 'bg-white hover:bg-gray-100 text-gray-900',
      cardStyle: 'bg-[#090E29] border-[#4453DD] border-[0.5px]'
    }
  ];

  const onSubmit = async (data: SubscriptionFormData) => {
    // Simulate form submission
    console.log('Form submitted:', data);
    alert(`Subscribing to ${data.plan} plan with ${data.billingCycle} billing`);
  };

  const handlePlanSelect = (planId: string) => {
    setValue('plan', planId as any);
  };

  const handleBillingChange = (billing: string) => {
    setSelectedBilling(billing);
    setValue('billingCycle', billing as any);
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const renderPricingCards = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={contentVariants}
      transition={{ duration: 0.3 }}
    >
      {/* Error Display */}
      {errors.plan && (
        <div className="text-red-400 text-center mb-4">
          {errors.plan.message}
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${
              plan.cardStyle
            } `}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan Icon */}
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-6">
             <SubScriptionIcon/>
            </div>

            {/* Plan Name */}
            <h3 className="text-2xl font-bold text-white mb-6">{plan.name}</h3>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex  gap-x-3 items-center">
                 <SubscriptionCheckIcon/>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price - Now Dynamic */}
            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-white text-sm mr-2">Amount -</span>
                <span className="text-2xl font-bold text-white">
                  {getPricing(plan.id, selectedBilling)}
                </span>
                <span className="text-gray-300 ml-1">
                  /{getPeriodLabel(selectedBilling)}
                </span>
              </div>
            </div>

            {/* Subscribe Button */}
            <button
              type="button"
              onClick={() => handlePlanSelect(plan.id)}
              className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 ${plan.buttonStyle}`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {/* <div className="text-center mb-8">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || !watchedPlan}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Subscription'}
        </button>
      </div> */}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#090E2980]/50 p-6">
      <div className="max-w-7xl mx-auto">
        <div>
          {/* Header */}
          <div className=" mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Subscribe to Your Preferred Plan
            </h1>
            <p className="text-gray-300 text-lg">
              Select any of the below flexible pricing for your needs.
            </p>
          </div>

          {/* Billing Cycle Tabs */}
          <Tabs defaultValue="quarterly" className="w-full mb-12">
            <TabsList className="w-full justify-start items-center bg-[#090E29] md:pt-3 md:px-8">
              {billingOptions.map((option) => (
                <TabsTrigger 
                  key={option.id} 
                  value={option.id}
                  onClick={() => handleBillingChange(option.id)}
                  className="data-[state=active]:border-b-[2px] max-sm:px-3 data-[state=active]:border-[#5879FD] rounded-none text-sm md:text-base font-outfit font-medium text-white data-[state=active]:bg-transparent"
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence  mode="wait">
                <div className="mt-7">
              <TabsContent value="quarterly">
                {renderPricingCards()}
              </TabsContent>

              <TabsContent value="6-months">
                {renderPricingCards()}
              </TabsContent>

              <TabsContent value="annually">
                {renderPricingCards()}
              </TabsContent>

                </div>
            </AnimatePresence>
          </Tabs>
        </div>

        {/* Contact Sales Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Do you need assistance or have question?, Speak to our sales team
              </h3>
            </div>
            <button 
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl mt-4 md:mt-0"
            >
              <span>Contact Sales</span>
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPricing;