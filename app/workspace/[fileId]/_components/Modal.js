"use client"

import { useTheme } from '../../../context/ThemeContext'

export default function Modal({ isOpen, onClose, title, children }) {
  const { theme } = useTheme()

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className={`${theme === 'dark'
        ? 'bg-dark-card border border-dark-border text-dark-text-primary'
        : 'bg-white border border-gray-200'
        } p-6 rounded-lg shadow-xl max-w-md w-full backdrop-blur-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-800'
          }`}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
