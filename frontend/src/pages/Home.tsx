import BlogArticles from '../components/BlogArticlesList';
import FeaturedJob from '../components/FeaturedJob';
import HeroSection from '../components/HeroSection';
import OurValuesSection from '../components/OurValuesSection';
import PopularJobCategories from '../components/PopularJobCategory';
import TestimonialSection from '../components/TestimonialSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <PopularJobCategories />
      <FeaturedJob />
      <TestimonialSection />
      <OurValuesSection />
      <BlogArticles />
    </>
  );
};

export default Home;
