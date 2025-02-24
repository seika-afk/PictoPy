import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Sparkles,
  Video,
  Images,
  Settings,
  BookImage,
  Lock,
} from 'lucide-react';
import { useState } from 'react';
import AvatarUploader from '@/components/ui/AvatarUploader';

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  const linkClasses = (path: string) => {
    const baseClasses =
      'group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200';
    const activeClasses = isActive(path)
      ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
      : 'text-gray-500 dark:text-gray-300';
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <div
      className={`sidebar bg-theme-light rounded-2xl relative m-4 flex flex-col justify-between border border-gray-300 p-4 text-gray-900 shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 ${
        isExpanded ? 'w-48' : 'w-16'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar Uploader */}
      <div className="flex flex-col items-center py-2">
        <AvatarUploader />
      </div>

      <div className="mt-2 flex flex-col gap-2">
        {[
          { path: '/home', label: 'Home', Icon: Home },
          { path: '/ai-tagging', label: 'AI Tagging', Icon: Sparkles },
          { path: '/videos', label: 'Videos', Icon: Video },
          { path: '/albums', label: 'Albums', Icon: Images },
          { path: '/settings', label: 'Settings', Icon: Settings },
          { path: '/secure-folder', label: 'Secure Folder', Icon: Lock },
          { path: '/memories', label: 'Memories', Icon: BookImage },
        ].map(({ path, label, Icon }) => (
          <Link
            to={path}
            className={linkClasses(path)}
            tabIndex={0}
            aria-label={label}
            key={path}
          >
            <Icon
              className={`h-5 w-5 transition-transform duration-200 ease-out group-hover:scale-110 ${
                isActive(path) ? 'scale-110 text-gray-800' : ''
              }`}
              strokeWidth={isActive(path) ? 2.5 : 1.5}
            />
            <span
              className={`whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
