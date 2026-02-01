import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/categories';

// Chỉ hiển thị 3 categories chính trên trang chủ
const displayCategories = categories.filter(cat => 
  ['women', 'dresses', 'bags'].includes(cat.slug)
).slice(0, 3);

export function CategoryShowcase() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-pink-50/50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-4">
            Danh Mục Nổi Bật
          </h2>
          <p className="text-gray-600 text-lg font-bold">Khám phá bộ sưu tập theo phong cách của bạn</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/shop?category=${category.slug}`}
                className="group relative block overflow-hidden rounded-3xl aspect-[3/4] shadow-xl"
              >
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-base font-semibold mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <motion.span 
                    className="inline-flex items-center text-white text-base font-bold"
                    whileHover={{ x: 5 }}
                  >
                    Khám phá ngay
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
