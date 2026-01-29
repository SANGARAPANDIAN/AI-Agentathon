import React from 'react'
import { Instagram, Facebook, Linkedin, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import Eshwar from "@/assets/SriEshwar.png"
import Thiran from "@/assets/ThiranLogo.png"

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/srieshwar_thiran/?hl=en", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/srieshwarcollegeofengineering/", label: "Facebook" },
    { icon: Linkedin, href: "https://in.linkedin.com/school/srieshwar/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UC77zVLSva6lRY6eqaDFUkuA", label: "YouTube" },
  ]

  const coordinators = [
    { name: "Dr.G.Shobana", phone: "+91 99620 04041", role: "Faculty Coordinator" },
    { name: "Yaswanth Saran Sundar P", phone: "8608084220", role: "Student Coordinator" }
  ]

  return (
    <footer className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black border-t border-cyan-500/20">
      {/* Top glow effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Section - Logos */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start space-y-6">
            {/* Main College Logo */}
            
            
            {/* Hackathon Logo */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src={Thiran} 
                alt="Hackathon Logo"
                loading="lazy"
                decoding="async"
                className="relative h-16 object-contain hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Middle Section - Coordinators */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Coordinators
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
            </h3>
            <div className="space-y-3">
              {coordinators.map((coordinator, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm font-semibold text-cyan-400">{coordinator.role}</p>
                  <div className="flex items-center space-x-2 text-neutral-300 hover:text-cyan-400 transition-colors duration-300 group">
                    <Phone className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                    <a href={`tel:${coordinator.phone}`} className="hover:underline">
                      {coordinator.name} - {coordinator.phone}
                    </a>
                  </div>
                </div>
              ))}
              
              {/* Email */}
              <div className="flex items-center space-x-2 text-neutral-300 hover:text-cyan-400 transition-colors duration-300 group pt-2">
                <Mail className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                <a href="mailto:sece@sece.ac.in" className="hover:underline">
                  sece@sece.ac.in
                </a>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              Address
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
            </h3>
            <div className="flex items-start space-x-3 text-neutral-300">
              <MapPin className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
              <div className="space-y-1">
                <p className="leading-relaxed">
                  Sri Eshwar College of Engineering,
                </p>
                <p className="leading-relaxed">
                  Kondampatti  Post, Vadasithur via, Kinathukadavu, Coimbatore- 641 202,
                </p>
                <p className="leading-relaxed">
                  Tamil Nadu, India.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Dakshaa Logo & Social Media */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end space-y-6">
            {/* Dakshaa T25 Logo */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src={Eshwar} 
                alt="Sri Eshwar college Of Engineering"
                loading="lazy"
                decoding="async"
                className="relative w-48 h-auto object-contain"
              />
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="relative p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Icon className="w-5 h-5 relative z-10" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section - Credits */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-neutral-400 text-sm">
            Design and Developed By{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
              Department of Aritificial Intelligence And Data Science
            </span>
          </p>
          <p className="text-center text-neutral-500 text-xs mt-2">
            © {new Date().getFullYear()} Sri Eshwar College of Engineerng. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </footer>
  )
}

export default Footer