import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui';

export function BrandStory() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <motion.img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop"
                alt="Nghệ thuật may đo"
                className="w-full aspect-[4/5] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-100 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-200/50 rounded-full -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-pink-500 mb-4">
              Về chúng tôi
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6 leading-tight">
              Chế Tác Với Tâm Huyết,
              <br />
              <span className="text-pink-500">Thiết Kế Để Tỏa Sáng</span>
            </h2>
            <div className="space-y-5 text-gray-500 text-lg leading-relaxed mb-10">
              <p>
                Tại ÉLÉGANCE, chúng tôi tin rằng mỗi người phụ nữ đều xứng đáng được tỏa sáng. 
                Mỗi sản phẩm đều được thiết kế tỉ mỉ với sự chú ý đến từng chi tiết.
              </p>
              <p>
                Chúng tôi kết hợp nghệ thuật thủ công truyền thống với xu hướng thời trang hiện đại, 
                tạo nên những thiết kế vượt thời gian.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-8 mb-10">
              {[
                { value: '100%', label: 'Chất liệu cao cấp' },
                { value: '15+', label: 'Năm kinh nghiệm' },
                { value: '50K+', label: 'Khách hàng tin yêu' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-serif font-semibold text-pink-500">{item.value}</p>
                  <p className="text-sm text-gray-500 mt-2">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <Link to="/shop">
              <Button size="lg">Khám phá bộ sưu tập</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
