"use client";
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/core';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import FacebookIcon from '@/app/icons/social-media/Facebook';
import InstagramIcon from '@/app/icons/social-media/InstagramIcon';
import Linkdin from '@/app/icons/social-media/Linkdin';
import XIcon from '@/app/icons/social-media/XIcon';
import YoutubeIcon from '@/app/icons/social-media/YoutubeIcon';

// Define validation schema
const contactFormSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phoneNo: z.string().min(10, { message: "Please enter a valid phone number" }),
  subject: z.string().min(3, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Background images that will rotate
  const backgroundImages = [
    "/images/about/aboutImage1.png",
    "/images/about/aboutImage2.png",
    
   
  ];

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNo: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const socialMedia = [
    {
      name: "Facebook",
      url: "#",
      icon: <FacebookIcon />
    },
    {
      name: "Twitter",
      url: "#",
      icon: <XIcon />
    },
    {
      name: "Instagram",
      url: "#",
      icon: <InstagramIcon />
    },
    {
      name: "Youtube",
      url: "#",
      icon: <YoutubeIcon />
    },
    {
      name: "Linkedin",  
      url: "#",
      icon: <Linkdin />
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      {/* Contact Form */}
      <div className="bg-[#0A0E1F] rounded-lg p-6 lg:p-8 shadow-lg border border-blue-900/30">
        <h2 className="text-white text-xl font-semibold mb-6">Contact Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full name"
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.fullName ? 'border-red-500' : 'border-transparent'}`}
              {...register('fullName')}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.email ? 'border-red-500' : 'border-transparent'}`}
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <input
              type="tel"
              placeholder="Phone no"
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.phoneNo ? 'border-red-500' : 'border-transparent'}`}
              {...register('phoneNo')}
            />
            {errors.phoneNo && <p className="text-red-500 text-xs mt-1">{errors.phoneNo.message}</p>}
          </div>
          
          <div>
            <input
              type="text"
              placeholder="Subject"
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.subject ? 'border-red-500' : 'border-transparent'}`}
              {...register('subject')}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>
          
          <div>
            <textarea
              placeholder="Message"
              rows={5}
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.message ? 'border-red-500' : 'border-transparent'}`}
              {...register('message')}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-blue-900 hover:bg-blue-100 transition-colors w-full md:w-auto px-8 py-3 rounded-md font-medium"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
      
      {/* Contact Information */}
      <div className="bg-[#0A0E1F] rounded-lg min-h-[500px] overflow-hidden border border-blue-500/30 shadow-lg relative">
        <div className="h-full flex flex-col">
          {/* Image with floating letters - with animation */}
          <div className="relative h-[300px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-[#0A0E1F] z-10"></div>
            
            {/* Animated background images */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <img 
                  src={backgroundImages[currentImageIndex]} 
                  alt="Contact us background" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Fixed "Contact us" text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-20">
              <h2 className="text-4xl font-bold text-white">Contact us</h2>
            </div>
          </div>
          
          {/* Social media and contact info */}
          <div className="bg-[#0F1535] flex-grow absolute bottom-0 w-full  flex flex-col justify-end p-6">
            <div className="flex justify-center space-x-4 mb-6">
              {/* Social Media Icons */}
              {socialMedia.map((icon) => (
                <a 
                  href={icon.url} 
                  key={icon.name}
                  className="flex items-center justify-center h-[2.5rem] w-[2.5rem] border-[0.5px] border-[#4453DD] rounded-10 hover:bg-[#4453DD]/20 transition-colors"
                >
                  {icon.icon}
                </a>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-white font-outfit text-sm">
                Send us a message or call us <span className="font-semibold">08061742380</span><br />
                You can also send us an email at <span className="font-semibold">Opticraftrade@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
