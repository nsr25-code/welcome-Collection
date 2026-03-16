import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&q=80&w=1920"
          alt="Varanasi Fashion"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-gold font-semibold tracking-[0.3em] uppercase mb-6 text-xs sm:text-sm border-b border-gold/30 pb-2"
          >
            Varanasi's Finest Fashion Hub
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-8xl font-serif text-white leading-[1.1] mb-8"
          >
            Welcome Collection <br />
            <span className="italic text-gold/90 text-3xl md:text-5xl lg:text-7xl block mt-2">Your Fashion Destination</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-slate-200 mb-10 max-w-lg leading-relaxed"
          >
            Experience the blend of tradition and trend. From exquisite Banarasi weaves to modern ethnic wear, find your perfect style in the heart of Varanasi.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Welcome+Collection+Varanasi+Lehertara+Industrial+Estate"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-gold text-burgundy font-bold rounded-full flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 shadow-lg shadow-gold/20 group"
            >
              Visit Our Shop
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
