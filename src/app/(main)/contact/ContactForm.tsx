"use client";
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ErrorModal } from '@/components/core';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import FacebookIcon from '@/app/icons/social-media/Facebook';
import InstagramIcon from '@/app/icons/social-media/InstagramIcon';
import Linkdin from '@/app/icons/social-media/Linkdin';
import XIcon from '@/app/icons/social-media/XIcon';
import YoutubeIcon from '@/app/icons/social-media/YoutubeIcon';
import { useContactUs } from '@/app/(auth)/(onboarding)/api/contact/contactUs';
import { useErrorModalState } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import { useAuth } from '@/contexts/authentication';

// Define validation schema
const contactFormSchema = z.object({
  first_name: z.string().min(3, { message: "first name is required" }),
  last_name: z.string().min(3, { message: "last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  subject: z.string().min(3, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const {authState}=useAuth()
  const {user}=authState
  const {
      isErrorModalOpen,
      setErrorModalState,
      openErrorModalWithMessage,
      errorModalMessage,
    } = useErrorModalState();
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
      first_name: user?.full_name?.split(" ")[0]||'',
      last_name:user?.full_name?.split(" ")[1]||'',
      email:user?.email|| '',
      phone:user?.phone_number|| '',
      subject:'',
      message: ''
    }
  });
const {mutate:handleContact,isLoading}=useContactUs()
  const onSubmit =  ({email,first_name,last_name,message,phone,subject}: ContactFormValues) => {
   handleContact({
       email,first_name,last_name,message,phone,subject
       },{
         onSuccess:(data)=>{
           if(data){
           toast.success("Message sent successfully")
           reset()
           }
         },
         onError: (error) => {
           const errorMessage = formatAxiosErrorMessage(error as AxiosError);
           openErrorModalWithMessage(String(errorMessage));
         },
       })
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="first name"
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.first_name ? 'border-red-500' : 'border-transparent'}`}
              {...register('first_name')}
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.last_name ? 'border-red-500' : 'border-transparent'}`}
              {...register('last_name')}
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
          </div>

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
              className={`w-full bg-[#131B31] text-white rounded-md p-4 outline-none border ${errors.phone ? 'border-red-500' : 'border-transparent'}`}
              {...register('phone')}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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
              disabled={isLoading}
              className="bg-white text-blue-900 hover:bg-blue-100 transition-colors w-full md:w-auto px-8 py-3 rounded-md font-medium"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
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
       <ErrorModal
              isErrorModalOpen={isErrorModalOpen}
              setErrorModalState={() => {
                setErrorModalState(false);
              }}
              subheading={
                errorModalMessage ||
                "Please check your inputs and try again."
              }
            ></ErrorModal>
    </div>
  );
};

export default ContactForm;
