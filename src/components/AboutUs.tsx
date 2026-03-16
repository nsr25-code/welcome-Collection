import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-paper relative overflow-hidden">
      {/* Decorative Varanasi Pattern Overlay (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800"
                alt="Welcome Collection Shop"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative frames */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gold/30 rounded-2xl -z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-burgundy/10 rounded-full -z-0 blur-2xl"></div>
            
            <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl z-20 hidden sm:block">
              <div className="text-center">
                <p className="text-4xl font-serif text-burgundy font-bold">15+</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Years of Excellence</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-medium tracking-widest uppercase text-sm">Our Legacy</span>
            <h2 className="text-4xl sm:text-5xl font-serif text-burgundy mt-2 mb-8">
              Welcome Collection: <br />
              <span className="text-slate-800">A Story of Style & Tradition</span>
            </h2>
            
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Established in the heart of Varanasi, Welcome Collection has been a cornerstone of fashion in Lehertara for over a decade. Our journey began with a simple vision: to bring the timeless elegance of Indian heritage to the modern wardrobe.
              </p>
              <p>
                We specialize in authentic Banarasi textiles, hand-picked ethnic wear, and contemporary fashion that resonates with the cultural soul of Kashi. Every piece in our collection is selected with an eye for quality, craftsmanship, and the unique flair that our customers deserve.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Authentic Banarasi Weaves",
                "Custom Fitting Services",
                "Premium Quality Fabrics",
                "Exclusive Designer Wear"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="Team"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Owner: Mr. Ahmad</p>
                <p className="text-xs text-slate-500 italic">Leading the fashion revolution in Varanasi</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
