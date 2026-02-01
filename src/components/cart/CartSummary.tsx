import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui';
import { useCart } from '../../context/CartContext';

export function CartSummary() {
  const { totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const shippingFee = totalPrice >= 1000000 ? 0 : 35000;
  const total = totalPrice + shippingFee;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-3xl shadow-lg border border-pink-100"
    >
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
        Tóm tắt đơn hàng
      </h2>

      <div className="space-y-5">
        <div className="flex justify-between text-base">
          <span className="text-gray-600 font-semibold">Tạm tính ({totalItems} sản phẩm)</span>
          <span className="font-bold text-gray-800">{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between text-base">
          <span className="text-gray-600 font-semibold">Phí vận chuyển</span>
          <span className="font-bold text-gray-800">
            {shippingFee === 0 ? (
              <span className="text-green-500">Miễn phí</span>
            ) : (
              formatPrice(shippingFee)
            )}
          </span>
        </div>

        {totalPrice < 1000000 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-pink-100/50 rounded-xl text-base font-semibold text-pink-600"
          >
            💝 Mua thêm{' '}
            <span className="font-bold">{formatPrice(1000000 - totalPrice)}</span> để được
            miễn phí vận chuyển!
          </motion.div>
        )}

        <div className="border-t border-pink-200 my-6" />

        <div className="flex justify-between text-xl">
          <span className="font-bold text-gray-800">Tổng cộng</span>
          <span className="font-bold text-pink-600">{formatPrice(total)}</span>
        </div>
      </div>

      <Link to="/checkout" className="block mt-8">
        <Button fullWidth size="lg" className="py-4">
          Tiến hành thanh toán
        </Button>
      </Link>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-base font-semibold text-gray-600">
          <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Giao hàng nhanh 2-4 ngày</span>
        </div>
        <div className="flex items-center gap-3 text-base font-semibold text-gray-600">
          <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Đổi trả miễn phí trong 30 ngày</span>
        </div>
        <div className="flex items-center gap-3 text-base font-semibold text-gray-600">
          <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Thanh toán bảo mật 100%</span>
        </div>
      </div>
    </motion.div>
  );
}
