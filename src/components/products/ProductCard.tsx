import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { Badge } from '../ui';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.sizes.length > 0 && product.colors.length > 0) {
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 bg-pink-50/50 shadow-md">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="new">Mới</Badge>}
            {product.isBestSeller && <Badge>Bán chạy</Badge>}
            {product.originalPrice && (
              <Badge variant="sale">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-3 right-3 py-3 bg-white/95 backdrop-blur-sm text-gray-800 text-base font-semibold rounded-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 transition-all duration-300 shadow-lg hover:bg-pink-500 hover:text-white"
          >
            Thêm vào giỏ
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="px-1">
          <p className="text-sm text-pink-500 font-bold tracking-wide mb-1 uppercase">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-pink-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-gray-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
