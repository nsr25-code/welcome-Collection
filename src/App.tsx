import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { motion } from 'motion/react';

function App() {
  return (
    <div className="min-h-screen bg-paper selection:bg-gold selection:text-burgundy">
      <Navbar />
      
      <main>
        <Hero />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Categories />
          <FeaturedProducts />
          <AboutUs />
          <Testimonials />
          <Contact />
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
