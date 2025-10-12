"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Phone, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent, ErrorModal } from '@/components/core';
import { motion, AnimatePresence } from 'framer-motion';
import SubscriptionCheckIcon from '@/app/icons/social-media/SubscriptionCheckIcon';
import SubScriptionIcon from '@/app/icons/(dashboard)/SubscriptionIcon';
import { useCreateSubscription } from '../misc/api/subscription/createSubscription';
import { useErrorModalState } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/navigation';

// Zod validation schema
const subscriptionSchema = z.object({
  plan_type: z.enum(['basic', 'average', 'pro'], {
    required_error: "Please select a plan",
  }),
  duration: z.enum(['quarterly', '6-months', 'annually'], {
    required_error: "Please select a billing cycle",
  }),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

const SubscriptionPricing = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
  const [selectedBilling, setSelectedBilling] = useState('quarterly');
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  
  const {
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      duration: 'quarterly'
    }
  });

  const billingOptions = [
    { id: 'quarterly', label: 'Quarterly' },
    { id: '6-months', label: '6-Months' },
    { id: 'annually', label: 'Annually' }
  ];

  // Dynamic pricing based on billing cycle
  const getPricing = (planId: string, duration: string) => {
    const basePrices = {
      basic: { quarterly: 150000, '6-months': 280000, annually: 500000 },
      average: { quarterly: 300000, '6-months': 550000, annually: 1000000 },
      pro: { quarterly: 500000, '6-months': 900000, annually: 1600000 }
    };
    
    const price = basePrices[planId as keyof typeof basePrices][duration as keyof typeof basePrices.basic];
    return `₦${price.toLocaleString()}`;
  };

  const getPeriodLabel = (duration: string) => {
    switch (duration) {
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

  const { mutate: handleSubcription } = useCreateSubscription();
  const queryClient = useQueryClient();
const router = useRouter()
  const onSubmit = async (data: SubscriptionFormData, planId: string) => {
    const planTypeMap: Record<string, string> = {
      basic: 'BASIC',
      average: 'PREMIUM',
      pro: 'PRO'
    };

    const durationMap: Record<string, string> = {
      quarterly: '3_MONTHS',
      '6-months': '6_MONTHS',
      annually: '12_MONTHS'
    };

    const payload = {
      plan_type: planTypeMap[data.plan_type],
      duration: durationMap[data.duration]
    };

    setLoadingPlanId(planId);

    handleSubcription({
      duration: payload?.duration,
      plan_type: payload?.plan_type
    }, {
      onSuccess: (data) => {
        if (data) {
          toast.success("Plan created successfully", { id: "subcriptionToast" });
          queryClient.invalidateQueries({ queryKey: ["user-details"] });
        }
        setLoadingPlanId(null);
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
        setLoadingPlanId(null);
      },
    });
  };

  const handlePlanSelect = (planId: string) => {
    setValue('plan_type', planId as any);
  };

  const handleBillingChange = (billing: string) => {
    setSelectedBilling(billing);
    setValue('duration', billing as any);
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
      {errors.plan_type && (
        <div className="text-red-400 text-center mb-4">
          {errors.plan_type.message}
        </div>
      )}

      {/* Pricing Cards - Mobile Stack, Desktop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
        {plans.map((plan) => {
          const isCurrentLoading = loadingPlanId === plan.id;
          const isAnyLoading = loadingPlanId !== null;
          const isDisabled = isAnyLoading && !isCurrentLoading;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 md:hover:scale-105 cursor-pointer border-2 ${
                plan.cardStyle
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isDisabled && handlePlanSelect(plan.id)}
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
                <SubScriptionIcon />
              </div>

              {/* Plan Name */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">{plan.name}</h3>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex gap-x-3 items-center">
                    <SubscriptionCheckIcon />
                    <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Price - Now Dynamic */}
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-white text-sm mr-2">Amount -</span>
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {getPricing(plan.id, selectedBilling)}
                  </span>
                  <span className="text-gray-300 ml-1 text-sm md:text-base">
                    /{getPeriodLabel(selectedBilling)}
                  </span>
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                type="button"
                onClick={() => {
                  if (!isDisabled) {
                    handlePlanSelect(plan.id);
                    const formData = { plan_type: plan.id as any, duration: selectedBilling as any };
                    onSubmit(formData, plan.id);
                  }
                }}
                disabled={isDisabled}
                className={`w-full py-3 md:py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${plan.buttonStyle} ${
                  isDisabled ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                {isCurrentLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{plan.buttonText}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#090E2980]/50 p-6">
      <div className="max-full">
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="md:text-2xl text-base font-verdana font-bold text-white mb-2">
              Subscribe to Your Preferred Plan
            </h1>
            <p className="text-gray-300 text-sm md:text-lg">
              Select any of the below flexible pricing for your needs.
            </p>
          </div>

          {/* Billing Cycle Tabs */}
          <Tabs defaultValue="quarterly" className="w-full mb-12">
            <div className="sticky top-0 z-10 bg-[#090E2980]/50 backdrop-blur-sm pb-4">
              <TabsList className="w-full justify-start items-center bg-[#090E29] md:pt-3 md:px-8 flex-nowrap overflow-visible">
                {billingOptions.map((option) => (
                  <TabsTrigger 
                    key={option.id} 
                    value={option.id}
                    onClick={() => handleBillingChange(option.id)}
                    disabled={loadingPlanId !== null}
                    className="data-[state=active]:border-b-[2px] px-4 md:px-6 data-[state=active]:border-[#5879FD] rounded-none text-sm md:text-base font-outfit font-medium text-white data-[state=active]:bg-transparent flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <div className="mt-7 w-full">
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
              <h3 className="text-sm md:text-xl font-bold text-white mb-2">
                Do you need assistance or have question?, Speak to our sales team
              </h3>
            </div>
            <button 
            onClick={()=>router.push("/contact")}
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl mt-4 md:mt-0"
            >
              <span>Contact Sales</span>
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      />
    </div>
  );
};

export default SubscriptionPricing;