import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Happy Bride",
    content: "I bought my wedding lehenga from Welcome Collection. The quality of the fabric and the intricate work was beyond my expectations. Highly recommended for bridal shopping!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Rahul Verma",
    role: "Regular Customer",
    content: "The best place in Varanasi for men's ethnic wear. Their collection of kurtas and sherwanis is very trendy and the prices are quite reasonable.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Anjali Gupta",
    role: "Fashion Enthusiast",
    content: "Welcome Collection has a great variety of sarees. I love their Banarasi collection. The staff is very helpful and patient.",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=anjali"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-burgundy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold font-medium tracking-widest uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-serif text-white mt-2">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl relative"
            >
              <Quote className="text-gold/20 absolute top-6 right-8" size={48} />
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < t.rating ? "fill-gold text-gold" : "text-white/20"}
                  />
                ))}
              </div>
              
              <p className="text-white/80 italic mb-8 leading-relaxed">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border-2 border-gold"
                />
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-gold text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
