"use client"
import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'
import Navbar from './_components/Navbar'
import { useTheme } from '../context/ThemeContext'

function DashboardLayout({ children }) {
    const { theme } = useTheme()
    
    return (
        <div className={`min-h-screen transition-all duration-300 ${
            theme === 'dark' 
            ? 'bg-gradient-to-br from-dark-bg via-indigo-950/90 to-dark-surface text-dark-text-primary' 
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800'
        }`}>
            <div className='hidden md:block md:w-64 h-screen fixed'>
                <SideBar />
            </div>
            <div className='block md:hidden fixed w-full top-0 z-50'>
                <Navbar />
            </div>
            <div className='md:ml-64 mt-16 md:mt-0 min-h-screen'>
                <div className={`transition-all duration-300 ${
                    theme === 'dark' 
                    ? 'bg-dark-glass border-dark-border backdrop-blur-xl' 
                    : 'bg-white/10 border-white/20 backdrop-blur-lg'
                } border-b shadow-lg`}>
                    <Header />
                </div>
                <div className='p-10'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
