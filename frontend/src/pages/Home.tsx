import FeaturedJob from '../components/FeaturedJob';
import HeroSection from '../components/HeroSection';
import PopularJobCategories from '../components/PopularJobCategory';
import TestimonialSection from '../components/TestimonialSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <PopularJobCategories />
      <FeaturedJob />
      <TestimonialSection />
    </>
  );
};

export default Home;
