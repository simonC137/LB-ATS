import React, { useState } from 'react';
import scalable from '../assets/blogImages/scalable.jpg';
import business from '../assets/blogImages/business.jpg';
import seo from '../assets/blogImages/seo.jpg';
import web_ai from '../assets/blogImages/web_ai.jpg';
import postgresIndexing from '../assets/blogImages/postgresIndexing.jpg';
import { useNavigate } from 'react-router-dom';

interface ArticleListProps {
  id: number;
  title: string;
  date: string;
  tags: string[];
  description: string;
  image: string;
}

const blogArticlesList: ArticleListProps[] = [
  {
    id: 1,
    image: business,
    title: 'Why Every Business Needs a Website in 2025',
    date: '2024-10-03',
    tags: ['Business', 'Web Development', 'Marketing'],
    description:
      'Explore the importance of having a website for your business and how it can drive growth.',
  },
  {
    id: 2,
    image: seo,
    title: 'How to Optimize Your Website for Speed and SEO',
    date: '2024-11-15',
    tags: ['SEO', 'Performance', 'Web Development'],
    description:
      'Learn key techniques to improve website performance and search engine rankings.',
  },
  {
    id: 3,
    image: scalable,
    title: 'A Guide to Building Scalable Web Apps with Next.js',
    date: '2024-12-05',
    tags: ['Next.js', 'Scalability', 'Web Development'],
    description:
      'Discover best practices for developing scalable applications using Next.js.',
  },
  {
    id: 4,
    image: postgresIndexing,
    title: 'Understanding PostgreSQL Indexing for Faster Queries',
    date: '2025-01-20',
    tags: ['PostgreSQL', 'Database', 'Optimization'],
    description:
      'A deep dive into PostgreSQL indexing strategies to speed up database queries.',
  },
  {
    id: 5,
    image: web_ai,
    title: 'The Future of AI in Web Development',
    date: '2025-02-10',
    tags: ['AI', 'Web Development', 'Technology'],
    description:
      'Explore how artificial intelligence is shaping the future of web development and automation.',
  },
];

const BlogArticles: React.FC = () => {
  const [blogLists] = useState<ArticleListProps[]>(blogArticlesList);

  const navigate = useNavigate();

  const blogDetailsHandler = (id: number) => {
    navigate(`/blogDetail/${id}`);
  };
  return (
    <section className="w-full bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Latest Blog Articles
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogLists.map((blog) => (
            <div
              key={blog.id}
              className="shadow-lg bg-white rounded-xl cursor-pointer overflow-hidden flex flex-col h-full "
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-60 w-full object-cover transition-all duration-300 hover:scale-105"
              />
              <div className="p-5 flex flex-col flex-grow">
                <p className="text-sm text-gray-500">{blog.date}</p>
                <h3 className="text-xl font-semibold text-orange-500 py-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 flex-grow">{blog.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    blogDetailsHandler(blog.id);
                  }}
                  className="py-2 btn btn-sm my-4 bg-orange-400 text-black border-none hover:bg-orange-500"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;
