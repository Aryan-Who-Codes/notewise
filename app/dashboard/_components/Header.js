import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function Header() {
  const { theme } = useTheme();

  return (
    <div className={`hidden md:flex justify-end p-5 shadow-md ${theme === 'dark' ? 'bg-dark-glass border-dark-border' : 'bg-white/10'
      } backdrop-blur-lg border-opacity-20`}>
      <UserButton />
    </div>
  )
}


export default Header
