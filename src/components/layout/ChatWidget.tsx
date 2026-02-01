import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Xin chào! 👋 Chào mừng bạn đến với ÉLÉGANCE. Tôi có thể giúp gì cho bạn?', isUser: false },
  ]);

  const socialLink = 'https://www.facebook.com/thuy.lynh.737010';

  const quickReplies = [
    'Tư vấn size',
    'Chính sách đổi trả',
    'Phí vận chuyển',
    'Liên hệ nhân viên',
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: 'Cảm ơn bạn đã liên hệ! Nhân viên tư vấn sẽ phản hồi trong ít phút. Hoặc bạn có thể liên hệ trực tiếp qua Facebook của chúng tôi.',
        isUser: false
      }]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setMessages([...messages, { text: reply, isUser: true }]);
    
    setTimeout(() => {
      let response = '';
      switch (reply) {
        case 'Tư vấn size':
          response = 'Để tư vấn size chính xác, bạn vui lòng cho biết chiều cao, cân nặng và số đo 3 vòng nhé! Hoặc xem bảng size tại mỗi sản phẩm.';
          break;
        case 'Chính sách đổi trả':
          response = 'ÉLÉGANCE hỗ trợ đổi trả miễn phí trong vòng 30 ngày với sản phẩm còn nguyên tem mác, chưa qua sử dụng.';
          break;
        case 'Phí vận chuyển':
          response = 'Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ. Đơn dưới 1 triệu phí ship 35.000đ toàn quốc.';
          break;
        case 'Liên hệ nhân viên':
          response = 'Bạn có thể liên hệ hotline 0123 456 789 (8h-21h) hoặc nhắn tin qua Facebook để được hỗ trợ nhanh nhất!';
          break;
        default:
          response = 'Cảm ơn bạn! Nhân viên sẽ phản hồi sớm nhất có thể.';
      }
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full shadow-2xl shadow-pink-500/40 flex items-center justify-center relative"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Chat Tư Vấn</h3>
                  <p className="text-sm text-white/80 font-medium">Thường trả lời trong vài phút</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-pink-50/30">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-base font-medium ${
                      msg.isUser
                        ? 'bg-pink-500 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-3 bg-white border-t border-pink-100">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-pink-50 text-pink-600 rounded-full text-sm font-semibold hover:bg-pink-100 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-pink-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-3 bg-pink-50 rounded-xl text-base font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              {/* Facebook Link */}
              <a
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Chat qua Facebook Messenger
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
