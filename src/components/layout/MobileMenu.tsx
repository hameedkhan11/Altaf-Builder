'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Search, Sun, Moon } from 'lucide-react'
import { NAVIGATION_ITEMS } from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isDark: boolean
  toggleTheme: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isDark, toggleTheme }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="fixed top-20 left-0 right-0 z-40 md:hidden bg-background rounded-lg shadow-lg mx-6 border"
        >
          <div className="flex flex-col space-y-4 p-4">
            {NAVIGATION_ITEMS.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-foreground hover:text-indigo-600 transition-colors py-2"
                onClick={onClose}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 pt-2 border-t">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu