import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { CheckoutFormData } from '../../types';
import { Button } from '../ui';
import { useCart } from '../../context/CartContext';

export function CheckoutForm() {
  const navigate = useNavigate();
  const { clearCart, totalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Việt Nam',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    clearCart();
    navigate('/');
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại ÉLÉGANCE.');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const shippingFee = totalPrice >= 1000000 ? 0 : 35000;
  const total = totalPrice + shippingFee;

  const inputClass =
    'w-full px-5 py-4 bg-white border border-pink-200 rounded-xl text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all';

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="space-y-10"
    >
      {/* Contact Info */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100">
        <h2 className="text-xl font-serif font-medium text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
          Thông tin liên hệ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Nguyễn"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass}
              placeholder="Lan Anh"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại <span className="text-pink-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="0901 234 567"
              required
            />
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100">
        <h2 className="text-xl font-serif font-medium text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
          Địa chỉ giao hàng
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClass}
              placeholder="Số nhà, tên đường, phường/xã"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tỉnh/Thành phố <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
                placeholder="TP. Hồ Chí Minh"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã bưu điện
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={inputClass}
                placeholder="700000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quốc gia
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Việt Nam">Việt Nam</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú đơn hàng
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className={inputClass}
              placeholder="Ghi chú về đơn hàng hoặc địa chỉ giao hàng..."
            />
          </div>
        </div>
      </div>

      {/* Order Summary Mobile */}
      <div className="lg:hidden bg-gradient-to-br from-pink-50 to-white rounded-3xl p-8 shadow-sm border border-pink-100">
        <h2 className="text-xl font-serif font-medium text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
        <div className="space-y-4">
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
          <div className="border-t border-pink-200 pt-4 flex justify-between text-xl">
            <span className="font-medium">Tổng cộng</span>
            <span className="font-bold text-pink-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" fullWidth size="lg" disabled={isSubmitting} className="py-5 text-base">
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Đang xử lý...
          </span>
        ) : (
          `Đặt hàng • ${formatPrice(total)}`
        )}
      </Button>

      <p className="text-center text-sm text-gray-400">
        Bằng việc đặt hàng, bạn đồng ý với{' '}
        <a href="#" className="text-pink-500 hover:underline">
          Điều khoản dịch vụ
        </a>{' '}
        và{' '}
        <a href="#" className="text-pink-500 hover:underline">
          Chính sách bảo mật
        </a>{' '}
        của chúng tôi.
      </p>
    </motion.form>
  );
}
