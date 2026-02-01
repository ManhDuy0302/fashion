import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, ProductColor } from '../../types';
import { Button, Badge } from '../ui';
import { useCart } from '../../context/CartContext';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }

    addToCart({
      product,
      quantity,
      selectedSize,
      selectedColor,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Images */}
      <div className="space-y-5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-pink-50 shadow-xl"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={product.images[selectedImage]}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          {product.isNew && (
            <div className="absolute top-5 left-5">
              <Badge variant="new">Mới</Badge>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-2xl overflow-hidden transition-all shadow-md ${
                selectedImage === index
                  ? 'ring-3 ring-pink-500 ring-offset-2'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-base text-pink-500 font-bold tracking-wide mb-2 uppercase">
            {product.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-5">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl md:text-4xl font-bold text-pink-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through font-semibold">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="sale">
                  Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                </Badge>
              </>
            )}
          </div>

          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="mb-8">
            <p className="text-base font-bold text-gray-800 mb-4">
              Màu sắc: <span className="text-pink-500 font-semibold">{selectedColor?.name || 'Chọn màu'}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <motion.button
                  key={color.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 transition-all shadow-md ${
                    selectedColor?.name === color.name
                      ? 'border-pink-500 ring-4 ring-pink-200'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <p className="text-base font-bold text-gray-800 mb-4">
              Kích cỡ: <span className="text-pink-500 font-semibold">{selectedSize || 'Chọn size'}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-xl text-base font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                      : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-base font-bold text-gray-800 mb-4">Số lượng</p>
            <div className="inline-flex items-center bg-pink-50 rounded-xl overflow-hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-5 py-3 text-gray-700 hover:text-pink-500 text-xl font-bold transition-colors"
              >
                −
              </motion.button>
              <span className="px-6 py-3 text-xl font-bold text-gray-800 min-w-[60px] text-center">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="px-5 py-3 text-gray-700 hover:text-pink-500 text-xl font-bold transition-colors"
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || !product.inStock}
              fullWidth
              size="lg"
              className="py-4 text-base"
            >
              {!product.inStock ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
            </Button>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-green-50 text-green-600 rounded-xl flex items-center gap-3 mb-6"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-bold text-base">Đã thêm vào giỏ hàng thành công!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Details */}
          <div className="border-t border-pink-100 pt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-5">Chi tiết sản phẩm</h3>
            <ul className="space-y-3">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600 text-base font-semibold">
                  <svg className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
