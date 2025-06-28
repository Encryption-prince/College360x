import React, { useState } from 'react';
import { CalendarDaysIcon, MapPinIcon, ClockIcon, MagnifyingGlassIcon, Squares2X2Icon, CalendarIcon, SparklesIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon as HeartOutlineIcon, ShareIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const eventImages = [
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
];

const locations = ['All Locations', 'Innovation Center', 'Main Auditorium', 'Campus Green', 'Business School Atrium', 'Recreation Center', 'Global Center', 'Science Complex', 'Student Union'];
const sortOptions = ['Date (Newest)', 'Date (Oldest)', 'Most Popular', 'A-Z', 'Z-A'];
const quickFilters = ['Today', 'This Week', 'This Month', 'Academic', 'Social', 'Sports', 'Cultural'];

const mockEvents = [
  {
    id: 1,
    club: 'Tech Society',
    clubShort: 'TS',
    title: 'Tech Talk: AI Revolution',
    description: 'A deep dive into the future of AI and its impact on society.',
    date: '2025-06-25',
    time: '3:00 PM - 5:00 PM',
    location: 'Engineering Building, Room 305',
    category: 'Technology',
    icon: <SparklesIcon className="w-8 h-8 text-green-500" />, // Example icon
  },
  {
    id: 2,
    club: 'Debate Club',
    clubShort: 'DC',
    title: 'Annual Debate Competition',
    description: 'Compete with the best debaters on campus.',
    date: '2025-06-28',
    time: '1:00 PM - 4:00 PM',
    location: 'Arts Center Auditorium',
    category: 'Academic',
    icon: <SparklesIcon className="w-8 h-8 text-blue-500" />, // Example icon
  },
  {
    id: 3,
    club: 'Music Society',
    clubShort: 'MS',
    title: 'Summer Music Festival',
    description: 'Enjoy performances by student bands and artists.',
    date: '2025-07-05',
    time: '5:00 PM - 10:00 PM',
    location: 'Campus Green',
    category: 'Entertainment',
    icon: <SparklesIcon className="w-8 h-8 text-yellow-500" />, // Example icon
  },
  {
    id: 4,
    club: 'Business Club',
    clubShort: 'BC',
    title: 'Entrepreneurship Workshop',
    description: 'Learn how to launch your own startup.',
    date: '2025-07-10',
    time: '2:00 PM - 5:00 PM',
    location: 'Business School, Room 120',
    category: 'Career',
    icon: <SparklesIcon className="w-8 h-8 text-violet-500" />, // Example icon
  },
  {
    id: 5,
    club: 'Photography Club',
    clubShort: 'PC',
    title: 'Photography Exhibition',
    description: 'Showcase your best campus moments.',
    date: '2025-07-15',
    time: '11:00 AM - 6:00 PM',
    location: 'Student Center Gallery',
    category: 'Arts',
    icon: <SparklesIcon className="w-8 h-8 text-blue-400" />, // Example icon
  },
  {
    id: 6,
    club: 'Community Service Club',
    clubShort: 'CSC',
    title: 'Charity Run',
    description: 'Join the run for a good cause!',
    date: '2025-07-20',
    time: '8:00 AM - 11:00 AM',
    location: 'Campus Track',
    category: 'Sports',
    icon: <SparklesIcon className="w-8 h-8 text-green-400" />, // Example icon
  },
].map((event, idx) => ({
  ...event,
  image: eventImages[idx % eventImages.length],
  registration: {
    current: 100 + idx * 50,
    max: 200 + idx * 100,
  },
}));

const categories = ['All Categories', 'Technology', 'Academic', 'Entertainment', 'Career', 'Arts', 'Sports'];

function getMonthMatrix(year, month) {
  // month: 0-indexed
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix = [];
  let week = [];
  let dayOfWeek = firstDay.getDay();
  // Fill initial empty days
  for (let i = 0; i < dayOfWeek; i++) week.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    week.push(d);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  // Fill trailing empty days
  if (week.length) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Breadcrumb component
function EventsBreadcrumb() {
  const location = useLocation();
  const path = location.pathname;
  let crumbs = [
    { name: 'Home', to: '/' },
    { name: 'Events', to: '/events' },
  ];
  if (path === '/events/registrations') {
    crumbs.push({ name: 'My Registrations', to: '/events/registrations' });
  }
  return (
    <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex gap-1">
        {crumbs.map((crumb, idx) => (
          <li key={crumb.to} className="inline-flex items-center">
            {idx > 0 && <span className="mx-1">/</span>}
            {idx < crumbs.length - 1 ? (
              <Link to={crumb.to} className="hover:underline text-purple-600">{crumb.name}</Link>
            ) : (
              <span className="text-gray-700 font-medium">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSort, setSelectedSort] = useState('Date (Newest)');
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [view, setView] = useState('grid');
  const [calendarMonth, setCalendarMonth] = useState(6); // July (0-indexed)
  const [calendarYear, setCalendarYear] = useState(2025);
  const [activeQuick, setActiveQuick] = useState('');
  const [favoritedEvents, setFavoritedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Helper for week filter
  function isThisWeek(dateStr) {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay()); // Sunday
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Saturday
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    return d >= start && d <= end;
  }
  function isThisMonth(dateStr) {
    const now = new Date();
    const d = new Date(dateStr);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  // Filter logic (add location and quick filter logic)
  let filteredEvents = mockEvents.filter(event => {
    const categoryMatch = selectedCategory === 'All Categories' || event.category === selectedCategory;
    const locationMatch = selectedLocation === 'All Locations' || event.location === selectedLocation;
    const searchMatch = event.title.toLowerCase().includes(search.toLowerCase()) || event.description.toLowerCase().includes(search.toLowerCase()) || event.location.toLowerCase().includes(search.toLowerCase());
    const dateMatch = !date || event.date === date;
    let quickMatch = true;
    if (activeQuick === 'Today') quickMatch = event.date === new Date().toISOString().slice(0, 10);
    else if (activeQuick === 'This Week') quickMatch = isThisWeek(event.date);
    else if (activeQuick === 'This Month') quickMatch = isThisMonth(event.date);
    else if (["Academic", "Social", "Sports", "Cultural"].includes(activeQuick)) quickMatch = event.category === activeQuick;
    return categoryMatch && locationMatch && searchMatch && dateMatch && quickMatch;
  });
  // Sort logic
  if (selectedSort === 'Date (Newest)') {
    filteredEvents = filteredEvents.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (selectedSort === 'Date (Oldest)') {
    filteredEvents = filteredEvents.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Calendar event mapping
  const eventsByDate = {};
  mockEvents.forEach(event => {
    const [y, m, d] = event.date.split('-').map(Number);
    if (y === calendarYear && m === calendarMonth + 1) {
      if (!eventsByDate[d]) eventsByDate[d] = [];
      eventsByDate[d].push(event);
    }
  });

  const monthMatrix = getMonthMatrix(calendarYear, calendarMonth);

  // Add to Calendar handler
  // function handleAddToCalendar(event) {
  //   const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nDTSTART:${event.date.replace(/-/g, '')}T${event.time.split(' - ')[0].replace(/:/g, '')}00\nDTEND:${event.date.replace(/-/g, '')}T${event.time.split(' - ')[1]?.replace(/:/g, '') || ''}00\nEND:VEVENT\nEND:VCALENDAR`;
  //   const blob = new Blob([icsContent], { type: 'text/calendar' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `${event.title.replace(/\s+/g, '_')}.ics`;
  //   document.body.appendChild(a);
  //   a.click();
  //   setTimeout(() => {
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //   }, 100);
  // }

  function EventRegisterModal({ event, open, onClose, onSuccess }) {
    const [reminder, setReminder] = useState([]);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    if (!event || !open) return null;
    const percent = Math.round((event.registration.current / event.registration.max) * 100);
    const deadline = event.deadline || 'June 25, 2025'; // mock
    const organizer = event.organizer || 'Student Affairs Office'; // mock
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 pb-0.5 relative animate-fade-in">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={onClose} aria-label="Close"><span className="text-2xl">×</span></button>
          <h2 className="text-2xl font-bold mb-2">Register for Event</h2>
          <div className="flex items-center gap-4 mb-4">
            <img src={event.image} alt={event.title} className="w-20 h-20 rounded-lg object-cover" />
            <div>
              <div className="font-semibold text-lg">{event.title}</div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <CalendarDaysIcon className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <ClockIcon className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPinIcon className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="font-semibold mb-1">Event Details</div>
            <div className="text-gray-700 text-sm mb-2">{event.description}</div>
            <div className="font-semibold mb-1">Organizer</div>
            <div className="text-gray-700 text-sm mb-2">{organizer}</div>
            <div className="font-semibold mb-1">Registration Capacity</div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Registered: {event.registration.current}/{event.registration.max}</span>
              <span>{percent}% Full</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="font-semibold mb-1">Registration Deadline</div>
            <div className="text-gray-700 text-sm mb-2">{deadline}</div>
            <div className="font-semibold mb-1">Set Reminder</div>
            <div className="flex gap-2 mb-2">
              <button type="button" className={`flex items-center gap-1 px-3 py-1.5 rounded border text-sm ${reminder.includes('1d') ? 'bg-purple-100 border-purple-400 text-purple-700' : 'bg-white border-gray-300 text-gray-700'}`} onClick={() => setReminder(reminder.includes('1d') ? reminder.filter(r => r !== '1d') : [...reminder, '1d'])}><span role="img" aria-label="bell">🔔</span> 1 day before</button>
              <button type="button" className={`flex items-center gap-1 px-3 py-1.5 rounded border text-sm ${reminder.includes('1h') ? 'bg-purple-100 border-purple-400 text-purple-700' : 'bg-white border-gray-300 text-gray-700'}`} onClick={() => setReminder(reminder.includes('1h') ? reminder.filter(r => r !== '1h') : [...reminder, '1h'])}><span role="img" aria-label="bell">🔔</span> 1 hour before</button>
            </div>
            <div className="flex items-center gap-2 mb-4 mt-2">
              <input id="terms" type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="accent-purple-600" />
              <label htmlFor="terms" className="text-xs text-gray-600">I agree to the event terms and conditions, and understand the registration policy.</label>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose} disabled={loading}>Cancel</button>
              <button className="px-4 py-2 rounded bg-purple-600 text-white font-semibold disabled:opacity-50 flex items-center justify-center min-w-[120px]" disabled={!agreed || loading} onClick={async () => { if (agreed && !loading) { setLoading(true); setTimeout(() => { setLoading(false); onSuccess(); }, 1500); } }}>
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    {/* <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> */}
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0v-4a8 8 0 00-16 0v4z"></path>
                  </svg>
                ) : null}
                {loading ? 'Registering...' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function SuccessModal({ event, open, onClose }) {
    if (!event || !open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6 relative animate-fade-in text-center">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={onClose} aria-label="Close"><span className="text-2xl">×</span></button>
          <div className="text-green-500 text-4xl mb-2">✔</div>
          <h2 className="text-xl font-bold mb-1">Registration Successful</h2>
          <div className="text-gray-700 mb-2">Successfully registered for <span className="font-semibold">{event.title}</span></div>
          <div className="text-gray-500 text-sm mb-4">Confirmation email sent!</div>
        </div>
      </div>
    );
  }

  const location = useLocation();
  if (location.pathname === '/events/registrations') {
    return <MyRegistrationsPage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 pt-8">
        <EventsBreadcrumb />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Browse Events</h1>
            <p className="text-gray-500 mb-0">Discover and register for upcoming campus events</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 border ${view === 'grid' ? 'bg-purple-50 border-purple-600 text-purple-700' : 'bg-white border-gray-200 text-gray-500'}`}
              onClick={() => setView('grid')}
            >
              <Squares2X2Icon className="w-5 h-5" /> List
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 border ${view === 'calendar' ? 'bg-purple-50 border-purple-600 text-purple-700' : 'bg-white border-gray-200 text-gray-500'}`}
              onClick={() => setView('calendar')}
            >
              <CalendarIcon className="w-5 h-5" /> Calendar
            </button>
          </div>
        </div>
      </div>
      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full max-w-lg">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, description, or location"
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-2 focus:ring-purple-200"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
              {locations.map(loc => <option key={loc}>{loc}</option>)}
            </select>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white"
            />
            <select value={selectedSort} onChange={e => setSelectedSort(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
              {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickFilters.map(qf => (
            <button
              key={qf}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${activeQuick === qf ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}
              onClick={() => setActiveQuick(activeQuick === qf ? '' : qf)}
            >
              {qf}
            </button>
          ))}
        </div>
        <div className="mb-2 text-gray-700 text-sm font-medium">Showing {filteredEvents.length} events</div>
      </div>
      {/* Event Cards/List View */}
      <div className="max-w-7xl mx-auto w-full px-4 flex-1">
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map(event => (
                <div key={event.id} className="bg-white rounded-2xl shadow border border-gray-100 flex flex-col overflow-hidden group transition-all">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 shadow">{event.category}</span>
                    <button
                      className={`absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white shadow transition ${favoritedEvents.includes(event.id) ? 'text-red-500' : ''}`}
                      onClick={() => setFavoritedEvents(favoritedEvents.includes(event.id) ? favoritedEvents.filter(id => id !== event.id) : [...favoritedEvents, event.id])}
                      aria-label={favoritedEvents.includes(event.id) ? 'Unfavorite' : 'Favorite'}
                    >
                      {favoritedEvents.includes(event.id) ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartOutlineIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{event.date.replace(/-/g, '/')}</span>
                      <ClockIcon className="w-4 h-4 ml-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <h2 className="font-bold text-lg text-gray-900 mb-1">{event.title}</h2>
                    <p className="text-gray-600 text-sm mb-3 min-h-[48px] line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="text-purple-700 font-semibold">Registration: {event.registration.current}/{event.registration.max}</span>
                      <span className="text-gray-400">{Math.round((event.registration.current / event.registration.max) * 100)}% Full</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                      <div className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" style={{ width: `${Math.round((event.registration.current / event.registration.max) * 100)}%` }}></div>
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md text-base flex items-center justify-center gap-2 transition" onClick={() => { setSelectedEvent(event); setIsModalOpen(true); }}>Register</button>
                      <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md px-3 py-2 flex items-center justify-center transition" title="Add to Calendar"><CalendarIcon className="w-5 h-5" /></button>
                      <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-md px-3 py-2 flex items-center justify-center transition"><ShareIcon className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-12">No events found.</div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold font-poppins">Calendar View</span>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => {
                      if (calendarMonth === 0) {
                        setCalendarMonth(11);
                        setCalendarYear(calendarYear - 1);
                      } else {
                        setCalendarMonth(calendarMonth - 1);
                      }
                    }}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <span className="font-medium font-inter">{monthNames[calendarMonth]} {calendarYear}</span>
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => {
                      if (calendarMonth === 11) {
                        setCalendarMonth(0);
                        setCalendarYear(calendarYear + 1);
                      } else {
                        setCalendarMonth(calendarMonth + 1);
                      }
                    }}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl shadow-inner p-6 overflow-x-auto">
                <table className="w-full table-fixed text-center select-none border-separate border-spacing-0">
                  <thead>
                    <tr className="text-gray-400 text-sm">
                      <th className="py-3 font-poppins">Sun</th>
                      <th className="font-poppins">Mon</th>
                      <th className="font-poppins">Tue</th>
                      <th className="font-poppins">Wed</th>
                      <th className="font-poppins">Thu</th>
                      <th className="font-poppins">Fri</th>
                      <th className="font-poppins">Sat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthMatrix.map((week, i) => (
                      <tr key={i}>
                        {week.map((day, j) => (
                          <td key={j} className="h-24 align-top relative px-2 py-2">
                            {day && (
                              <div className="flex flex-col items-start gap-2">
                                <span className="text-gray-700 font-medium font-poppins mb-1 text-base">{day}</span>
                                <div className="flex flex-col gap-1 w-full">
                                  {eventsByDate[day] && eventsByDate[day].map((event) => (
                                    <button
                                      key={event.id}
                                      className="block text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-poppins hover:bg-blue-200 transition text-left w-fit max-w-full truncate"
                                      onClick={() => { setSelectedEvent(event); setIsModalOpen(true); }}
                                    >
                                      {event.title.length > 16 ? event.title.slice(0, 15) + '…' : event.title}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Footer */}
      <footer className="mt-10 py-6 text-center text-xs text-gray-400 border-t">
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
      {selectedEvent && (
        <EventRegisterModal event={selectedEvent} open={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); setShowSuccess(true); }} />
      )}
      {showSuccess && (
        <SuccessModal event={selectedEvent} open={showSuccess} onClose={() => { setShowSuccess(false); setSelectedEvent(null); }} />
      )}
    </div>
  );
};

function MyRegistrationsPage() {
  const [tab, setTab] = useState('upcoming');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Statuses');
  const [search, setSearch] = useState('');
  const [registrations] = useState([
    {
      id: 1,
      title: 'Freshman Orientation',
      category: 'Academic',
      date: '2025-06-28',
      time: '9:00 AM - 2:00 PM',
      location: 'Main Auditorium',
      description: 'Welcome event for all incoming freshmen. Learn about campus resources, meet faculty, and connect.',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      status: 'Confirmed',
      registered: 'June 10, 2025',
      reminder: '1 day before',
    },
    {
      id: 2,
      title: 'Summer Music Festival',
      category: 'Cultural',
      date: '2025-07-15',
      time: '4:00 PM - 11:00 PM',
      location: 'Campus Green',
      description: 'Annual music festival featuring student bands, local artists, and a special guest headliner. Food trucks and more.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      status: 'Waitlist',
      registered: 'June 20, 2025',
      reminder: null,
    },
    {
      id: 3,
      title: 'Career Fair: Business & Finance',
      category: 'Career',
      date: '2025-07-20',
      time: '10:00 AM - 4:00 PM',
      location: 'Business School Atrium',
      description: 'Connect with top employers in business, finance, and consulting. Bring your resume and dress professionally.',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
      status: 'Pending',
      registered: 'June 25, 2025',
      reminder: null,
    },
    {
      id: 4,
      title: 'Intramural Sports Kickoff',
      category: 'Sports',
      date: '2025-08-02',
      time: '1:00 PM - 5:00 PM',
      location: 'Recreation Center',
      description: 'Learn about all intramural sports offerings for the fall semester. Try out activities and sign up for teams.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
      status: 'Confirmed',
      registered: 'July 1, 2025',
      reminder: '1 day before',
    },
    {
      id: 5,
      title: 'International Student Welcome',
      category: 'Social',
      date: '2025-08-10',
      time: '2:00 PM - 6:00 PM',
      location: 'Global Center',
      description: 'Special welcome event for international students. Cultural exchange activities, campus resources, and more.',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      status: 'Cancelled',
      registered: 'July 5, 2025',
      reminder: null,
    },
  ]);

  // Filter logic for tabs
  const today = new Date();
  const filtered = registrations.filter(reg => {
    const eventDate = new Date(reg.date);
    if (tab === 'upcoming') return eventDate >= today;
    if (tab === 'past') return eventDate < today;
    return true;
  }).filter(reg => {
    if (category !== 'All Categories' && reg.category !== category) return false;
    if (status !== 'All Statuses' && reg.status !== status) return false;
    if (search && !(
      reg.title.toLowerCase().includes(search.toLowerCase()) ||
      reg.location.toLowerCase().includes(search.toLowerCase()) ||
      reg.description.toLowerCase().includes(search.toLowerCase())
    )) return false;
    return true;
  });

  // Registration summary counts
  const summary = registrations.reduce((acc, reg) => {
    acc[reg.status] = (acc[reg.status] || 0) + 1;
    return acc;
  }, {});

  const donutData = [
    { name: 'Confirmed', value: summary['Confirmed'] || 0, color: '#22c55e' },
    { name: 'Pending', value: summary['Pending'] || 0, color: '#facc15' },
    { name: 'Waitlist', value: summary['Waitlist'] || 0, color: '#3b82f6' },
    { name: 'Cancelled', value: summary['Cancelled'] || 0, color: '#ef4444' },
  ];
  const total = donutData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="min-h-screen  pb-8">
      <div className="max-w-7xl mx-auto w-full px-4 pt-8">
        <EventsBreadcrumb />
        <h1 className="text-2xl font-bold mb-1">My Registrations</h1>
        <p className="text-gray-500 mb-6">Track and manage your event registrations</p>
        {/* Summary and Overview Row */}
        <div className="w-full mb-2">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center md:items-stretch w-full gap-6">
            {/* Left: Donut chart and summary */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:w-1/3 gap-4">
              <div className="flex flex-col items-center w-full">
                <div className="font-semibold text-lg mb-1">Registration Summary</div>
                <div className="text-gray-500 text-sm mb-4">Overview of your event registrations</div>
                <div className="relative w-[160px] h-[160px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={2}
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Total in center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold">{total}</span>
                    <span className="text-xs text-gray-400">Total</span>
                  </div>
                </div>
                {/* Custom legend */}
                <div className="flex flex-row flex-wrap gap-4 mt-4 text-xs justify-center">
                  {donutData.map((entry) => (
                    <span key={entry.name} className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                      {entry.name}: {entry.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-200 mx-6"></div>
            {/* Right: Overview/description */}
            <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <div className="text-gray-700 text-base md:text-lg font-medium mb-1">Welcome to your event registrations dashboard!</div>
              <div className="text-gray-500 text-sm">Here you can track, filter, and manage all your event sign-ups, reminders, and statuses in one place.</div>
            </div>
          </div>
        </div>
        {/* Filters/Search Row */}
        <div className="flex flex-col md:flex-row gap-2 md:items-center mb-6">
          <input type="text" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Search registrations by event name, location, or description..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm" value={category} onChange={e => setCategory(e.target.value)}>
            <option>All Categories</option>
            <option>Academic</option>
            <option>Cultural</option>
            <option>Career</option>
            <option>Sports</option>
            <option>Social</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm" value={status} onChange={e => setStatus(e.target.value)}>
            <option>All Statuses</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Waitlist</option>
            <option>Cancelled</option>
          </select>
          <button className="text-gray-500 text-xs px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100" onClick={() => { setCategory('All Categories'); setStatus('All Statuses'); setSearch(''); }}>Clear Filters</button>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex gap-4 border-b border-gray-200 mb-4">
            <button className={`px-3 py-2 text-sm font-medium border-b-2 ${tab === 'upcoming' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500'}`} onClick={() => setTab('upcoming')}>Upcoming Events ({registrations.filter(reg => new Date(reg.date) >= today).length})</button>
            <button className={`px-3 py-2 text-sm font-medium border-b-2 ${tab === 'past' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500'}`} onClick={() => setTab('past')}>Past Events ({registrations.filter(reg => new Date(reg.date) < today).length})</button>
            <button className={`px-3 py-2 text-sm font-medium border-b-2 ${tab === 'all' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500'}`} onClick={() => setTab('all')}>All Registrations ({registrations.length})</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">No registrations found.</div>
            ) : filtered.map(reg => (
              <div key={reg.id} className="bg-white rounded-xl shadow border border-gray-100 flex flex-col overflow-hidden relative">
                <img src={reg.image} alt={reg.title} className="w-full h-40 object-cover" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${reg.status === 'Confirmed' ? 'bg-green-100 text-green-700' : reg.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : reg.status === 'Waitlist' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{reg.status}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${reg.category === 'Academic' ? 'bg-blue-100 text-blue-700' : reg.category === 'Cultural' ? 'bg-purple-100 text-purple-700' : reg.category === 'Career' ? 'bg-pink-100 text-pink-700' : reg.category === 'Sports' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{reg.category}</span>
                    <span className="text-xs text-gray-400 ml-auto">Registered: {reg.registered}</span>
                  </div>
                  <div className="font-semibold text-lg mb-1">{reg.title}</div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span>{new Date(reg.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{reg.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{reg.location}</span>
                  </div>
                  <div className="text-gray-700 text-sm mb-2 line-clamp-2 min-h-[40px]">{reg.description}</div>
                  {reg.reminder && <div className="text-xs text-purple-700 bg-purple-100 rounded px-2 py-1 mb-2 w-fit">Reminder: {reg.reminder}</div>}
                  <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md text-base flex items-center justify-center gap-2 transition">View Details <ChevronDownIcon className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="mt-10 py-6 text-center text-xs text-gray-400 border-t">
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

export default Events;