import NotificationIcon from '@/app/icons/(dashboard)/NotificationIcon'
import { Button } from '@/components/core'
import { CaretDown } from '@/components/icons'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@/app/(auth)/(onboarding)/api/getUserDetails'
import { useQueryClient } from 'react-query'
import { useAuth } from '@/contexts/authentication'
import { tokenStorage } from '@/app/(auth)/(onboarding)/misc/utils'

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const getPageTitle = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
  const lastSegment = pathSegments[pathSegments.length - 1]?.replace(/[-]/g," " );
  return lastSegment?.charAt(0).toUpperCase() + lastSegment.slice(1);
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const user = useUser()
  const queryClient = useQueryClient()
  const { replace } = useRouter();
  const { authDispatch, authState } = useAuth();

  const handleLogOut = () => {
    if (authDispatch) authDispatch({ type: 'LOGOUT' });
    queryClient.clear();
     tokenStorage.clearAll()
        // tokenStorage.clearToken()
    replace('/login');
  };

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

  return (
    <div className='flex justify-between items-center px-4 lg:px-[2.625rem] border-b-[.0187rem] border-[#4453DD] border-opacity-50 h-[4.375rem] md:h-[5.625rem] w-full'>
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-white hover:bg-[#4453DD]/10 rounded-lg"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className='text-white font-bold font-verdana text-sm lg:text-2xl'>{getPageTitle(usePathname())}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="md:w-[2.5rem] md:h-[2.5rem] h-[2rem] w-[2rem] rounded-full flex justify-center items-center bg-[#122251]">
          <Button className="p-0 bg-transparent">
            <NotificationIcon/>
          </Button>
        </div>
        
        <div className="md:w-[2.5rem] md:h-[2.5rem] h-[2rem] w-[2rem] rounded-full flex justify-center items-center bg-[#122251] text-white font-medium">
  {user?.data?.profile_image ? (
    <Image
      alt=""
      className="rounded-full object-cover"
      src={user.data.profile_image}
      height={40}
      width={40}
    />
  ) : (
    <span>
      {`${user?.data?.full_name?.split(" ")[0] ?? ""}${user?.data?.full_name?.split(" ")[0] ?? ""}`}
    </span>
  )}
</div>

        
        {/* User Info and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-end gap-2 cursor-pointer" onClick={toggleDropdown}>
            <div className="text-[#A6A6A6] font-verdana font-normal text-sm max-sm:hidden"> 
              <h2 className='text-white font-verdana font-bold text-sm'>{user?.data?.full_name ?? ""}</h2>
              <p className='text-white/70 font-outfit text-xxs font-medium'>{user?.data?.email}</p>
            </div>
            <Button className={`p-0 bg-transparent h-fit transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <CaretDown/>
            </Button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#122251] border border-[#4453DD]/30 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {/* User info for mobile */}
                <div className="sm:hidden px-4 py-2 border-b border-[#4453DD]/30">
                  <h3 className="text-white font-verdana font-bold text-sm">{user?.data?.full_name ?? ""}</h3>
                  <p className="text-white/70 font-outfit text-xs font-medium">{user?.data?.email}</p>
                </div>
                

                {/* Logout option */}
                <button 
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/20 font-verdana text-sm flex items-center gap-2"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogOut();
                  }}
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
    </div>
  )
}

export default DashboardHeader