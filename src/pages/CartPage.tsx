import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem, CartSummary } from '../components/cart';
import { Button } from '../components/ui';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-pink-50/50 to-white py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-32 h-32 mx-auto mb-8 bg-pink-100 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif font-medium text-gray-900 mb-4">
            Giỏ hàng trống
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Hãy khám phá các sản phẩm tuyệt vời của chúng tôi và thêm vào giỏ hàng nhé!
          </p>
          <Link to="/shop">
            <Button size="lg">Khám phá ngay</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-pink-50/50 to-white min-h-screen py-12 md:py-16">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-3">
            Giỏ hàng của bạn
          </h1>
          <p className="text-gray-500 text-lg">{items.length} sản phẩm trong giỏ</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItem
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  item={item}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
