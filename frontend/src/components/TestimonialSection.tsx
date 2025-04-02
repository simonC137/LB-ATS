'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import TestimonialCard from './uiCards/TestimonialCard';
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
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h3 className="text-2xl font-medium text-center mb-4">
          Testimonials From Our Customers
        </h3>
        <p className="text-center text-gray-500 mb-8">
          What our clients say about us
        </p>

        <Swiper
          className="w-full"
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination, Autoplay]}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10, centeredSlides: true }, // Mobile
            640: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false }, // Tablet
            1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: true }, // Desktop
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className=" w-full flex justify-center">
              <div className="w-full max-w-sm mx-auto">
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === activeSlide}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
