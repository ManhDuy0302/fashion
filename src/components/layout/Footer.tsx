import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLink = 'https://www.facebook.com/thuy.lynh.737010';

  const quickLinks = [
    { to: '/shop', label: 'Tất cả sản phẩm' },
    { to: '/shop?category=women', label: 'Thời trang nữ' },
    { to: '/shop?category=vay', label: 'Váy & Đầm' },
    { to: '/shop?category=tui-xach', label: 'Túi xách' },
  ];

  const supportLinks = [
    { to: '/about', label: 'Về chúng tôi' },
    { to: '/contact', label: 'Liên hệ' },
    { to: '#', label: 'Vận chuyển & Đổi trả' },
    { to: '#', label: 'Hướng dẫn chọn size' },
  ];

  return (
    <footer className="bg-gradient-to-b from-pink-50 to-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              ÉLÉGANCE
            </Link>
            <p className="mt-4 text-gray-600 text-base font-semibold leading-relaxed">
              Thời trang hiện đại cho người sành điệu. Được thành lập năm 2026 bởi sinh viên HAUI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-widest mb-5 text-pink-500">
              Mua sắm
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-pink-500 transition-colors text-base font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-widest mb-5 text-pink-500">
              Hỗ trợ
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-600 hover:text-pink-500 transition-colors text-base font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold uppercase tracking-widest mb-5 text-pink-500">
              Liên hệ
            </h3>
            <address className="not-italic text-gray-600 text-base font-semibold space-y-3">
              <p>Đại học Công nghiệp Hà Nội</p>
              <p>Số 298 Cầu Diễn, Bắc Từ Liêm, Hà Nội</p>
              <p>
                <a href="mailto:hello@elegance.vn" className="hover:text-pink-500 transition-colors">
                  hello@elegance.vn
                </a>
              </p>
              <p>
                <a href="tel:+84123456789" className="hover:text-pink-500 transition-colors">
                  +84 123 456 789
                </a>
              </p>
            </address>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <motion.a
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>
              <motion.a
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </motion.a>
              <motion.a
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-pink-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-base font-semibold">
              © {currentYear} ÉLÉGANCE - Sinh viên HAUI. Bảo lưu mọi quyền.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-pink-500 text-base font-semibold transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-500 text-base font-semibold transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
