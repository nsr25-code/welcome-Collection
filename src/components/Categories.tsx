import React from 'react';
import { motion } from 'motion/react';

const categories = [
  {
    title: "Men's Collection",
    items: "Kurta, Sherwani, Suits & More",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
    link: "#mens"
  },
  {
    title: "Women's Collection",
    items: "Sarees, Lehengas, Suits & More",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    link: "#womens"
  },
  {
    title: "Kids' Wear",
    items: "Traditional & Casual Outfits",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
    link: "#kids"
  }
];

const Categories = () => {
  return (
    <section id="products" className="py-24 bg-paper relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-serif text-burgundy mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-gold mx-auto mb-6"
          ></motion.div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore our curated collections designed for every occasion, from grand weddings to daily elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[500px] overflow-hidden rounded-2xl shadow-xl cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-serif text-white mb-2">{cat.title}</h3>
                <p className="text-gold/90 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.items}
                </p>
                <button className="px-6 py-2 border border-white/50 text-white text-sm font-medium rounded-full hover:bg-white hover:text-burgundy transition-all duration-300">
                  View Collection
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
