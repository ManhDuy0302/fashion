import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const socialLink = 'https://www.facebook.com/thuy.lynh.737010';

  const inputClass =
    'w-full px-5 py-4 bg-white border border-pink-200 rounded-xl text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all font-medium';

  return (
    <div className="bg-gradient-to-b from-pink-50/50 to-white min-h-screen py-12 md:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-600 text-lg font-semibold max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy gửi tin nhắn cho chúng tôi!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-pink-100">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                Gửi tin nhắn
              </h2>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                      Cảm ơn bạn!
                    </h3>
                    <p className="text-gray-600 text-lg font-semibold mb-8">
                      Tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi trong 24 giờ.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      Gửi tin nhắn khác
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-bold text-gray-700 mb-2">
                          Họ và tên <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Nguyễn Lan Anh"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-base font-bold text-gray-700 mb-2">
                          Email <span className="text-pink-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-bold text-gray-700 mb-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="0901 234 567"
                        />
                      </div>
                      <div>
                        <label className="block text-base font-bold text-gray-700 mb-2">
                          Chủ đề
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={inputClass}
                        >
                          <option value="">Chọn chủ đề</option>
                          <option value="order">Đơn hàng</option>
                          <option value="product">Sản phẩm</option>
                          <option value="shipping">Vận chuyển</option>
                          <option value="return">Đổi / Trả hàng</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-bold text-gray-700 mb-2">
                        Nội dung tin nhắn <span className="text-pink-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={inputClass}
                        placeholder="Nhập nội dung tin nhắn của bạn..."
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" fullWidth className="py-4">
                      Gửi tin nhắn
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Thông tin liên hệ - Màu hồng phấn nhạt */}
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-3xl p-8 shadow-lg border border-pink-200">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Thông tin liên hệ</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Địa chỉ</h3>
                    <p className="text-gray-700 font-semibold">298 đường Cầu Diễn<br />Phường Tây Tựu, quận Bắc Từ Liêm, Hà Nội</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Email</h3>
                    <a href="mailto:hello@elegance.vn" className="text-gray-700 font-semibold hover:text-pink-600">
                      hello@elegance.vn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Hotline</h3>
                    <a href="tel:+84123456789" className="text-gray-700 font-semibold hover:text-pink-600">
                      +84 123 456 789
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-pink-200">
                <h3 className="font-bold text-base text-gray-800 mb-4">Theo dõi chúng tôi</h3>
                <div className="flex gap-4">
                  <motion.a
                    href={socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors shadow-sm"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href={socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href={socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-colors shadow-sm"
                    aria-label="TikTok"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-5">Giờ làm việc</h2>
              <div className="space-y-3 text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Thứ 2 - Thứ 6</span>
                  <span className="font-bold text-gray-800">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Thứ 7</span>
                  <span className="font-bold text-gray-800">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Chủ nhật</span>
                  <span className="font-bold text-gray-800">10:00 - 17:00</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
