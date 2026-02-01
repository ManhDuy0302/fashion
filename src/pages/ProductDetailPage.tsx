import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductDetail } from '../components/products';
import { getProductBySlug } from '../data/products';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-pink-50/50 to-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-serif font-medium text-gray-900 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium text-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại cửa hàng
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-pink-50/50 to-white min-h-screen py-12 md:py-16">
      <div className="container">
        {/* Breadcrumb */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-base text-gray-500 mb-10"
        >
          <Link to="/" className="hover:text-pink-500 transition-colors">
            Trang chủ
          </Link>
          <span className="text-pink-300">/</span>
          <Link to="/shop" className="hover:text-pink-500 transition-colors">
            Cửa hàng
          </Link>
          <span className="text-pink-300">/</span>
          <span className="text-pink-500 font-medium">{product.name}</span>
        </motion.nav>

        <ProductDetail product={product} />
      </div>
    </div>
  );
}
