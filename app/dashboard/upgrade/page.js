'use client'
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function UpgradePlans() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-dark-background' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-[2000px] mx-auto">
        <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>Plans</h2>
        <p className={`${
          theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700/80'
        } text-lg mb-8`}>Upgrade your plan to upload multiple pdf to take notes</p>

        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
            <div className={`rounded-2xl ${
              theme === 'dark' 
                ? 'bg-dark-glass border-dark-border hover:bg-dark-card-hover' 
                : 'bg-white/20 border-white/20 hover:bg-white/30'
            } backdrop-blur-sm border border-opacity-20 transition duration-300 shadow-lg p-6 sm:order-last sm:px-8 lg:p-12`}>
              <div className="text-center">
                <h2 className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-900'
                }`}>
                  Unlimited
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className={`text-3xl font-bold ${
                    theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-900'
                  } sm:text-4xl`}> 9.99$ </strong>

                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'
                  }`}>/One Time</span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                {['Unlimited PDF Upload', 'Unlimited Notes Taking', 'Email support', 'Help center access'].map((feature) => (
                  <li key={feature} className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span className={
                      theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'
                    }>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="mt-8 block rounded-full border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
              >
                Get Started
              </a>
            </div>

            <div className={`rounded-2xl ${
              theme === 'dark' 
                ? 'bg-dark-glass border-dark-border hover:bg-dark-card-hover' 
                : 'bg-white/20 border-white/20 hover:bg-white/30'
            } backdrop-blur-sm border border-opacity-20 transition duration-300 shadow-lg p-6 sm:px-8 lg:p-12`}>
              <div className="text-center">
                <h2 className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-900'
                }`}>
                  Starter
                  <span className="sr-only">Plan</span>
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className={`text-3xl font-bold ${
                    theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-900'
                  } sm:text-4xl`}> 0$ </strong>

                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'
                  }`}>/month</span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                {['5 PDF Upload', 'Unlimited Notes Taking', 'Email support', 'Help center access'].map((feature) => (
                  <li key={feature} className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-indigo-700"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                    <span className={
                      theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'
                    }>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-8 block rounded-full border border-indigo-600 ${
                  theme === 'dark' ? 'bg-dark-card' : 'bg-white'
                } px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500`}
              >
                Current Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpgradePlans
