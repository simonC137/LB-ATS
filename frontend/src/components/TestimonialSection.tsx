'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'; // Import all styles
import 'swiper/css/navigation'; // Import navigation styles
import { useState } from 'react';

const testimonials = [
  {
    name: 'Nicole Wells',
    job: 'Web Developer',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    title: 'Good theme',
    message:
      'Without JobHunt I’d be homeless, they found me a job and got me sorted out quickly...',
  },
  {
    name: 'Gabriel Nolan',
    job: 'Consultant',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    title: 'Great quality!',
    message:
      'Without JobHunt I’d be homeless, they found me a job and got me sorted out quickly...',
  },
  {
    name: 'Ashley Jenkins',
    job: 'Designer',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    title: 'Modern Design',
    message:
      'Without JobHunt I’d be homeless, they found me a job and got me sorted out quickly...',
  },
  {
    name: 'Michael Lee',
    job: 'Software Engineer',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    title: 'Highly Recommended',
    message:
      'Without JobHunt I’d be homeless, they found me a job and got me sorted out quickly...',
  },
];

const TestimonialSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="py-20 bg-gray-100">
      {' '}
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-medium text-center mb-4">
          Testimonials From Our Customers
        </h3>
        <p className="text-center text-gray-500 mb-8">
          What our clients say about us
        </p>

        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div
                className={`bg-white shadow-lg rounded-lg p-8  transform transition duration-500 ${
                  index === activeSlide ? 'scale-110 opacity-100' : 'opacity-70'
                }`}
              >
                <h3 className="text-orange-600 font-semibold">
                  {testimonial.title}
                </h3>
                <p className="text-gray-700 mt-2">{testimonial.message}</p>
                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.job}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
