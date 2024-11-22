"use client"
import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { Settings, UserCog, Globe, BookOpen, Download, History, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatBytes } from "@/lib/utils";

function ProfilePage() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { theme, toggleTheme } = useTheme();

  const userStats = useQuery(api.fileStorage.getUserStats, {
    email: user?.primaryEmailAddress?.emailAddress || ''
  });

  const activityData = [
    {
      icon: BookOpen,
      title: 'Documents Analyzed',
      subtitle: 'Total PDFs processed',
      value: userStats?.documentsCount || '0'
    },
    {
      icon: Download,
      title: 'Storage Used',
      subtitle: 'Total space utilized',
      value: formatBytes(userStats?.storageUsed || 0)
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className={`${theme === 'dark'
        ? 'bg-dark-glass border-dark-border text-dark-text-primary'
        : 'bg-white/20 border-white/20 text-gray-800'
        } backdrop-blur-lg rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-opacity-20 transition-all duration-300`}>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0">
          <img
            src={user?.imageUrl}
            alt="Profile"
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${theme === 'dark' ? 'border-dark-border' : 'border-white/50'
              } border-4`}
          />
          <div className="space-y-4 text-center sm:text-left">
            <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
              }`}>{user?.fullName}</h1>
            <p className={
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-600'
            }>{user?.primaryEmailAddress?.emailAddress}</p>
            <button
              onClick={() => openUserProfile()}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition w-full sm:w-auto"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className={`${theme === 'dark'
          ? 'bg-dark-glass border-dark-border'
          : 'bg-white/20 border-white/20'
          } backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-lg border border-opacity-20 transition-all duration-300`}>
          <h2 className={`text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
            }`}>
            <UserCog className="w-5 h-5" />
            Account Details
          </h2>
          <div className="space-y-4">
            {['Username', 'Email', 'Account Created'].map((label, index) => (
              <div key={label} className={`p-3 sm:p-4 ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/30'
                } rounded-lg transition-colors duration-300`}>
                <label className={
                  theme === 'dark' ? 'text-dark-text-secondary text-sm sm:text-base' : 'text-gray-700'
                }>{label}</label>
                <p className={`${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-600'
                  } text-sm sm:text-base break-words`}>{
                    index === 0 ? user?.firstName || 'Not set' :
                      index === 1 ? user?.primaryEmailAddress?.emailAddress :
                        new Date(user?.createdAt).toLocaleDateString()
                  }</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${theme === 'dark'
          ? 'bg-dark-glass border-dark-border'
          : 'bg-white/20 border-white/20'
          } backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-lg border border-opacity-20 transition-all duration-300`}>
          <h2 className={`text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
            }`}>
            <Settings className="w-5 h-5" />
            Activity & Preferences
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div className={`p-3 sm:p-4 ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/30'
              } rounded-lg transition-colors duration-300`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <div>
                    <h3 className={`text-sm sm:text-base ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
                      }`}>Theme Preference</h3>
                    <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-600'
                      }`}>Toggle dark mode</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            {activityData.map((item) => (
              <div key={item.title} className={`p-3 sm:p-4 ${theme === 'dark' ? 'bg-dark-card hover:bg-dark-card-hover' : 'bg-white/30'
                } rounded-lg flex items-center justify-between transition-colors duration-300`}>
                <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  <div>
                    <h3 className={`text-sm sm:text-base ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
                      }`}>{item.title}</h3>
                    <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-600'
                      }`}>{item.subtitle}</p>
                  </div>
                </div>
                <span className={`${theme === 'dark' ? 'text-dark-text-accent' : 'text-gray-800'
                  } font-semibold text-sm sm:text-base`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
