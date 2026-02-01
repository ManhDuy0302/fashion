import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductGrid } from '../components/products';
import { products, getProductsByCollection } from '../data/products';
import type { SortOption } from '../types';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const collectionParam = searchParams.get('collection') || '';
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Category mapping for filter
  const categoryFilters = [
    { slug: 'all', name: 'Tất cả' },
    { slug: 'women', name: 'Thời Trang Nữ' },
    { slug: 'vay', name: 'Váy & Đầm' },
    { slug: 'tui-xach', name: 'Túi Xách' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by collection first
    if (collectionParam) {
      result = getProductsByCollection(collectionParam);
    }
    // Then filter by category
    else if (categoryParam !== 'all') {
      if (categoryParam === 'women') {
        // Thời trang nữ = tất cả trừ phụ kiện nam
        result = result.filter((p) => 
          ['Váy', 'Áo', 'Áo khoác', 'Quần'].includes(p.category)
        );
      } else if (categoryParam === 'vay') {
        // Váy & Đầm
        result = result.filter((p) => p.category === 'Váy');
      } else if (categoryParam === 'tui-xach') {
        // Túi xách
        result = result.filter((p) => p.category === 'Túi Xách');
      } else {
        // Các category khác
        result = result.filter((p) => 
          p.category.toLowerCase().replace(/\s+/g, '-') === categoryParam ||
          p.category.toLowerCase() === categoryParam.replace(/-/g, ' ')
        );
      }
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [categoryParam, collectionParam, sortBy]);

  const handleCategoryChange = (slug: string) => {
    searchParams.delete('collection');
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const getPageTitle = () => {
    if (collectionParam) {
      const collectionNames: Record<string, string> = {
        'spring-summer': 'Bộ Sưu Tập Xuân Hè 2026',
        'autumn-winter': 'Bộ Sưu Tập Thu Đông 2026',
        'minimal': 'Bộ Sưu Tập Tối Giản',
        'elegant': 'Bộ Sưu Tập Thanh Lịch',
      };
      return collectionNames[collectionParam] || 'Cửa Hàng';
    }
    
    if (categoryParam !== 'all') {
      const cat = categoryFilters.find(c => c.slug === categoryParam);
      return cat?.name || 'Cửa Hàng';
    }
    
    return 'Cửa Hàng';
  };

  return (
    <div className="bg-gradient-to-b from-pink-50/50 to-white min-h-screen py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Khám phá bộ sưu tập thời trang với {filteredProducts.length} sản phẩm độc đáo
          </p>
        </motion.div>

        {/* Filters - Only show when not viewing a collection */}
        {!collectionParam && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-pink-100"
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categoryFilters.map((cat) => (
                <motion.button
                  key={cat.slug}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-5 py-2.5 rounded-full text-base font-bold transition-all ${
                    categoryParam === cat.slug
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                      : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <label className="text-base text-gray-700 font-bold">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-5 py-2.5 bg-pink-50 border-0 rounded-full text-base font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá: Thấp → Cao</option>
                <option value="price-high">Giá: Cao → Thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Collection filter bar */}
        {collectionParam && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-pink-100"
          >
            <button
              onClick={() => {
                searchParams.delete('collection');
                setSearchParams(searchParams);
              }}
              className="inline-flex items-center gap-2 text-pink-500 font-bold hover:text-pink-600 text-base"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Xem tất cả sản phẩm
            </button>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <label className="text-base text-gray-700 font-bold">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-5 py-2.5 bg-pink-50 border-0 rounded-full text-base font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá: Thấp → Cao</option>
                <option value="price-high">Giá: Cao → Thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 text-base font-bold mb-8"
        >
          Hiển thị <span className="text-pink-500">{filteredProducts.length}</span> sản phẩm
        </motion.p>

        {/* Products */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
