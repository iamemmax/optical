"use client"
import React, { useEffect, useState } from 'react'
import DashboardHeader from './(dashboard)/components/navigation/DashboardHeader'
import Sidebar from './(dashboard)/components/navigation/Sidebar'
import MobileNav from './(dashboard)/components/navigation/MobileNav'
import { useUser } from '../(auth)/(onboarding)/api/getUserDetails'
import { AccountVerificationModal } from './profile/Verification'

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useUser();

  useEffect(() => {
    if (data?.onboarding_progress) {
      const { bvn_verified, face_verified, has_withdrawal_pin } = data.onboarding_progress;
      const needsVerification = !bvn_verified || !face_verified || !has_withdrawal_pin;
      setIsModalOpen(needsVerification);
    }
  }, [data?.onboarding_progress?.bvn_verified, data?.onboarding_progress?.face_verified, data?.onboarding_progress?.has_withdrawal_pin]);

  const handleVerificationComplete = () => {
    console.log('Verification completed!');
    alert('Account verification completed successfully!');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[auto_1fr] h-full">
        <div className="bg-[#090E29] h-full">
          <Sidebar />
        </div>
        <div className="w-full h-full">
          <DashboardHeader />
          <main className="p-6 overflow-y-auto h-[calc(100vh-98px)]">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-screen">
        <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
        <MobileNav 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </div>

      {/* Verification Modal - Rendered at root level for better positioning */}
      {isModalOpen && (
        <AccountVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleVerificationComplete}
          user={data}
        />
      )}
    </div>
  );
};

export default DashboardLayout;