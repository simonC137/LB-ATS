interface TestimonialCardProps {
  testimonial: {
    name: string;
    job: string;
    photo: string;
    title: string;
    message: string;
  };
  isActive: boolean;
}

const TestimonialCard = ({ testimonial, isActive }: TestimonialCardProps) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-8 w-full max-w-sm transform transition-all duration-500 ease-in-out ${
        isActive ? 'scale-105 opacity-100 shadow-xl' : 'scale-95 opacity-70'
      }`}
    >
      <h3 className="text-orange-600 font-semibold text-lg">
        {testimonial.title}
      </h3>
      <p className="text-gray-700 mt-2 text-sm">{testimonial.message}</p>
      <div className="flex items-center mt-4">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          width={60}
          height={60}
          className="rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/60'; // Fallback image
          }}
        />
        <div className="ml-3">
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.job}</p>
        </div>
      </div>
    </div>
  );
};
export default TestimonialCard;