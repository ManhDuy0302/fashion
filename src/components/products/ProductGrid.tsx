import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 bg-pink-50 rounded-3xl"
      >
        <div className="text-6xl mb-4">🛍️</div>
        <p className="text-xl text-gray-700 font-semibold">
          Không tìm thấy sản phẩm nào
        </p>
        <p className="text-gray-500 mt-2 font-medium">
          Vui lòng thử lại với bộ lọc khác
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
