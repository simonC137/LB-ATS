import {
  FaLaptopCode, // For Software Development
  FaClipboardCheck, // For Product Management
  FaPaintBrush, // For UI/UX Design
  FaCheckCircle, // For Quality Assurance (QA)
  FaCog, // For DevOps
  FaChartLine, // For Data Science and Analytics
  FaLock, // For Cybersecurity
  FaHeadset, // For Technical Support
  FaBullhorn, // For Sales and Marketing
} from 'react-icons/fa';

const categories = [
  {
    id: 1,
    title: 'Software Development',
    description: 'Design and develop software applications and systems.',
    location: 'Remote',
    employment_type: 'Full-time',
    department: 'IT',
    posted_date: '2024-12-01',
    closing_date: '2025-01-01',
    positions: '15 open positions',
    icon: <FaLaptopCode />,
  },
  {
    id: 2,
    title: 'Product Management',
    description: 'Manage product lifecycle from conception to launch.',
    location: 'New York, NY',
    employment_type: 'Full-time',
    department: 'Product',
    posted_date: '2024-12-05',
    closing_date: '2025-01-05',
    positions: '8 open positions',
    icon: <FaClipboardCheck />,
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'Create user-friendly interfaces and enhance user experience.',
    location: 'San Francisco, CA',
    employment_type: 'Part-time',
    department: 'Design',
    posted_date: '2024-12-10',
    closing_date: '2025-01-10',
    positions: '10 open positions',
    icon: <FaPaintBrush />,
  },
  {
    id: 4,
    title: 'Quality Assurance (QA)',
    description: 'Ensure the quality and functionality of software products.',
    location: 'Austin, TX',
    employment_type: 'Full-time',
    department: 'Quality',
    posted_date: '2024-12-12',
    closing_date: '2025-01-12',
    positions: '5 open positions',
    icon: <FaCheckCircle />,
  },
  {
    id: 5,
    title: 'DevOps',
    description: 'Manage infrastructure and deployment processes.',
    location: 'Seattle, WA',
    employment_type: 'Full-time',
    department: 'DevOps',
    posted_date: '2024-12-15',
    closing_date: '2025-01-15',
    positions: '6 open positions',
    icon: <FaCog />,
  },
  {
    id: 6,
    title: 'Data Science and Analytics',
    description: 'Analyze data and derive actionable insights.',
    location: 'Chicago, IL',
    employment_type: 'Contract',
    department: 'Data',
    posted_date: '2024-12-18',
    closing_date: '2025-01-18',
    positions: '4 open positions',
    icon: <FaChartLine />,
  },
  {
    id: 7,
    title: 'Cybersecurity',
    description: 'Protect systems and networks from cyber threats.',
    location: 'Remote',
    employment_type: 'Full-time',
    department: 'Security',
    posted_date: '2024-12-20',
    closing_date: '2025-01-20',
    positions: '3 open positions',
    icon: <FaLock />,
  },
  {
    id: 8,
    title: 'Technical Support',
    description: 'Provide assistance and troubleshooting for technical issues.',
    location: 'Miami, FL',
    employment_type: 'Part-time',
    department: 'Support',
    posted_date: '2024-12-22',
    closing_date: '2025-01-22',
    positions: '9 open positions',
    icon: <FaHeadset />,
  },
  {
    id: 9,
    title: 'Sales and Marketing',
    description: 'Develop strategies to promote and sell products.',
    location: 'Boston, MA',
    employment_type: 'Full-time',
    department: 'Sales',
    posted_date: '2024-12-25',
    closing_date: '2025-01-25',
    positions: '20 open positions',
    icon: <FaBullhorn />,
  },
];

export default function PopularJobCategories() {
  return (
    <main className="max-w-7xl mx-auto pt-16 py-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Popular Job Categories
      </h2>
      <p className="text-center text-gray-500 mb-12">
        2024 jobs live - 10 added today.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(({ title, positions, icon }, index) => (
          <li
            key={index}
            className="flex items-center p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Apply hover effects to the div containing the icon */}
            <div className="flex items-center justify-center text-blue-500 text-2xl p-2 bg-blue-50 border border-gray-400 rounded-md transition-all duration-300 mr-6 hover:bg-orange-600 hover:text-white">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="text-base text-gray-500">{positions}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
