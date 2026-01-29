import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import Eshwar from "@/assets/SriEshwar.png"
import Thiran from "@/assets/ThiranLogo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false) // Close mobile menu immediately
    
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      // Use setTimeout to ensure menu closes before scrolling
      setTimeout(() => {
        const navbarHeight = 80 // Approximate navbar height
        const targetPosition = targetElement.offsetTop - navbarHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }, 100)
      
      // Update URL without causing a page jump
      window.history.pushState(null, '', href)
    } else {
      // Fallback: if element not found, just update URL and let browser handle it
      window.location.hash = href
    }
  }

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Theme', href: '#theme' },
    { name: 'PS', href: '#ps' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'FAQs', href: '#faqs' }
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-3xl border-b border-cyan-500/30 shadow-[0_8px_32px_rgba(6,182,212,0.15)]' 
          : 'bg-black/50 backdrop-blur-md border-b border-transparent'
      }`}
    >
      {/* Top glow effect */}
      <div className={`absolute w-full -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="w-full px-4 md:px-8 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo with glow effect */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <img 
            src={Eshwar} 
            alt="Eshwar" 
            loading="eager"
            decoding="async"
            className='relative w-42 h-16 object-contain' 
          />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          {navItems.map((item, index) => (
            <motion.a 
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative text-gray-300 hover:text-white font-medium px-4 py-2 rounded-full transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
            >
              {/* Hover background */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              {/* Text */}
              <span className="relative">{item.name}</span>
              
              {/* Bottom indicator */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 group-hover:w-3/4 transition-all duration-300 rounded-full" />
            </motion.a>
          ))}
        </div>
        
        {/* Right Logo with glow */}
        <motion.div 
          className="relative hidden md:block"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg blur-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <img 
            src={Thiran} 
            alt="Thiran" 
            loading="eager"
            decoding="async"
            className='relative h-14 object-contain' 
          />
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden relative text-white p-2 rounded-lg overflow-hidden group z-[110]"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">{isOpen ? <HiX size={28} /> : <HiMenu size={28} />}</span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-black/95 to-black/90 border-t border-cyan-500/20 backdrop-blur-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2 px-6 py-6">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-gray-300 hover:text-white font-medium py-3 px-4 rounded-lg transition-all group overflow-hidden"
                  whileHover={{ x: 8 }}
                >
                  {/* Background gradient */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Left border indicator */}
                  <span className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-b from-cyan-400 via-purple-400 to-blue-400 group-hover:w-1 transition-all duration-300" />
                  
                  <span className="relative">{item.name}</span>
                </motion.a>
              ))}
              
              {/* Mobile CTA Button */}
              <motion.a 
                href="/"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-center mt-4 overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <span className="relative">Register Now</span>
              </motion.a>
              
              {/* Mobile Thiran Logo */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex justify-center pt-4 border-t border-white/10 mt-4"
              >
                <img 
                  src={Thiran} 
                  alt="Thiran" 
                  loading="lazy"
                  decoding="async"
                  className='h-12 object-contain opacity-60' 
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar