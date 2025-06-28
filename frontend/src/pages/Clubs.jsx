import React, { useState, useContext } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon, Squares2X2Icon, Bars3Icon, UsersIcon, ClockIcon, CalendarDaysIcon, MapPinIcon, XMarkIcon, PlusIcon, CheckCircleIcon, MinusCircleIcon, StarIcon, TagIcon, ArrowRightOnRectangleIcon, CodeBracketIcon, ChatBubbleLeftRightIcon, CameraIcon, TrophyIcon, GlobeAltIcon, SparklesIcon, ArrowRightIcon, EyeIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useLocation, Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/ui/dialog';
import { Progress } from '../components/ui/progress';
import { SidebarContext } from '../layout/MainLayout';

// At the top level of the file, outside any component:
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .scrollbar-none::-webkit-scrollbar { display: none !important; }
    .scrollbar-none { scrollbar-width: none !important; -ms-overflow-style: none !important; }
  `;
  document.head.appendChild(style);
}

const mockClubs = [
  {
    id: 1,
    name: 'Programming Club',
    category: 'Technology',
    role: 'Admin',
    status: 'Active',
    description: 'A community of coding enthusiasts who collaborate on projects, participate in hackathons, and learn new technologies together.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    schedule: 'Every Tuesday, 5:00 PM',
    location: 'Tech Lab 201',
    members: 42,
    lastActive: 'Yesterday',
  },
  {
    id: 2,
    name: 'Debate Society',
    category: 'Academic',
    role: 'Member',
    status: 'Active',
    description: 'Enhances public speaking skills through regular debates on current affairs, philosophical topics, and more.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    schedule: 'Every Monday, 4:30 PM',
    location: 'Humanities Building, Room 105',
    members: 35,
    lastActive: '3 days ago',
  },
  {
    id: 3,
    name: 'Photography Club',
    category: 'Arts & Culture',
    role: 'Member',
    status: 'Active',
    description: 'Explore photography techniques, participate in photo walks, and showcase your work in campus exhibitions.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80',
    schedule: 'Every Saturday, 10:00 AM',
    location: 'Arts Building, Studio 3',
    members: 28,
    lastActive: '1 week ago',
  },
  {
    id: 4,
    name: 'Basketball Team',
    category: 'Sports',
    role: 'Member',
    status: 'Active',
    description: 'Compete in inter-college tournaments and improve your basketball skills through regular practice sessions.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
    schedule: 'Tuesday & Thursday, 6:00 PM',
    location: 'Sports Complex, Court 2',
    members: 18,
    lastActive: '2 days ago',
  },
  {
    id: 5,
    name: 'Environmental Society',
    category: 'Social',
    role: 'Leader',
    status: 'Active',
    description: 'Promote environmental awareness through campus initiatives, tree planting drives, and sustainability workshops.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    schedule: 'Every Friday, 3:00 PM',
    location: 'Science Building, Room 302',
    members: 32,
    lastActive: '4 days ago',
  },
  {
    id: 6,
    name: 'Business Club',
    category: 'Professional',
    role: 'Member',
    status: 'Inactive',
    description: 'Network with industry professionals, develop entrepreneurial skills, and participate in business competitions.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    schedule: 'Every Wednesday, 5:30 PM',
    location: 'Business School, Conference Room',
    members: 45,
    lastActive: '5 days ago',
  },
];

const mockActivities = [
  {
    id: 1,
    title: 'Code Jam',
    club: 'Programming Club',
    date: 'June 28, 2025',
    time: '4:00 PM - 8:00 PM',
    location: 'Tech Lab 201',
    color: 'purple',
  },
  {
    id: 2,
    title: 'Inter-College Debate',
    club: 'Debate Society',
    date: 'July 5, 2025',
    time: '2:00 PM - 4:00 PM',
    location: 'Humanities Building, Auditorium',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Photo Walk: Urban Landscapes',
    club: 'Photography Club',
    date: 'June 30, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Meeting at Campus Main Gate',
    color: 'pink',
  },
  {
    id: 4,
    title: 'Match vs. State University',
    club: 'Basketball Team',
    date: 'July 3, 2025',
    time: '3:00 PM - 5:00 PM',
    location: 'Sports Complex, Main Court',
    color: 'green',
  },
  {
    id: 5,
    title: 'Campus Cleanup Drive',
    club: 'Environmental Society',
    date: 'June 29, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Meet at Student Center',
    color: 'yellow',
  },
];

const categories = [
  'All Categories',
  'Technology',
  'Academic',
  'Arts & Culture',
  'Sports',
  'Social',
  'Professional',
];

// ClubCard for /clubs
function ClubCard({ club, direction = 'col' }) {
  return (
    <div className={`bg-white rounded-2xl shadow flex flex-${direction} overflow-hidden border border-gray-100`}>
      <div className={direction === 'col' ? 'h-[200px] w-full overflow-hidden' : 'w-1/3 h-auto min-h-[180px] overflow-hidden flex-shrink-0'}>
        <img
          src={club.image}
          alt={club.name}
          className={direction === 'col' ? 'w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105' : 'w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105'}
        />
      </div>
      <div className={`p-6 flex-1 flex flex-col${direction === 'row' ? ' justify-between' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white flex items-center justify-center">
              {club.logo ? (
                <img src={club.logo} alt={club.name} className="h-full w-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-gray-100 text-lg font-bold text-gray-700">{club.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{club.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs font-semibold">{club.category}</span>
                {club.role && (
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${club.role === 'Admin' ? 'bg-purple-100 text-purple-700' : club.role === 'Leader' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{club.role}</span>
                )}
              </div>
            </div>
          </div>
          <span className="bg-black text-white rounded-full px-3 py-1 text-xs font-semibold">Active</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{club.description}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-2">
            <ClockIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">{club.schedule}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">{club.location}</span>
          </div>
          <div className="flex items-start gap-2">
            <UsersIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">{club.members} members</span>
          </div>
          <div className="flex items-start gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">Last active: {club.lastActive}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-auto">
          <button className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded-md text-base flex items-center justify-center gap-2 transition">
            View Details
          </button>
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md px-4 py-2 flex items-center justify-center gap-2 text-base transition w-fit min-w-[100px]">
            <ArrowRightOnRectangleIcon className="w-5 h-5" /> Leave
          </button>
        </div>
      </div>
    </div>
  );
}

// JoinClubCard for /clubs/join
function JoinClubCard({ club, direction = 'col' }) {
  return (
    <div className={`bg-white rounded-2xl shadow flex flex-${direction} overflow-hidden border border-gray-100`}>
      <div className={direction === 'col' ? 'h-[200px] w-full overflow-hidden' : 'w-1/3 h-auto min-h-[180px] overflow-hidden flex-shrink-0'}>
        <img
          src={club.image}
          alt={club.name}
          className={direction === 'col' ? 'w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105' : 'w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105'}
        />
      </div>
      <div className={`p-6 flex-1 flex flex-col${direction === 'row' ? ' justify-between' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white flex items-center justify-center">
              {club.logo ? (
                <img src={club.logo} alt={club.name} className="h-full w-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center bg-gray-100 text-lg font-bold text-gray-700">{club.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{club.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs font-semibold">{club.category}</span>
                <span className="bg-green-50 text-green-700 border-green-200 rounded px-2 py-0.5 text-xs font-semibold">Open to Join</span>
              </div>
            </div>
          </div>
          <button className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-red-100 transition-colors">
            <StarIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{club.description}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-start gap-2">
            <ClockIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">{club.meetingSchedule}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">{club.location}</span>
          </div>
          <div className="flex items-start gap-2">
            <UsersIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">{club.memberCount} members</span>
          </div>
          <div className="flex items-start gap-2">
            <CalendarDaysIcon className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-600">Last active: {club.lastActivity}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-auto">
          <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md px-4 py-2 flex items-center gap-2">
            <EyeIcon className="w-5 h-5" /> View Details
          </button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-2 flex items-center gap-2">
            <UsersIcon className="w-5 h-5" /> Join Club
          </button>
        </div>
      </div>
    </div>
  );
}

// Breadcrumb component
function ClubsBreadcrumb() {
  const location = useLocation();
  const path = location.pathname;
  let crumbs = [
    { name: 'Home', to: '/' },
    { name: 'Clubs', to: '/clubs' },
  ];
  if (path === '/clubs/join') {
    crumbs.push({ name: 'Join', to: '/clubs/join' });
  } else if (path === '/clubs/events') {
    crumbs.push({ name: 'Events', to: '/clubs/events' });
  }
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {crumbs.map((crumb, idx) => (
          <li key={crumb.to} className="flex items-center">
            {idx > 0 && <span className="mx-1">/</span>}
            {idx < crumbs.length - 1 ? (
              <Link to={crumb.to} className="hover:underline text-purple-700">{crumb.name}</Link>
            ) : (
              <span className="text-gray-700 font-semibold">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Clubs() {
  const { collapsed } = useContext(SidebarContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [view, setView] = useState('grid');

  const filteredClubs = mockClubs.filter(
    c => (category === 'All Categories' || c.category === category) &&
      c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative flex-1 flex">
        {/* Main Content */}
        <div className={`flex-1 py-8 px-4 md:px-4 transition-all duration-300 ${collapsed ? '' : ''} mr-80`}>
          <ClubsBreadcrumb />
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative w-full max-w-xs">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Search clubs..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  className="rounded-lg border border-gray-200 py-2 px-4 text-base bg-white"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
                <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="inline-flex bg-gray-100 border border-gray-200 rounded-md p-1">
              <button
                className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-white shadow border border-gray-200' : 'bg-gray-100'}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-white shadow border border-gray-200' : 'bg-gray-100'}`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mb-4 text-gray-700 text-sm font-medium">Showing {filteredClubs.length} clubs</div>
          {/* Clubs Grid */}
          <div className={`grid ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
            {filteredClubs.map(club => (
              <ClubCard key={club.id} club={club} direction={view === 'grid' ? 'col' : 'row'} />
            ))}
          </div>
        </div>
        {/* Sidebar */}
        <aside className="md:block fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 z-30 overflow-y-scroll scrollbar-none flex flex-col pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="p-6 flex flex-col min-h-full">
            {/* Upcoming Activities */}
            <h4 className="font-bold text-base text-gray-900 mb-4">Upcoming Activities</h4>
            <div className="flex flex-col gap-4">
              {mockActivities.map(act => {
                let Icon = SparklesIcon;
                if (act.club === 'Programming Club') Icon = CodeBracketIcon;
                else if (act.club === 'Debate Society') Icon = ChatBubbleLeftRightIcon;
                else if (act.club === 'Photography Club') Icon = CameraIcon;
                else if (act.club === 'Basketball Team') Icon = TrophyIcon;
                else if (act.club === 'Environmental Society') Icon = GlobeAltIcon;
                return (
                  <div key={act.id} className="flex items-start gap-3">
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center mt-1 flex-shrink-0 ${act.color === 'purple' ? 'bg-purple-100' : act.color === 'blue' ? 'bg-blue-100' : act.color === 'pink' ? 'bg-pink-100' : act.color === 'green' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                      <Icon className={`w-5 h-5 ${act.color === 'purple' ? 'text-purple-500' : act.color === 'blue' ? 'text-blue-500' : act.color === 'pink' ? 'text-pink-500' : act.color === 'green' ? 'text-green-500' : 'text-yellow-500'}`} />
                    </span>
                    <div className="flex-1">
                      <div className="font-bold text-base text-gray-900 leading-tight">{act.title}</div>
                      <div className="text-sm text-gray-500 mb-1">{act.club}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{act.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                        <ClockIcon className="w-4 h-4" />
                        <span>{act.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{act.location}</span>
                      </div>
                    </div>
                    <button className="ml-2 mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1 rounded-sm text-xs transition">RSVP</button>
                  </div>
                );
              })}
            </div>
            <a href="#" className="flex items-center justify-center gap-1 text-purple-600 hover:underline text-xs font-semibold mt-4">View All Activities <ArrowRightIcon className="w-4 h-4" /></a>
            <div className="my-6 border-t border-gray-200" />
            {/* Quick Actions */}
            <h4 className="font-bold text-base text-gray-900 mb-2">Quick Actions</h4>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm transition"><PlusIcon className="w-5 h-5" /> Join New Club</button>
              <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm transition"><CalendarDaysIcon className="w-5 h-5" /> View Club Events</button>
              <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm transition"><UsersIcon className="w-5 h-5" /> My Favorite Clubs</button>
            </div>
          </div>
          <style>{`
            .scrollbar-none::-webkit-scrollbar { display: none; }
          `}</style>
        </aside>
      </div>
      {/* Footer */}
      <footer className="ml-4 w-[56rem] mt-10 py-6 text-center text-xs text-gray-400 border-t">
        <div className="flex justify-center gap-6 mb-2">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-transform transform hover:-translate-y-1" aria-label="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-transform transform hover:-translate-y-1" aria-label="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-700 transition-transform transform hover:-translate-y-1" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500 transition-transform transform hover:-translate-y-1" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 500 500"><path className="cls-1" d="M250,193.27A56.73,56.73,0,1,0,306.73,250,56.8,56.8,0,0,0,250,193.27Z" /><path className="cls-1" d="M316.74,105.49H183.26a77.86,77.86,0,0,0-77.77,77.77V316.74a77.86,77.86,0,0,0,77.77,77.77H316.74a77.86,77.86,0,0,0,77.77-77.77V183.26A77.86,77.86,0,0,0,316.74,105.49ZM250,336.7A86.7,86.7,0,1,1,336.7,250,86.8,86.8,0,0,1,250,336.7Zm95.27-160.26A21.41,21.41,0,1,1,366.68,155,21.41,21.41,0,0,1,345.27,176.45Z" /><path className="cls-1" d="M484.85,124.74a144.17,144.17,0,0,0-2.32-25.29c-1.94-10.19-4.67-20.12-9.55-29.33A101.84,101.84,0,0,0,453.39,44a97.14,97.14,0,0,0-42.76-24.4c-14.83-4-30-4.84-45.21-4.82a.46.46,0,0,1-.09-.23H134.59c0,.08,0,.16,0,.23-8.65.16-17.32.09-25.92,1.16A123.46,123.46,0,0,0,81,22.14,97.48,97.48,0,0,0,44.25,46.26,97.15,97.15,0,0,0,19.68,89.17c-3.94,14.72-4.8,29.73-4.82,44.85L14.7,365.69v0c.28,10.45.37,21,2.13,31.36,1.87,11,4.54,21.71,9.64,31.69A101.36,101.36,0,0,0,54.77,463a91.91,91.91,0,0,0,28.31,15.35c15.12,4.88,30.72,6.75,46.55,6.84,9.88.06,19.74.31,29.62.27,71.74-.3,143.49.52,215.23-.44a169.32,169.32,0,0,0,28.23-3A95.61,95.61,0,0,0,450,459c15.78-14.08,26.43-31.3,31.24-52.09,3.15-13.59,3.93-27.38,4.07-41.21v-2.76C485.3,361.86,484.89,127.84,484.85,124.74Zm-60.38,192A107.87,107.87,0,0,1,316.74,424.48H183.26A107.87,107.87,0,0,1,75.52,316.74V183.26A107.87,107.87,0,0,1,183.26,75.52H316.74A107.87,107.87,0,0,1,424.48,183.26Z" /></svg>
          </a>
        </div>
        <div className="text-gray-400">
          © 2025 CampusConnect. All rights reserved.<br />
          <span className="block mt-1">
            <a href="#" className="hover:underline">Privacy Policy</a> · <a href="#" className="hover:underline">Terms of Service</a> · <a href="#" className="hover:underline">Contact Us</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

// --- JoinClubPage implementation for /clubs/join ---
function JoinClubPage() {
  const { collapsed } = useContext(SidebarContext);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [memberCountFilter, setMemberCountFilter] = useState([0, 100]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') setShowCategoryDropdown(false);
    }
    if (showCategoryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showCategoryDropdown]);

  const clubCategories = [
    'All',
    'Academic',
    'Arts & Culture',
    'Sports',
    'Technology',
    'Social',
    'Professional'
  ];
  const availableClubsData = [
    {
      id: 1,
      name: 'Robotics Club',
      category: 'Technology',
      memberCount: 38,
      meetingSchedule: 'Every Wednesday, 4:00 PM',
      location: 'Engineering Building, Room 305',
      lastActivity: '2 days ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=modern%2520robotics%2520club%2520logo%2520with%2520robot%2520arm%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520tech%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520robotics%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520blue%2520and%2520white%2520color%2520scheme&width=100&height=100&seq=30&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520group%2520of%2520college%2520students%2520working%2520on%2520robotics%2520project%2520in%2520modern%2520lab%252C%2520collaborative%2520engineering%2520session%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520photography%252C%2520technology%2520themed%2520environment%2520with%2520robotics%2520equipment%2520and%2520computers&width=400&height=250&seq=31&orientation=landscape',
      description: 'Design, build, and program robots for competitions and exhibitions. Learn about mechanical engineering, electronics, and artificial intelligence in a hands-on environment.',
      upcomingEvents: [
        { name: 'Robot Design Workshop', date: 'June 30, 2025', time: '4:00 PM - 7:00 PM' }
      ]
    },
    {
      id: 2,
      name: 'Literature Society',
      category: 'Academic',
      memberCount: 25,
      meetingSchedule: 'Every Friday, 3:30 PM',
      location: 'Library, Discussion Room 2',
      lastActivity: '1 week ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=literature%2520society%2520logo%2520with%2520open%2520book%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520academic%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520literature%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520warm%2520color%2520palette&width=100&height=100&seq=32&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520group%2520of%2520college%2520students%2520in%2520cozy%2520library%2520setting%2520discussing%2520books%252C%2520literature%2520club%2520meeting%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520photography%252C%2520academic%2520environment%2520with%2520bookshelves%2520and%2520comfortable%2520seating&width=400&height=250&seq=33&orientation=landscape',
      description: 'Explore classic and contemporary literature through discussions, author studies, and creative writing workshops. Perfect for book lovers and aspiring writers.',
      upcomingEvents: [
        { name: 'Poetry Reading Night', date: 'July 2, 2025', time: '6:00 PM - 8:00 PM' }
      ]
    },
    {
      id: 3,
      name: 'Jazz Ensemble',
      category: 'Arts & Culture',
      memberCount: 15,
      meetingSchedule: 'Tuesday & Thursday, 5:00 PM',
      location: 'Music Building, Room 101',
      lastActivity: '3 days ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=jazz%2520ensemble%2520logo%2520with%2520saxophone%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520artistic%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520music%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520gold%2520and%2520black%2520color%2520scheme&width=100&height=100&seq=34&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520college%2520jazz%2520band%2520rehearsing%2520in%2520music%2520studio%252C%2520students%2520with%2520various%2520instruments%252C%2520collaborative%2520music%2520session%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520photography%252C%2520artistic%2520environment%2520with%2520music%2520stands%2520and%2520acoustic%2520treatment&width=400&height=250&seq=35&orientation=landscape',
      description: 'Perform jazz standards and contemporary pieces in a collaborative ensemble. Open to instrumentalists of all levels with a passion for jazz music.',
      upcomingEvents: [
        { name: 'Campus Jazz Night', date: 'July 7, 2025', time: '7:00 PM - 9:00 PM' }
      ]
    },
    {
      id: 4,
      name: 'Volleyball Club',
      category: 'Sports',
      memberCount: 22,
      meetingSchedule: 'Monday & Wednesday, 6:30 PM',
      location: 'Sports Complex, Court 3',
      lastActivity: '2 days ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=volleyball%2520club%2520logo%2520with%2520volleyball%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520sports%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520volleyball%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520blue%2520and%2520white%2520color%2520scheme&width=100&height=100&seq=36&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520college%2520volleyball%2520team%2520practicing%2520in%2520modern%2520indoor%2520court%252C%2520sports%2520training%2520session%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520sports%2520photography%252C%2520athletic%2520environment%2520with%2520volleyball%2520net%2520and%2520equipment&width=400&height=250&seq=37&orientation=landscape',
      description: 'Join our recreational volleyball club to improve your skills, stay active, and compete in friendly matches against other college teams.',
      upcomingEvents: [
        { name: 'Practice Session', date: 'June 26, 2025', time: '6:30 PM - 8:30 PM' },
        { name: 'Friendly Match', date: 'July 10, 2025', time: '5:00 PM - 7:00 PM' }
      ]
    },
    {
      id: 5,
      name: 'Mental Health',
      category: 'Social',
      memberCount: 40,
      meetingSchedule: 'Every Monday, 4:00 PM',
      location: 'Student Center, Room 202',
      lastActivity: '1 day ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=mental%2520health%2520awareness%2520logo%2520with%2520brain%2520and%2520heart%2520symbol%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520wellness%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520mental%2520health%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520teal%2520and%2520purple%2520color%2520scheme&width=100&height=100&seq=38&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520group%2520of%2520college%2520students%2520in%2520circle%2520discussion%2520about%2520mental%2520health%252C%2520supportive%2520community%2520meeting%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520photography%252C%2520wellness%2520themed%2520environment%2520with%2520comfortable%2520seating%2520and%2520calm%2520atmosphere&width=400&height=250&seq=39&orientation=landscape',
      description: 'Promote mental health awareness through campus initiatives, support groups, and educational workshops. Create a stigma-free environment for all students.',
      upcomingEvents: [
        { name: 'Stress Management Workshop', date: 'June 27, 2025', time: '4:00 PM - 5:30 PM' }
      ]
    },
    {
      id: 6,
      name: 'Finance Club',
      category: 'Professional',
      memberCount: 35,
      meetingSchedule: 'Every Thursday, 5:00 PM',
      location: 'Business School, Room 405',
      lastActivity: '4 days ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=finance%2520club%2520logo%2520with%2520graph%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520corporate%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520finance%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520green%2520and%2520blue%2520color%2520scheme&width=100&height=100&seq=40&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520college%2520students%2520in%2520business%2520attire%2520attending%2520finance%2520workshop%252C%2520professional%2520development%2520session%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520photography%252C%2520corporate%2520environment%2520with%2520presentation%2520screen%2520and%2520modern%2520conference%2520room&width=400&height=250&seq=41&orientation=landscape',
      description: 'Learn about personal finance, investing, and financial markets. Network with industry professionals and prepare for careers in finance and business.',
      upcomingEvents: [
        { name: 'Investment Workshop', date: 'July 4, 2025', time: '5:00 PM - 7:00 PM' }
      ]
    },
    {
      id: 7,
      name: 'Film Society',
      category: 'Arts & Culture',
      memberCount: 30,
      meetingSchedule: 'Every Saturday, 3:00 PM',
      location: 'Media Center, Screening Room',
      lastActivity: '5 days ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=film%2520society%2520logo%2520with%2520camera%2520and%2520film%2520reel%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520artistic%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520cinema%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520black%2520and%2520red%2520color%2520scheme&width=100&height=100&seq=42&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520college%2520students%2520watching%2520film%2520in%2520modern%2520screening%2520room%252C%2520film%2520club%2520meeting%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520photography%252C%2520artistic%2520environment%2520with%2520projection%2520screen%2520and%2520comfortable%2520seating&width=400&height=250&seq=43&orientation=landscape',
      description: 'Watch and discuss classic and contemporary films from around the world. Learn about film history, analysis, and participate in student film projects.',
      upcomingEvents: [
        { name: 'International Film Screening', date: 'July 1, 2025', time: '6:00 PM - 9:00 PM' }
      ]
    },
    {
      id: 8,
      name: 'Entrepreneurship Hub',
      category: 'Professional',
      memberCount: 45,
      meetingSchedule: 'Every Tuesday, 6:00 PM',
      location: 'Innovation Center, Main Hall',
      lastActivity: '1 day ago',
      isActive: true,
      logo: 'https://readdy.ai/api/search-image?query=entrepreneurship%2520hub%2520logo%2520with%2520lightbulb%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520startup%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520innovation%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520orange%2520and%2520blue%2520color%2520scheme&width=100&height=100&seq=44&orientation=squarish',
      image: 'https://readdy.ai/api/search-image?query=diverse%2520college%2520students%2520brainstorming%2520with%2520sticky%2520notes%2520in%2520modern%2520innovation%2520space%252C%2520startup%2520planning%2520session%252C%2520clean%2520minimal%2520background%252C%2520soft%2520lighting%252C%2520professional%2520photography%252C%2520entrepreneurial%2520environment%2520with%2520whiteboards%2520and%2520collaborative%2520workspace&width=400&height=250&seq=45&orientation=landscape',
      description: 'Develop your business ideas, learn from successful entrepreneurs, and collaborate on innovative projects. Includes workshops, mentorship, and pitch competitions.',
      upcomingEvents: [
        { name: 'Startup Pitch Night', date: 'July 9, 2025', time: '5:00 PM - 8:00 PM' }
      ]
    }
  ];
  const featuredClubs = [
    {
      id: 3,
      name: 'Jazz Ensemble',
      category: 'Arts & Culture',
      memberCount: 15,
      logo: 'https://readdy.ai/api/search-image?query=jazz%2520ensemble%2520logo%2520with%2520saxophone%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520artistic%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520music%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520gold%2520and%2520black%2520color%2520scheme&width=100&height=100&seq=34&orientation=squarish',
    },
    {
      id: 5,
      name: 'Mental Health ',
      category: 'Social',
      memberCount: 40,
      logo: 'https://readdy.ai/api/search-image?query=mental%2520health%2520awareness%2520logo%2520with%2520brain%2520and%2520heart%2520symbol%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520wellness%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520mental%2520health%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520teal%2520and%2520purple%2520color%2520scheme&width=100&height=100&seq=38&orientation=squarish',
    },
    {
      id: 8,
      name: 'Entrepreneurship Hub',
      category: 'Professional',
      memberCount: 45,
      logo: 'https://readdy.ai/api/search-image?query=entrepreneurship%2520hub%2520logo%2520with%2520lightbulb%2520and%2520minimal%2520design%252C%2520clean%2520background%252C%2520professional%2520branding%252C%2520startup%2520aesthetic%252C%2520simple%2520elegant%2520design%2520with%2520innovation%2520symbols%252C%2520high%2520quality%2520digital%2520art%2520with%2520orange%2520and%2520blue%2520color%2520scheme&width=100&height=100&seq=44&orientation=squarish',
    }
  ];
  const filteredClubs = availableClubsData.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || club.category === categoryFilter;
    const matchesMemberCount = club.memberCount >= memberCountFilter[0] && club.memberCount <= memberCountFilter[1];
    return matchesSearch && matchesCategory && matchesMemberCount;
  });

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <div className="relative flex-1 flex">
        {/* Main Content */}
        <main className={`flex-1 py-8 px-4 md:px-4 transition-all duration-300 ${collapsed ? '' : ''} mr-80`} >
          <ClubsBreadcrumb />
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative w-full max-w-xs">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                  placeholder="Search clubs by name or description..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  className="rounded-lg border border-gray-200 py-2 px-4 text-base bg-white flex items-center gap-2"
                  onClick={() => setShowCategoryDropdown((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={showCategoryDropdown}
                  type="button"
                >
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                  {categoryFilter === 'All' ? 'All Categories' : categoryFilter}
                </button>
                {showCategoryDropdown && (
                  <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    {clubCategories.map(category => (
                      <div
                        key={category}
                        onClick={() => {
                          setCategoryFilter(category);
                          setShowCategoryDropdown(false);
                        }}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 ${categoryFilter === category ? 'bg-purple-50 font-semibold text-purple-700' : ''}`}
                        role="option"
                        aria-selected={categoryFilter === category}
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setCategoryFilter(category);
                            setShowCategoryDropdown(false);
                          }
                        }}
                      >
                        {category === 'All' ? 'All Categories' : category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="inline-flex bg-gray-100 border border-gray-200 rounded-md p-1 ml-2">
              <button
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow border border-gray-200' : 'bg-gray-100'}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow border border-gray-200' : 'bg-gray-100'}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mb-4 text-gray-700 text-sm font-medium">Showing {filteredClubs.length} clubs that you can join</div>
          {/* Clubs Grid */}
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
            {filteredClubs.map(club => (
              <JoinClubCard key={club.id} club={club} direction={viewMode === 'grid' ? 'col' : 'row'} />
            ))}
          </div>
        </main>
        {/* Sidebar: fixed at right-0, outside main content */}
        <aside className="hidden lg:block fixed top-0 pt-1 p-4 right-0 w-[320px] h-screen bg-white shadow-lg border-l border-gray-200 z-30 overflow-y-scroll scrollbar-none overscroll-none">
          <div className="sticky top-8">
            {/* Featured Clubs */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Clubs</h2>
            <div className="space-y-4 mb-2">
              {featuredClubs.map(club => (
                <div key={club.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                    <img src={club.logo} alt={club.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{club.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-gray-100 text-gray-700 text-xs rounded px-2 py-0.5 font-semibold">{club.category}</span>
                      <span className="text-xs text-gray-500">{club.memberCount} members</span>
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-2 text-sm">Join</button>
                </div>
              ))}
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Filter by Member Count */}
            <h3 className="text-md font-semibold text-gray-900 mb-3">Filter by Member Count</h3>
            <input
              type="range"
              min={0}
              max={100}
              value={memberCountFilter[1]}
              onChange={e => setMemberCountFilter([0, Number(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2 mb-2">
              <span>{memberCountFilter[0]} members</span>
              <span>{memberCountFilter[1]} members</span>
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Popular Categories */}
            <h3 className="text-md font-semibold text-gray-900 mb-3">Popular Categories</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {clubCategories.filter(cat => cat !== 'All').map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryFilter === category ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  onClick={() => setCategoryFilter(categoryFilter === category ? 'All' : category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Quick Actions */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2 mb-2">
              <button className="w-full justify-start bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100">
                <PlusIcon className="w-5 h-5" /> Create New Club
              </button>
              <button className="w-full justify-start bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100">
                <CalendarDaysIcon className="w-5 h-5" /> View Club Events
              </button>
              <button className="w-full justify-start bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100">
                <StarIcon className="w-5 h-5" /> Saved Clubs
              </button>
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Join Statistics */}
            <h3 className="text-md font-semibold text-purple-900 mb-2">Join Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New clubs this month</span>
                <span className="text-sm font-medium text-purple-700">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most popular category</span>
                <span className="text-sm font-medium text-purple-700">Technology</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average members</span>
                <span className="text-sm font-medium text-purple-700">32</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {/* Footer */}
      <footer className="ml-4 w-[56rem] mt-10 py-6 text-center text-xs text-gray-400 border-t">
        <div className="flex justify-center gap-6 mb-2">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-transform transform hover:-translate-y-1" aria-label="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-transform transform hover:-translate-y-1" aria-label="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-700 transition-transform transform hover:-translate-y-1" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500 transition-transform transform hover:-translate-y-1" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 500 500"><path className="cls-1" d="M250,193.27A56.73,56.73,0,1,0,306.73,250,56.8,56.8,0,0,0,250,193.27Z" /><path className="cls-1" d="M316.74,105.49H183.26a77.86,77.86,0,0,0-77.77,77.77V316.74a77.86,77.86,0,0,0,77.77,77.77H316.74a77.86,77.86,0,0,0,77.77-77.77V183.26A77.86,77.86,0,0,0,316.74,105.49ZM250,336.7A86.7,86.7,0,1,1,336.7,250,86.8,86.8,0,0,1,250,336.7Zm95.27-160.26A21.41,21.41,0,1,1,366.68,155,21.41,21.41,0,0,1,345.27,176.45Z" /><path className="cls-1" d="M484.85,124.74a144.17,144.17,0,0,0-2.32-25.29c-1.94-10.19-4.67-20.12-9.55-29.33A101.84,101.84,0,0,0,453.39,44a97.14,97.14,0,0,0-42.76-24.4c-14.83-4-30-4.84-45.21-4.82a.46.46,0,0,1-.09-.23H134.59c0,.08,0,.16,0,.23-8.65.16-17.32.09-25.92,1.16A123.46,123.46,0,0,0,81,22.14,97.48,97.48,0,0,0,44.25,46.26,97.15,97.15,0,0,0,19.68,89.17c-3.94,14.72-4.8,29.73-4.82,44.85L14.7,365.69v0c.28,10.45.37,21,2.13,31.36,1.87,11,4.54,21.71,9.64,31.69A101.36,101.36,0,0,0,54.77,463a91.91,91.91,0,0,0,28.31,15.35c15.12,4.88,30.72,6.75,46.55,6.84,9.88.06,19.74.31,29.62.27,71.74-.3,143.49.52,215.23-.44a169.32,169.32,0,0,0,28.23-3A95.61,95.61,0,0,0,450,459c15.78-14.08,26.43-31.3,31.24-52.09,3.15-13.59,3.93-27.38,4.07-41.21v-2.76C485.3,361.86,484.89,127.84,484.85,124.74Zm-60.38,192A107.87,107.87,0,0,1,316.74,424.48H183.26A107.87,107.87,0,0,1,75.52,316.74V183.26A107.87,107.87,0,0,1,183.26,75.52H316.74A107.87,107.87,0,0,1,424.48,183.26Z" /></svg>
          </a>
        </div>
        <div className="text-gray-400">
          © 2025 CampusConnect. All rights reserved.<br />
          <span className="block mt-1">
            <a href="#" className="hover:underline">Privacy Policy</a> · <a href="#" className="hover:underline">Terms of Service</a> · <a href="#" className="hover:underline">Contact Us</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

// --- ClubEventsPage implementation for /clubs/events ---
function ClubEventsPage() {
  // Dummy data
  const eventCategories = [
    'All Categories', 'Workshop', 'Competition', 'Seminar', 'Performance', 'Social', 'Conference', 'Fundraiser'
  ];
  const clubsList = [
    'All Clubs', 'Robotics Club', 'Literature Society', 'Jazz Ensemble', 'Volleyball Club', 'Mental Health', 'Finance Club', 'Film Society', 'Entrepreneurship Hub'
  ];
  const eventsData = [
    {
      id: 1,
      name: 'Robot Design Workshop',
      club: 'Robotics Club',
      clubLogo: 'https://placehold.co/40x40?text=RC',
      category: 'Workshop',
      date: 'June 30, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'Engineering Building, Room 305',
      description: 'Learn how to design and build your own robot with guidance from experienced members. This hands-on workshop will cover mechanical design, electronics, and basic programming concepts.',
      image: 'https://placehold.co/600x350?text=Event+Image',
      attendees: 28,
      maxCapacity: 40,
      featured: true
    },
    {
      id: 2,
      name: 'Poetry Reading Night',
      club: 'Literature Society',
      clubLogo: 'https://placehold.co/40x40?text=LS',
      category: 'Performance',
      date: 'July 2, 2025',
      time: '6:00 PM - 8:00 PM',
      location: 'Library, Discussion Room 2',
      description: 'Join us for an evening of poetry reading and literary appreciation. Share your original poems or read from your favorite poets. Open to all students regardless of experience level.',
      image: 'https://placehold.co/600x350?text=Event+Image',
      attendees: 15,
      maxCapacity: 30,
      featured: false
    },
    {
      id: 3,
      name: 'Campus Jazz Night',
      club: 'Jazz Ensemble',
      clubLogo: 'https://placehold.co/40x40?text=JE',
      category: 'Performance',
      date: 'July 7, 2025',
      time: '7:00 PM - 9:00 PM',
      location: 'Student Center Auditorium',
      description: 'Experience an evening of live jazz music performed by our talented Jazz Ensemble. The repertoire will include classic jazz standards and contemporary pieces arranged by our members.',
      image: 'https://placehold.co/600x350?text=Event+Image',
      attendees: 75,
      maxCapacity: 150,
      featured: true
    }
  ];
  const { collapsed } = useContext(SidebarContext);
  const featuredEvents = eventsData.filter(e => e.featured);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [club, setClub] = useState('All Clubs');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shareTooltip, setShareTooltip] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleShare = async () => {
    if (selectedEvent) {
      const shareData = {
        title: selectedEvent.name,
        text: selectedEvent.description,
        url: window.location.origin + '/clubs/events',
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch {
          // User cancelled or error
        }
      } else if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(shareData.url);
          setShareTooltip('Link copied!');
          setTimeout(() => setShareTooltip(''), 1500);
        } catch {
          setShareTooltip('Failed to copy');
          setTimeout(() => setShareTooltip(''), 1500);
        }
      } else {
        alert('Share not supported');
      }
    }
  };

  // Filtering logic
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.club.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All Categories' || event.category === category;
    const matchesClub = club === 'All Clubs' || event.club === club;
    const matchesDate = !date || (event.date && new Date(event.date).toDateString() === new Date(date).toDateString());
    return matchesSearch && matchesCategory && matchesClub && matchesDate;
  });

  return (
    <div className="relative flex flex-col min-h-screen font-sans">
      {/* Main Content with blur when modal is open */}
      <div className={`relative flex-1 flex transition-all duration-300 ${isDialogOpen || isRegisterOpen ? 'filter blur-sm' : ''}`}>
        {/* Main Content */}
        <div className={`flex-1 py-8 px-4 md:px-4 transition-all w-[60%] duration-300 ${collapsed ? '' : ''} mr-80`}>
          <ClubsBreadcrumb />
          {/* Main Content Top Section: Filter/Search Bar */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center gap-y-2 gap-x-3 p-0">
            {/* Search Input with Icon */}
            <div className="relative w-full md:w-[320px]">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by name, description or club..."
                className="w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 text-base focus:ring-2 focus:ring-purple-200 min-h-[44px]"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* All Categories Dropdown with Icon */}
            <div className="relative w-full md:w-auto">
              <TagIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                className="rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-base bg-white w-full md:w-auto min-h-[44px] appearance-none"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {eventCategories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>
            {/* All Clubs Dropdown with Icon */}
            <div className="relative w-full md:w-auto">
              <UsersIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                className="rounded-lg border border-gray-200 pl-10 pr-4 py-2 text-base bg-white w-full md:w-auto min-h-[44px] appearance-none"
                value={club}
                onChange={e => setClub(e.target.value)}
              >
                {clubsList.map(clubName => <option key={clubName}>{clubName}</option>)}
              </select>
            </div>
            {/* Select Date Button with Popover */}
            <div className="relative w-full md:w-auto">
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-4 py-2 text-base bg-white flex items-center gap-2 w-full md:w-auto min-h-[44px] whitespace-nowrap"
                onClick={() => setShowDatePicker(v => !v)}
              >
                <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                {date ? new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Select Date'}
                {date && (
                  <XMarkIcon
                    className="w-4 h-4 text-gray-400 hover:text-red-500 ml-1"
                    onClick={e => { e.stopPropagation(); setDate(''); }}
                  />
                )}
              </button>
              {showDatePicker && (
                <div className="absolute z-30 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 left-0">
                  <CalendarComponent
                    mode="single"
                    selected={date ? new Date(date + 'T00:00:00') : undefined}
                    onSelect={d => {
                      if (d) {
                        // Format as YYYY-MM-DD
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const day = String(d.getDate()).padStart(2, '0');
                        setDate(`${year}-${month}-${day}`);
                      } else {
                        setDate('');
                      }
                    }}
                    className="w-full max-w-xs rounded-lg border border-gray-200 shadow-sm"
                  />
                  <span className="text-xs text-gray-500 mt-2">Pick a date to filter events</span>
                </div>
              )}
            </div>
            {/* Grid/List Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 ml-0 md:ml-2 min-h-[44px] items-center">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="whitespace-nowrap cursor-pointer px-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <Squares2X2Icon className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="whitespace-nowrap cursor-pointer px-2 min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <Bars3Icon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          {/* Event Count */}
          <div className="pb-2 text-gray-700 text-sm font-medium">Showing {filteredEvents.length} events</div>
          {/* Event Cards Grid/List */}
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
            {filteredEvents.map(event => (
              <div key={event.id} className={`bg-white rounded-2xl shadow flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row'} overflow-hidden border border-gray-100 group transition-all duration-200`}>
                <div className={viewMode === 'grid' ? 'h-[220px] w-full overflow-hidden relative' : 'w-1/3 h-auto min-h-[180px] overflow-hidden flex-shrink-0 relative'}>
                  <img
                    src={event.image}
                    alt={event.name}
                    className={viewMode === 'grid' ? 'w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300' : 'w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300'}
                  />
                  <span className="absolute top-4 right-4">
                    <Badge className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">{event.category}</Badge>
                  </span>
                </div>
                <div className={`p-6 flex-1 flex flex-col${viewMode === 'row' ? ' justify-between' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={event.clubLogo} alt={event.club} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {event.club.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">{event.club}</div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">{event.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{event.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4 text-gray-400" />
                      <span>{event.attendees}/{event.maxCapacity} attendees</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button
                      variant="outline"
                      className="flex-1 whitespace-nowrap cursor-pointer font-semibold text-base px-4 py-2 rounded-md border border-gray-300 flex items-center justify-center gap-2"
                      onClick={() => { setSelectedEvent(event); setIsDialogOpen(true); setIsRegisterOpen(false); }}
                    >
                      <EyeIcon className="w-5 h-5" /> View Details
                    </Button>
                    <Button
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap cursor-pointer font-semibold text-base px-4 py-2 rounded-md flex items-center justify-center gap-2"
                      onClick={() => { setSelectedEvent(event); setIsDialogOpen(true); setIsRegisterOpen(true); }}
                    >
                      <UsersIcon className="w-5 h-5" /> Register
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Sidebar: fixed at right-0, outside main content */}
        <aside className="hidden lg:block fixed top-0 pt-1 p-4 right-0 w-[320px] h-screen bg-white shadow-lg border-l border-gray-200 z-30 overflow-y-scroll scrollbar-none overscroll-none">
          <div className="sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Events</h2>
            <div className="space-y-4 mb-6">
              {featuredEvents.map(event => (
                <div key={event.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={event.clubLogo} alt={event.club} />
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {event.club.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{event.name}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-semibold shadow-sm">{event.category}</Badge>
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap cursor-pointer px-4 py-2 rounded-md text-xs font-semibold mt-1"
                        onClick={() => { setSelectedEvent(event); setIsDialogOpen(true); setIsRegisterOpen(true); }}
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Popular Categories */}
            <h3 className="text-md font-semibold text-gray-900 mb-3">Popular Categories</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {eventCategories.filter(cat => cat !== 'All Categories').map(categoryOption => (
                <button
                  key={categoryOption}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${category === categoryOption ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  onClick={() => setCategory(categoryOption)}
                >
                  {categoryOption}
                </button>
              ))}
              {category !== 'All Categories' && (
                <button
                  className="ml-2 px-2 py-1 rounded-full text-xs font-semibold border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center gap-1"
                  onClick={() => setCategory('All Categories')}
                >
                  <XMarkIcon className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Filter by Date - Calendar Widget */}
            <h3 className="text-md font-semibold text-gray-900 mb-3">Filter by Date</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col items-center">
              <CalendarComponent
                mode="single"
                selected={date ? new Date(date + 'T00:00:00') : undefined}
                onSelect={d => {
                  if (d) {
                    // Format as YYYY-MM-DD
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    setDate(`${year}-${month}-${day}`);
                  } else {
                    setDate('');
                  }
                }}
                className="w-full max-w-xs rounded-lg border border-gray-200 shadow-sm"
              />
              <span className="text-xs text-gray-500 mt-2">Pick a date to filter events</span>
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Event Statistics Section */}
            <h3 className="text-md font-semibold text-gray-900 mb-3">Event Statistics</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-2 mb-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Events</span>
                <span className="text-sm font-medium text-purple-700">{filteredEvents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most Popular Category</span>
                <span className="text-sm font-medium text-purple-700">{eventCategories[1]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Attendees</span>
                <span className="text-sm font-medium text-purple-700">{
                  filteredEvents.length > 0 ?
                    Math.round(filteredEvents.reduce((sum, e) => sum + (e.attendees || 0), 0) / filteredEvents.length)
                    : 0
                }</span>
              </div>
            </div>
            <div className="my-6 border-t border-gray-200" />
            {/* Quick Actions */}
            <h3 className="text-md font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start whitespace-nowrap cursor-pointer px-4 py-2 rounded-md text-sm font-semibold">
                <PlusIcon className="w-5 h-5 mr-2" /> Create New Event
              </Button>
              <Button variant="outline" className="w-full justify-start whitespace-nowrap cursor-pointer px-4 py-2 rounded-md text-sm font-semibold">
                <StarIcon className="w-5 h-5 mr-2" /> Saved Events
              </Button>
              <Button variant="outline" className="w-full justify-start whitespace-nowrap cursor-pointer px-4 py-2 rounded-md text-sm font-semibold">
                <UsersIcon className="w-5 h-5 mr-2" /> Join a Club
              </Button>
            </div>
          </div>
        </aside>
      </div>
      <footer className="ml-4 w-[56rem] mt-10 py-6 text-center text-xs text-gray-400 border-t">
        <div className="flex justify-center gap-6 mb-2">
          <a href="#" className="text-gray-400 hover:text-blue-600 transition-transform transform hover:-translate-y-1" aria-label="Facebook">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-transform transform hover:-translate-y-1" aria-label="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-700 transition-transform transform hover:-translate-y-1" aria-label="LinkedIn">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z" /></svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500 transition-transform transform hover:-translate-y-1" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 500 500"><path className="cls-1" d="M250,193.27A56.73,56.73,0,1,0,306.73,250,56.8,56.8,0,0,0,250,193.27Z" /><path className="cls-1" d="M316.74,105.49H183.26a77.86,77.86,0,0,0-77.77,77.77V316.74a77.86,77.86,0,0,0,77.77,77.77H316.74a77.86,77.86,0,0,0,77.77-77.77V183.26A77.86,77.86,0,0,0,316.74,105.49ZM250,336.7A86.7,86.7,0,1,1,336.7,250,86.8,86.8,0,0,1,250,336.7Zm95.27-160.26A21.41,21.41,0,1,1,366.68,155,21.41,21.41,0,0,1,345.27,176.45Z" /><path className="cls-1" d="M484.85,124.74a144.17,144.17,0,0,0-2.32-25.29c-1.94-10.19-4.67-20.12-9.55-29.33A101.84,101.84,0,0,0,453.39,44a97.14,97.14,0,0,0-42.76-24.4c-14.83-4-30-4.84-45.21-4.82a.46.46,0,0,1-.09-.23H134.59c0,.08,0,.16,0,.23-8.65.16-17.32.09-25.92,1.16A123.46,123.46,0,0,0,81,22.14,97.48,97.48,0,0,0,44.25,46.26,97.15,97.15,0,0,0,19.68,89.17c-3.94,14.72-4.8,29.73-4.82,44.85L14.7,365.69v0c.28,10.45.37,21,2.13,31.36,1.87,11,4.54,21.71,9.64,31.69A101.36,101.36,0,0,0,54.77,463a91.91,91.91,0,0,0,28.31,15.35c15.12,4.88,30.72,6.75,46.55,6.84,9.88.06,19.74.31,29.62.27,71.74-.3,143.49.52,215.23-.44a169.32,169.32,0,0,0,28.23-3A95.61,95.61,0,0,0,450,459c15.78-14.08,26.43-31.3,31.24-52.09,3.15-13.59,3.93-27.38,4.07-41.21v-2.76C485.3,361.86,484.89,127.84,484.85,124.74Zm-60.38,192A107.87,107.87,0,0,1,316.74,424.48H183.26A107.87,107.87,0,0,1,75.52,316.74V183.26A107.87,107.87,0,0,1,183.26,75.52H316.74A107.87,107.87,0,0,1,424.48,183.26Z" /></svg>
          </a>
        </div>
        <div className="text-gray-400">
          © 2025 CampusConnect. All rights reserved.<br />
          <span className="block mt-1">
            <a href="#" className="hover:underline">Privacy Policy</a> · <a href="#" className="hover:underline">Terms of Service</a> · <a href="#" className="hover:underline">Contact Us</a>
          </span>
        </div>
      </footer>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selectedEvent && (
            <div className="bg-white h-[93vh] rounded-lg overflow-hidden relative">
              {!isRegisterOpen ? (
                <>
                  <DialogHeader className="p-6 pb-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">{selectedEvent.category}</Badge>
                      <span className="text-xs text-gray-500">Organized by {selectedEvent.club}</span>
                    </div>
                    <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.name}</DialogTitle>
                  </DialogHeader>
                  <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-56 object-cover object-center" />
                  <div className="p-6 pt-2 pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={selectedEvent.clubLogo} alt={selectedEvent.club} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {selectedEvent.club.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">About this event</div>
                        <DialogDescription className="text-gray-700 text-base mt-1">{selectedEvent.description}</DialogDescription>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                      <div>
                        <div className="mb-2 font-semibold text-gray-900">Event Details</div>
                        <div className="flex items-center gap-2 text-sm mb-1"><CalendarDaysIcon className="w-4 h-4 text-gray-400" /> {selectedEvent.date}</div>
                        <div className="flex items-center gap-2 text-sm mb-1"><ClockIcon className="w-4 h-4 text-gray-400" /> {selectedEvent.time}</div>
                        <div className="flex items-center gap-2 text-sm"><MapPinIcon className="w-4 h-4 text-gray-400" /> {selectedEvent.location}</div>
                      </div>
                      <div>
                        <div className="mb-2 font-semibold text-gray-900">Attendance</div>
                        <div className="mb-1 text-sm text-gray-700">Capacity</div>
                        <Progress value={Math.round((selectedEvent.attendees / selectedEvent.maxCapacity) * 100)} className="h-2 bg-gray-200" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{selectedEvent.attendees}/{selectedEvent.maxCapacity}</span>
                          <span>{selectedEvent.maxCapacity - selectedEvent.attendees} spots remaining</span>
                        </div>
                        <div className="mt-4 text-sm text-gray-700">Organized by</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                            <AvatarImage src={selectedEvent.clubLogo} alt={selectedEvent.club} />
                            <AvatarFallback className="bg-purple-100 text-purple-600">{selectedEvent.club.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-gray-900">{selectedEvent.club}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="flex justify-between items-center p-6 pt-1.5 pb-1.5 border-t">
                    <div className="relative">
                      <Button variant="outline" className="flex items-center gap-2" onClick={handleShare}>
                        <ShareIcon className="w-5 h-5" /> Share
                      </Button>
                      {shareTooltip && (
                        <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded shadow z-10 whitespace-nowrap">{shareTooltip}</span>
                      )}
                    </div>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold flex items-center gap-2"
                      onClick={() => setIsRegisterOpen(true)}
                    >
                      <UsersIcon className="w-5 h-5" /> Register
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-95">
                  <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                    {/* Close button */}
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                      onClick={() => setIsRegisterOpen(false)}
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                    {/* Registration Form */}
                    <h2 className="text-2xl font-bold mb-2 text-center">Register for Event</h2>
                    <p className="text-gray-600 text-center mb-4">Complete the form below to register for this event.</p>
                    <div className="bg-purple-50 rounded-lg p-3 mb-4 flex items-center gap-3">
                      <img src={selectedEvent?.clubLogo} alt="" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-semibold">{selectedEvent?.name}</div>
                        <div className="text-xs text-gray-500">{selectedEvent?.date} • {selectedEvent?.time}</div>
                      </div>
                    </div>
                    <form>
                      <label className="block mb-2 font-medium">Full Name</label>
                      <input className="w-full mb-3 px-3 py-2 border rounded" placeholder="John Smith" />
                      <label className="block mb-2 font-medium">Email Address</label>
                      <input className="w-full mb-3 px-3 py-2 border rounded" placeholder="john.smith@example.com" />
                      <label className="block mb-2 font-medium">Phone Number (optional)</label>
                      <input className="w-full mb-3 px-3 py-2 border rounded" placeholder="(123) 456-7890" />
                      <div className="flex items-center mb-4">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-xs text-gray-600">I agree to receive communications about this event and understand the attendance policy.</span>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={() => setIsRegisterOpen(false)}>Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded bg-purple-600 text-white font-semibold">Complete Registration</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// --- Main export: route switcher ---
function ClubsRouteSwitcher() {
  const location = useLocation();
  if (location.pathname === '/clubs/join') {
    return <JoinClubPage />;
  }
  if (location.pathname === '/clubs/events') {
    return <ClubEventsPage />;
  }
  return <Clubs />;
}

export default ClubsRouteSwitcher;