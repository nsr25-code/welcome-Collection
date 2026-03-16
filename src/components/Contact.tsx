import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold font-medium tracking-widest uppercase text-sm">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-serif text-burgundy mt-2 mb-4">Visit Our Store in Varanasi</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We'd love to welcome you to our physical store. Experience our collections in person and get expert fashion advice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex gap-6 p-8 bg-cream/30 rounded-3xl border border-gold/10"
            >
              <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-xl text-burgundy flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Our Location</h4>
                <p className="text-slate-600">Lehertara Industrial Estate, Varanasi, Uttar Pradesh 221106</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-6 p-8 bg-cream/30 rounded-3xl border border-gold/10"
            >
              <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-xl text-burgundy flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Call Us</h4>
                <p className="text-slate-600">+91 98765 43210</p>
                <p className="text-slate-600">+91 91234 56789</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-6 p-8 bg-cream/30 rounded-3xl border border-gold/10"
            >
              <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-xl text-burgundy flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Email Us</h4>
                <p className="text-slate-600">info@welcomecollection.com</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-6 p-8 bg-cream/30 rounded-3xl border border-gold/10"
            >
              <div className="w-12 h-12 bg-cream flex items-center justify-center rounded-xl text-burgundy flex-shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Business Hours</h4>
                <p className="text-slate-600">Mon - Sat: 10:00 AM - 09:00 PM</p>
                <p className="text-slate-600">Sunday: 11:00 AM - 07:00 PM</p>
              </div>
            </motion.div>
          </div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden h-[400px] shadow-2xl relative group border-4 border-white"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.338520721453!2d82.9614453150121!3d25.31764518384074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2df800000001%3A0x8b3e8c3e8e3e8e3e!2sLehertara%20Industrial%20Estate%2C%20Varanasi!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Welcome Collection Location"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            <div className="absolute inset-0 bg-burgundy/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Welcome+Collection+Varanasi+Lehertara+Industrial+Estate"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-burgundy text-white font-bold rounded-full shadow-2xl hover:bg-gold transition-all transform scale-100 hover:scale-105 flex items-center gap-2"
              >
                <MapPin size={20} />
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
