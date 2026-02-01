import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export function AboutPage() {
  const teamMembers = [
    { name: 'Đỗ Thị Thùy Linh', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Lê Thị Hải Nga', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'Nguyễn Thị Ánh', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Mưu Thu Mây', role: 'Marketing Manager', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
    { name: 'Nguyễn Thị Lan Anh', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Nguyễn Thu Hiền', role: 'UI/UX Designer', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
  ];

  const milestones = [
    { year: '2026', title: 'Thành lập', desc: 'ÉLÉGANCE được thành lập bởi nhóm sinh viên HAUI với đam mê thời trang' },
    { year: '2026', title: 'Ra mắt website', desc: 'Chính thức ra mắt nền tảng thương mại điện tử thời trang' },
    { year: '2026', title: '1000+ khách hàng', desc: 'Đạt mốc 1000 khách hàng đầu tiên sau 3 tháng hoạt động' },
    { year: '2026', title: 'Mở rộng', desc: 'Mở rộng đội ngũ và phát triển bộ sưu tập mới' },
  ];

  const values = [
    { icon: '✨', title: 'Chất lượng', desc: 'Cam kết mang đến sản phẩm chất lượng cao với giá cả hợp lý' },
    { icon: '💝', title: 'Tận tâm', desc: 'Luôn lắng nghe và phục vụ khách hàng với sự tận tâm nhất' },
    { icon: '🌸', title: 'Sáng tạo', desc: 'Không ngừng đổi mới và sáng tạo trong thiết kế' },
    { icon: '🤝', title: 'Uy tín', desc: 'Xây dựng niềm tin với khách hàng qua từng sản phẩm' },
  ];

  return (
    <div className="bg-gradient-to-b from-pink-50/50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-white" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-6">
              Về Chúng Tôi
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Câu Chuyện Của{' '}
              <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
                ÉLÉGANCE
              </span>
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              Được thành lập năm 2026 bởi nhóm sinh viên đầy nhiệt huyết từ 
              <span className="text-pink-500 font-bold"> Đại học Công nghiệp Hà Nội (HAUI)</span>, 
              ÉLÉGANCE mang trong mình khát vọng tạo nên một thương hiệu thời trang Việt Nam 
              vươn tầm thế giới.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Đội ngũ ÉLÉGANCE"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-200 rounded-3xl -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-100 rounded-full -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-pink-500 font-bold text-base uppercase tracking-wider">Câu chuyện</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-3 mb-6">
                Từ Giảng Đường Đến Thương Hiệu
              </h2>
              <div className="space-y-4 text-gray-600 text-lg font-medium leading-relaxed">
                <p>
                  ÉLÉGANCE bắt đầu từ một dự án khởi nghiệp của nhóm sinh viên năm cuối 
                  Đại học Công nghiệp Hà Nội. Với niềm đam mê thời trang và công nghệ, 
                  chúng tôi quyết định kết hợp hai thế mạnh để tạo nên một nền tảng 
                  thương mại điện tử thời trang hiện đại.
                </p>
                <p>
                  Tên gọi "ÉLÉGANCE" - sự thanh lịch - thể hiện triết lý của chúng tôi: 
                  mang đến cho phụ nữ Việt Nam những sản phẩm thời trang tinh tế, 
                  chất lượng với giá cả phải chăng.
                </p>
                <p>
                  Được hỗ trợ bởi các thầy cô và môi trường học thuật năng động tại HAUI, 
                  chúng tôi không ngừng học hỏi và phát triển để mang đến trải nghiệm 
                  mua sắm tốt nhất cho khách hàng.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HAUI Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-500 to-rose-400">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Tự Hào Sinh Viên HAUI
            </h2>
            <p className="text-xl font-medium text-white/90 max-w-3xl mx-auto mb-8">
              Đại học Công nghiệp Hà Nội (HAUI) không chỉ là nơi chúng tôi học tập mà còn là 
              nơi ươm mầm ước mơ khởi nghiệp. Với sự hỗ trợ từ các thầy cô và bạn bè, 
              ÉLÉGANCE đã từ ý tưởng trở thành hiện thực.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <p className="text-5xl font-bold">2026</p>
                <p className="text-white/80 font-semibold mt-2">Năm thành lập</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold">6</p>
                <p className="text-white/80 font-semibold mt-2">Thành viên sáng lập</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold">100%</p>
                <p className="text-white/80 font-semibold mt-2">Sinh viên HAUI</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Những giá trị định hướng mọi hoạt động của ÉLÉGANCE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 text-center hover:shadow-xl transition-shadow"
              >
                <span className="text-5xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-pink-50/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Hành Trình Phát Triển
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Những cột mốc quan trọng trong hành trình của ÉLÉGANCE
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-pink-200 mt-2" />
                  )}
                </div>
                <div className="flex-1 bg-white p-6 rounded-2xl shadow-md border border-pink-100">
                  <span className="text-pink-500 font-bold text-sm">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 font-medium">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Đội Ngũ Sáng Lập
            </h2>
            <p className="text-gray-600 text-lg font-medium">
              Những người trẻ đầy nhiệt huyết đứng sau ÉLÉGANCE
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 mx-auto w-32 h-32 md:w-40 md:h-40">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full border-4 border-pink-200"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-pink-500 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-100 to-pink-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Cùng Chúng Tôi Tỏa Sáng
            </h2>
            <p className="text-gray-600 text-lg font-medium mb-8">
              Khám phá bộ sưu tập thời trang của ÉLÉGANCE và trở thành một phần 
              trong hành trình của chúng tôi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button size="lg">Khám phá ngay</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Liên hệ hợp tác</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
