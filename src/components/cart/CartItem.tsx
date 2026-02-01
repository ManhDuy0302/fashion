import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedSize, selectedColor } = item;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-5 p-5 bg-white rounded-2xl shadow-sm border border-pink-100 relative"
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="flex-shrink-0">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={product.images[0]}
          alt={product.name}
          className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-pink-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-pink-500 text-base font-bold mt-1">{product.category}</p>

        <div className="flex flex-wrap gap-3 mt-3">
          <span className="inline-flex items-center px-3 py-1.5 bg-pink-50 rounded-lg text-base font-semibold text-gray-700">
            Size: <span className="ml-1">{selectedSize}</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 rounded-lg text-base font-semibold text-gray-700">
            Màu:
            <span
              className="w-5 h-5 rounded-full border border-pink-200"
              style={{ backgroundColor: selectedColor.hex }}
            />
          </span>
        </div>

        {/* Quantity & Price - Mobile */}
        <div className="flex items-center justify-between mt-4 md:hidden">
          <div className="flex items-center bg-pink-50 rounded-lg overflow-hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                updateQuantity(
                  product.id,
                  selectedSize,
                  selectedColor.name,
                  Math.max(1, quantity - 1)
                )
              }
              className="px-4 py-2.5 text-gray-700 hover:text-pink-500 font-bold text-lg"
            >
              −
            </motion.button>
            <span className="px-3 py-2.5 text-lg font-bold text-gray-800">{quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                updateQuantity(
                  product.id,
                  selectedSize,
                  selectedColor.name,
                  quantity + 1
                )
              }
              className="px-4 py-2.5 text-gray-700 hover:text-pink-500 font-bold text-lg"
            >
              +
            </motion.button>
          </div>
          <span className="text-xl font-bold text-pink-600">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>

      {/* Quantity & Price - Desktop */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center bg-pink-50 rounded-xl overflow-hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              updateQuantity(
                product.id,
                selectedSize,
                selectedColor.name,
                Math.max(1, quantity - 1)
              )
            }
            className="px-5 py-3 text-gray-700 hover:text-pink-500 text-xl font-bold"
          >
            −
          </motion.button>
          <span className="px-4 py-3 text-xl font-bold text-gray-800">{quantity}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              updateQuantity(
                product.id,
                selectedSize,
                selectedColor.name,
                quantity + 1
              )
            }
            className="px-5 py-3 text-gray-700 hover:text-pink-500 text-xl font-bold"
          >
            +
          </motion.button>
        </div>

        <div className="text-right min-w-[120px]">
          <p className="text-2xl font-bold text-pink-600">
            {formatPrice(product.price * quantity)}
          </p>
          {quantity > 1 && (
            <p className="text-base text-gray-500 font-semibold">
              {formatPrice(product.price)} / sản phẩm
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            removeFromCart(product.id, selectedSize, selectedColor.name)
          }
          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>

      {/* Remove - Mobile */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => removeFromCart(product.id, selectedSize, selectedColor.name)}
        className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
