import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckoutForm } from '../components/checkout';
import { useCart } from '../context/CartContext';

export function CheckoutPage() {
  const { items, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const shippingFee = totalPrice >= 1000000 ? 0 : 35000;
  const total = totalPrice + shippingFee;

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="bg-gradient-to-b from-pink-50/50 to-white min-h-screen py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại giỏ hàng
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-3">
            Thanh toán
          </h1>
          <p className="text-gray-500 text-lg">Hoàn tất đơn hàng của bạn</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-28 bg-white rounded-3xl p-8 shadow-sm border border-pink-100"
            >
              <h2 className="text-xl font-serif font-medium text-gray-900 mb-8">
                Đơn hàng ({items.length} sản phẩm)
              </h2>

              <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    className="flex gap-4"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-800 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.selectedSize} • {item.selectedColor.name} • SL: {item.quantity}
                      </p>
                      <p className="text-base font-semibold text-pink-600 mt-2">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-pink-100 mt-8 pt-6 space-y-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-green-500">Miễn phí</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                <div className="border-t border-pink-100 pt-4 flex justify-between text-xl">
                  <span className="font-medium">Tổng cộng</span>
                  <span className="font-bold text-pink-600">{formatPrice(total)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
