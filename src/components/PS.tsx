"use client";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LampContainer } from "@/components/ui/lamp";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const PS = () => {
  const navigate = useNavigate();
  
  const problemStatements = [
    "Agentic AI-Driven Website-Integrated Business Support System",
    "Agentic AI-Powered API for Contact Number Validation and WhatsApp Intelligence",
    "Agentic AI-Enabled Smart Billing System for Retail Environments",
    "Agentic AI–Enabled Image Processing–Based Bill Management System",
    "Agentic AI–Enhanced File Uploading Module for Mobile and Tablet Applications",
    "Agentic AI–Driven Passwordless Multi-App Authentication System",
    "Agentic AI–Driven DataTables Customization and Performance Optimization",
    "Agentic AI–Enabled User Restriction & Dynamic Role-Based Access Control (RBAC) System",
    "ERP-Grade Agentic AI–Powered Task & Workflow Management System",
    "Agentic AI–Driven Multi-Session Single Login with Forced Global Logout",
  ];

  return (
   <>
   <div>
     <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-cyan-300 via-purple-300 to-blue-300 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Problem Statements <br /> Innovation Awaits
      </motion.h1>
      <motion.p
        initial={{ opacity: 0.5, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-6 text-center text-lg text-gray-400 max-w-2xl"
      >
        Explore our 10 cutting-edge AI challenges and choose your path to innovation.
      </motion.p>
      
    </LampContainer>
   </div>
   <div className="w-full px-4 md:px-8 lg:px-12 bg-black pb-20">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: -200 }}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="max-w-5xl mx-auto"
    >
      {/* Problem Statements List */}
      <div className="grid grid-cols-1 gap-4 mb-12">
        {problemStatements.map((ps, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white">
                  PS{String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg leading-relaxed">
                    {ps}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Register Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Button
          onClick={() => navigate('/register')}
          className="bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-full font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
        >
          <Sparkles className="w-6 h-6 mr-2" />
          Register Your Team Now
        </Button>
      </motion.div>
    </motion.div>
   </div>
   </>
  );
};

export default PS;