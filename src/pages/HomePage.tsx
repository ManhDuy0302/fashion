import {
  Hero,
  CategoryShowcase,
  FeaturedProducts,
  BrandStory,
  CallToAction,
} from '../components/home';

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts type="bestsellers" />
      <BrandStory />
      <FeaturedProducts type="new" />
      <CallToAction />
    </>
  );
}
