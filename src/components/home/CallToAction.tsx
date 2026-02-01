import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui';

export function CallToAction() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-pink-500 via-pink-400 to-rose-400 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-5">
            Tham Gia Cộng Đồng
            <br />ÉLÉGANCE
          </h2>
          <p className="text-white/90 text-lg mb-10 leading-relaxed">
            Đăng ký để nhận ưu đãi độc quyền, cập nhật sớm về bộ sưu tập mới 
            và những gợi ý phong cách thời trang.
          </p>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/20 backdrop-blur-sm text-white py-6 px-8 rounded-2xl"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-lg">Đăng ký thành công!</span>
                </div>
                <p className="text-white/80">
                  Kiểm tra email để nhận ưu đãi chào mừng đặc biệt.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-6 py-4 bg-white text-gray-800 text-base placeholder-gray-400 rounded-full focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                  required
                />
                <Button
                  type="submit"
                  className="bg-gray-900 text-white hover:bg-gray-800 shadow-xl whitespace-nowrap"
                  size="lg"
                >
                  Đăng ký ngay
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-white/70 text-sm mt-6">
            Hủy đăng ký bất cứ lúc nào. Chúng tôi tôn trọng quyền riêng tư của bạn.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
