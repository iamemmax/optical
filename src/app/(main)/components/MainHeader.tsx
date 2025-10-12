"use client";

import React, { useState, useEffect, useRef } from "react";
import OpticalLogo from "@/app/icons/Logo";
import RightArrowIcon from "@/app/icons/RightArrow";
import { Button, LinkButton } from "@/components/core";
import { motion, AnimatePresence } from "framer-motion";
import { toggleBodyScroll } from '@/utils/inputs';
import { useActivePath } from '@/utils/navigation';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authentication";
import { useQueryClient } from "react-query";
import { tokenStorage } from "@/app/(auth)/(onboarding)/misc/utils";
import Image from "next/image";
import { CaretDown } from "@/components/icons";
import DashboardIcon from "@/app/icons/(dashboard)/DashboardIcon";

export const MainHeader = () => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = useActivePath();
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
 const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    toggleBodyScroll(menuOpen);
    return () => toggleBodyScroll(false);
  }, [menuOpen]);

  const navlinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "FAQs", href: "/faqs" },
    // { title: "Blog", href: "/blog" },
  ];

  // Simpler menu variants
  const menuVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 40px) 40px)",
      opacity: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  // Simpler item variants
  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Wave animation for the menu background
  const waveVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
      },
    },
  };
  const queryClient = useQueryClient()
  const { replace } = useRouter();
  const { authDispatch,authState:{user,isAuthenticated} } = useAuth();
 const handleLogOut = () => {
    if (authDispatch) authDispatch({ type: 'LOGOUT' });
    queryClient.clear();
    tokenStorage.clearAll()
    // tokenStorage.clearToken()
    replace('/login');
  };
  return (
    <div className="relative w-full !z-[99999999999999999]">
      {/* Desktop Header */}
      <motion.header 
        className={`hidden fixed w-full !z-[99999999999999999] bg-blue-900 px-4 md:px-[2rem] xl:px-[4.5rem] lg:flex justify-between items-center py-6 transition-all duration-300 ${
          scrolled ? 'bg-opacity-95 backdrop-blur-sm shadow-lg' : 'bg-opacity-0'
        }`}
        initial={{ backgroundColor: "rgba(30, 58, 138, 0)" }}
        animate={{ 
          backgroundColor: scrolled ? "rgba(30, 58, 138, 0.95)" : "rgba(30, 58, 138, 0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <LinkButton
          className="text-white bg-transparent font-verdana font-bold text-xl flex p-0 items-center gap-2"
          href="/"
        >
          <OpticalLogo /> Opticraft Trading
        </LinkButton>

        <nav>
          <ul className="flex gap-6 items-center">
            {navlinks.map((link, index) => (
              <li key={index}>
                <LinkButton
                  className={`text-white bg-transparent font-outfit text-base p-0 font-normal relative ${
                    isActive(link.href) ? ' after:content-[""] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-white' : ''
                  }`}
                  href={link.href}
                >
                  {link.title}
                </LinkButton>
              </li>
            ))}
          </ul>
        </nav>

{
  isAuthenticated ?  
  
 <div className="flex items-center gap-3 relative">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="relative  rounded-full overflow-hidden bg-[#122251] text-white flex items-center justify-center w-[2rem] h-[2rem] md:w-[2.5rem] md:h-[2.5rem] border border-[#4453DD]/40"   onClick={toggleDropdown}>
          {user?.profile_image ? (
            <Image
              alt=""
              className="object-cover"
              src={user.profile_image}
              height={40}
              width={40}
            />
          ) : (
            <span className="text-sm font-medium">
              {user?.full_name
                ?.split(" ")
                .map((n: string) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* User Info + Dropdown */}
      <div className="relative" ref={dropdownRef}>
       

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-[110%] w-40 bg-[#0F1B47] border border-[#2D3D8B]/30 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              {/* Mobile user info */}
              <div className="sm:hidden px-4 py-2 border-b border-[#4453DD]/30">
                <h3 className="text-white font-semibold text-sm">{user?.full_name ?? ""}</h3>
                <p className="text-white/70 text-xs">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  replace("/dashboard")
                }}
                className="w-full border-b-[0.3px] border-[#565656] text-left px-4 py-2 text-white/90 hover:bg-[#1A2A68] transition-colors font-verdana text-sm flex items-center gap-2"
              >
                <DashboardIcon/>
                Dashboard
              </button>

              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  handleLogOut()
                }}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/20 transition-colors font-verdana text-sm flex items-center gap-2"
              >
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
        
         
        
        :
        <Button className="bg-white text-sm text-[#2B3AA6] rounded-10 rounded-s-[24px] rounded-e-[24px] gap-4 flex items-center px-6 py-[0.625rem] font-outfit" onClick={()=>router.replace("/login")}>
          Get Started{" "}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.9813 3.64671C9.07505 3.55308 9.20213 3.50049 9.33463 3.50049C9.46714 3.50049 9.59422 3.55308 9.68797 3.64671L13.688 7.64672C13.7816 7.74047 13.8342 7.86755 13.8342 8.00005C13.8342 8.13255 13.7816 8.25963 13.688 8.35338L9.68797 12.3534C9.64219 12.4025 9.58699 12.4419 9.52566 12.4692C9.46433 12.4966 9.39812 12.5113 9.33098 12.5124C9.26385 12.5136 9.19716 12.5013 9.1349 12.4761C9.07264 12.451 9.01609 12.4136 8.96861 12.3661C8.92113 12.3186 8.8837 12.262 8.85855 12.1998C8.83341 12.1375 8.82106 12.0708 8.82224 12.0037C8.82342 11.9366 8.83812 11.8704 8.86545 11.809C8.89278 11.7477 8.93218 11.6925 8.9813 11.6467L12.128 8.50005H2.66797C2.53536 8.50005 2.40818 8.44737 2.31442 8.3536C2.22065 8.25983 2.16797 8.13266 2.16797 8.00005C2.16797 7.86744 2.22065 7.74026 2.31442 7.6465C2.40818 7.55273 2.53536 7.50005 2.66797 7.50005H12.128L8.9813 4.35338C8.88767 4.25963 8.83507 4.13255 8.83507 4.00005C8.83507 3.86755 8.88767 3.74047 8.9813 3.64671Z"
              fill="#2B3AA6"
            />
          </svg>
        </Button>
}
      </motion.header>

      {/* Mobile Header */}
     
<motion.header 
  className={`flex justify-between lg:hidden fixed w-full bg-blue-900 px-4 md:px-[2rem] xl:px-[4.5rem] pt-[1rem] items-center py-6 pr-4 transition-all duration-300 ${
    scrolled ? 'bg-opacity-95 backdrop-blur-sm shadow-lg' : 'bg-opacity-0'
  } ${menuOpen ? '!z-[9999999999999999999]' : 'z-[9999999'}`}
  initial={{ backgroundColor: "rgba(30, 58, 138, 0)" }}
  animate={{ 
    backgroundColor: scrolled ? "rgba(30, 58, 138, 0.95)" : "rgba(30, 58, 138, 0)",
  }}
  transition={{ duration: 0.3 }}
>
  {/* Left: Logo */}
  <LinkButton
    className="text-white font-verdana p-0 font-bold text-lg bg-transparent flex items-center gap-2"
    href="/"
  >
    <OpticalLogo /> 
    <span>Opticraft</span>
  </LinkButton>

  {/* Right: Avatar + Hamburger */}
  <div className="flex items-center gap-2 pr-4">
    {/* Avatar Dropdown (only if authenticated) */}
    {isAuthenticated && (
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={toggleDropdown}
        >
          <div   onClick={toggleDropdown} className="relative rounded-full overflow-hidden bg-[#122251] text-white flex items-center justify-center w-[2rem] h-[2rem] border border-[#4453DD]/40">
            {user?.profile_image ? (
              <Image
                alt=""
                className="object-cover"
                src={user.profile_image}
                height={32}
                width={32}
              />
            ) : (
              <span className="text-xs font-medium">
                {user?.full_name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
        
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 top-[110%] w-40 bg-[#0F1B47] border border-[#2D3D8B]/30 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="py-2">
              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  replace("/dashboard")
                }}
                className="w-full border-b-[0.3px] border-[#565656] text-left px-4 py-2 text-white/90 hover:bg-[#1A2A68] transition-colors text-sm flex items-center gap-2"
              >
                <DashboardIcon/>
                Dashboard
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false)
                  handleLogOut()
                }}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/20 transition-colors text-sm flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    )}

    {/* Hamburger */}
    <motion.button
      onClick={() => setMenuOpen((prev) => !prev)}
      className="text-white focus:outline-none z-50 relative"
      aria-label="Toggle menu"
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative w-6 h-6">
        <motion.span
          className="absolute bg-white h-0.5 w-full rounded-full"
          style={{ top: "30%" }}
          animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute bg-white h-0.5 w-full rounded-full"
          style={{ top: "50%" }}
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute bg-white h-0.5 w-full rounded-full"
          style={{ top: "70%" }}
          animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  </div>
</motion.header>


      {/* Mobile Dropdown with Creative Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden fixed top-0 left-0 w-full h-screen z-[100000] bg-[#4649E5]/95 text-white flex flex-col overflow-hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Wave background effect */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 w-full h-24 opacity-20"
                  style={{
                    backgroundColor: "#5968C5",
                    borderRadius: "50% 50% 0 0",
                    left: 0,
                    right: 0,
                    height: `${110 + i * 40}px`,
                    bottom: `${-40 - i * 15}px`,
                  }}
                  variants={waveVariants}
                  animate="animate"
                  custom={i}
                  transition={{
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Interactive particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-blue-300 rounded-full w-2 h-2"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.7, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 1,
                  }}
                />
              ))}
            </div>

            <nav className="flex justify-center items-center h-full relative z-10 px-6">
              <ul className="flex flex-col justify-center items-center w-full">
                {navlinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="my-4 overflow-hidden"
                  >
                    <LinkButton
                      className={`text-white font-outfit bg-transparent text-lg font-normal py-2 relative group flex items-center ${
                        isActive(link.href) ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white' : ''
                      }`
                    }
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="relative">
                        {link.title}
                        {!isActive(link.href) && (
                          <motion.span
                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-white"
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </span>
                    </LinkButton>
                  </motion.li>
                ))}

                {!isAuthenticated?<motion.li variants={itemVariants} className="mt-8">
                  <Button className="bg-white text-[#2B3AA6] rounded-lg gap-3 flex items-center px-5 py-2 font-outfit" onClick={()=>router.replace("/login")}>
                    Get Started
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <RightArrowIcon />
                    </motion.div>
                  </Button>
                </motion.li>
                :

                
               <LinkButton
                      className={`text-white font-outfit bg-transparent text-lg font-normal py-2 relative group flex items-center ${
                        isActive("/dashboard") ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white' : ''
                      }`
                    }
                      href={"/dashboard"}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="relative">
                        Dashboard
                        {!isActive("/dashboard") && (
                          <motion.span
                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-white"
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </span>
                    </LinkButton>
              }
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
