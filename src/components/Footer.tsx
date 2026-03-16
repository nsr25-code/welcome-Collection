import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold tracking-tighter">
              WELCOME <span className="text-gold">COLLECTION</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Your ultimate destination for premium fashion in Varanasi. We blend tradition with modern trends to give you the perfect look for every occasion.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-burgundy transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-serif text-gold mb-6">Categories</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {["Men's Wear", "Women's Wear", "Kids' Wear", "Banarasi Sarees", "Wedding Collection", "Ethnic Wear"].map((cat) => (
                <li key={cat} className="text-slate-400 flex items-center gap-2">
                  <div className="w-2 h-[1px] bg-gold/50"></div>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Welcome Collection. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm italic tracking-wide">
            Designed by - <span className="text-gold font-medium">MD NISAR AHMAD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
