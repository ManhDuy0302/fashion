import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionTitle, Button } from '../ui';
import { ProductCard } from '../products/ProductCard';
import { getFeaturedProducts, getNewArrivals } from '../../data/products';

interface FeaturedProductsProps {
  type?: 'bestsellers' | 'new';
}

export function FeaturedProducts({ type = 'bestsellers' }: FeaturedProductsProps) {
  const products = type === 'bestsellers' ? getFeaturedProducts() : getNewArrivals();
  const title = type === 'bestsellers' ? 'Sản Phẩm Bán Chạy' : 'Hàng Mới Về';
  const subtitle =
    type === 'bestsellers'
      ? 'Những sản phẩm được yêu thích nhất, được hàng ngàn khách hàng tin chọn'
      : 'Khám phá những mẫu thiết kế mới nhất trong bộ sưu tập';

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link to="/shop">
            <Button variant="outline" size="lg">
              Xem tất cả sản phẩm
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
