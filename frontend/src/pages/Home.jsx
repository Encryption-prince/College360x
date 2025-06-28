import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { CalendarDaysIcon, BuildingLibraryIcon, UsersIcon, ExclamationTriangleIcon, AcademicCapIcon, NewspaperIcon, HeartIcon, BookOpenIcon, ArrowRightIcon, MagnifyingGlassIcon, UserGroupIcon, WifiIcon, IdentificationIcon, CakeIcon, ArrowTopRightOnSquareIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import joinAClubImg from '../assets/join a club.jpg';
import upcomingEventsImg from '../assets/upcoming events.jpg';
import raggingImg from '../assets/ragging.jpg';
import studyPartImg from '../assets/study part.jpg';
import resourcesImg from '../assets/resources.jpg';
import calenderImg from '../assets/calender.jpg';
import newsImg from '../assets/news.jpg';
import welfareImg from '../assets/Welfare.jpg';

const mainCards = [
    {
        icon: <BuildingLibraryIcon className="w-6 h-6 text-mint-500" />, title: 'Join a Club', description: 'Discover and join clubs that match your interests and passions.', buttonText: 'Browse Clubs', bgColor: 'bg-mint-100', to: '/clubs', image: joinAClubImg,
    },
    {
        icon: <CalendarDaysIcon className="w-6 h-6 text-blue-500" />, title: 'Upcoming Events', description: 'Stay updated with the latest campus events and activities.', buttonText: 'View Events', bgColor: 'bg-blue-100', to: '/events', image: upcomingEventsImg,
    },
    {
        icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />, title: 'Report Ragging', description: 'Report incidents of ragging anonymously and securely.', buttonText: 'Report Now', bgColor: 'bg-red-100', to: '/ragging', image: raggingImg,
    },
    {
        icon: <UsersIcon className="w-6 h-6 text-purple-500" />, title: 'Find Study Partner', description: 'Connect with peers for collaborative learning and study sessions.', buttonText: 'Find Partner', bgColor: 'bg-purple-100', to: '/studypartner', image: studyPartImg,
    },
    {
        icon: <BookOpenIcon className="w-6 h-6 text-green-500" />, title: 'Campus Resources', description: 'Access essential campus resources and support services.', buttonText: 'Explore Resources', bgColor: 'bg-green-100', to: '/studymaterial', image: resourcesImg,
    },
    {
        icon: <AcademicCapIcon className="w-6 h-6 text-yellow-500" />, title: 'Academic Calendar', description: 'Keep track of important academic dates and deadlines.', buttonText: 'View Calendar', bgColor: 'bg-yellow-100', to: '/studymaterial', image: calenderImg,
    },
    {
        icon: <NewspaperIcon className="w-6 h-6 text-blue-400" />, title: 'Campus News', description: 'Stay informed about the latest news and announcements.', buttonText: 'Read News', bgColor: 'bg-blue-50', to: '/events', image: newsImg,
    },
    {
        icon: <HeartIcon className="w-6 h-6 text-pink-400" />, title: 'Student Welfare', description: 'Access mental health resources and student welfare services.', buttonText: 'Get Support', bgColor: 'bg-pink-100', to: '/studypartner', image: welfareImg,
    },
];

const events = [
    { title: 'Freshman Orientation', date: 'July 2, 2025', location: 'Main Auditorium', attendees: 156 },
    { title: 'Tech Fest 2025', date: 'July 15, 2025', location: 'Engineering Block', attendees: 432 },
    { title: 'Career Fair', date: 'July 28, 2025', location: 'Student Center', attendees: 289 },
];

const clubs = [
    { name: 'Coding Club', color: 'bg-mint-100', next: 'Tomorrow, 5 PM' },
    { name: 'Chess Club', color: 'bg-yellow-100', next: 'Friday, 3 PM' },
    { name: 'Music Society', color: 'bg-purple-100', next: 'Saturday, 6 PM' },
];

const partners = [
    { name: 'Sarah Miller', avatar: '', courses: ['CS101', 'MATH202', 'DS310'], availability: 'Evenings', field: 'Data Science' },
    { name: 'James Wong', avatar: '', courses: ['CS201', 'ENG305', 'PHYS101'], availability: 'Weekends', field: 'Computer Engineering' },
    { name: 'Emily Chen', avatar: '', courses: ['MATH301', 'STAT202', 'CS150'], availability: 'Afternoons', field: 'Mathematics' },
];

const quickAccess = [
    { label: 'Library', icon: <BookOpenIcon className="w-5 h-5" /> },
    { label: 'Cafeteria', icon: <CakeIcon className="w-5 h-5" /> },
    { label: 'Gym', icon: <UserGroupIcon className="w-5 h-5" /> },
    { label: 'Transport', icon: <MapPinIcon className="w-5 h-5" /> },
    { label: 'Wi-Fi', icon: <WifiIcon className="w-5 h-5" /> },
    { label: 'ID Card', icon: <IdentificationIcon className="w-5 h-5" /> },
];

const importantDates = [
    { label: 'Mid-Term Exams Begin', date: 'July 5', color: 'text-blue-600', icon: <CalendarDaysIcon className="w-5 h-5" /> },
    { label: 'Course Registration Deadline', date: 'July 15', color: 'text-red-600', icon: <ExclamationTriangleIcon className="w-5 h-5" /> },
    { label: 'Summer Festival', date: 'July 24', color: 'text-green-600', icon: <AcademicCapIcon className="w-5 h-5" /> },
    { label: 'Semester End', date: 'August 10', color: 'text-blue-600', icon: <CalendarDaysIcon className="w-5 h-5" /> },
];

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-[120rem] mx-auto w-full py-6 px-2 md:px-8">
            <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition font-medium">
                            <HomeIcon className="w-4 h-4 text-gray-400" />
                            <span>Home</span>
                        </a>
                    </li>
                </ol>
            </nav>
            {/* Welcome Banner */}
            <div className="rounded-xl overflow-hidden mb-8 relative h-56 md:h-64 flex items-center bg-gradient-to-br from-mint-200 to-blue-100">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Campus" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="relative z-10 p-8 md:p-12 text-white max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 font-poppins">Welcome back, Alex!</h2>
                    <p className="mb-6 text-lg font-inter">Your student journey continues. Explore clubs, events, and connect with fellow students to make the most of your college experience.</p>
                    <div className="flex gap-4">
                        <Button className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-sm shadow" onClick={() => navigate('/clubs')}>Explore Campus</Button>
                        <Button className="bg-mint-400 hover:bg-mint-500 text-white font-semibold px-6 py-2 rounded-sm shadow border border-gray-200" onClick={() => navigate('/events')}>View Schedule</Button>
                    </div>
                </div>
            </div>
            {/* Main Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {mainCards.map((card) => (
                    <div key={card.title} className="h-[370px] bg-white rounded-sm shadow-md flex flex-col overflow-hidden cursor-pointer transition hover:shadow-lg" onClick={() => navigate(card.to)}>
                        <div className="relative h-48 md:h-44 w-full flex-shrink-0 rounded-t-sm overflow-hidden">
                            <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover object-center" />
                        </div>
                        <div className={`flex flex-col flex-1 p-3 ${card.bgColor} justify-between`}>
                            <div>
                                <div className="flex items-center gap-3 mb-2 mt-2">
                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow text-lg">{card.icon}</span>
                                    <span className="font-semibold text-gray-900 text-base">{card.title}</span>
                                </div>
                                <div className="text-gray-600 text-sm mb-4 font-inter">{card.description}</div>
                            </div>
                            <Button className="px-4 py-2 rounded-md bg-white text-gray-900 font-semibold shadow hover:bg-gray-100 transition text-sm w-fit self-start">{card.buttonText}</Button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Events & Clubs Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Upcoming Events */}
                <div className="bg-white rounded-2xl shadow p-6 col-span-2">
                    <h2 className="font-bold text-lg mb-4 text-gray-900">Upcoming Events</h2>
                    <div className="flex flex-col gap-4">
                        {events.map((event, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-mint-50 rounded-xl px-5 py-4 shadow-sm border border-blue-100 hover:shadow-md hover:-translate-y-1 transition group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
                                        <CalendarDaysIcon className="w-6 h-6 text-blue-500" />
                                    </span>
                                    <div>
                                        <div className="font-semibold text-gray-900 text-base">{event.title}</div>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                            <CalendarDaysIcon className="w-4 h-4 text-blue-400" /> {event.date}
                                            <MapPinIcon className="w-4 h-4 text-mint-400" /> {event.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold shadow-sm border border-blue-200">
                                        <UsersIcon className="w-4 h-4" /> {event.attendees}
                                    </span>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold shadow transition">Register</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm transition group"
                            onClick={() => navigate('/events')}
                        >
                            View all events
                            <span className="inline-block group-hover:translate-x-1 transition-transform"><ArrowRightIcon className="w-4 h-4" /></span>
                        </button>
                    </div>
                </div>
                {/* Your Clubs */}
                <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
                    <h2 className="font-bold text-lg mb-4 text-gray-900">Your Clubs</h2>
                    <div className="flex flex-col gap-3 mb-4">
                        {clubs.map((club, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition cursor-pointer ${club.color}`}
                            >
                                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow text-lg">
                                    {i === 0 && <BuildingLibraryIcon className="w-5 h-5 text-mint-500" />}
                                    {i === 1 && <CakeIcon className="w-5 h-5 text-yellow-400" />}
                                    {i === 2 && <UserGroupIcon className="w-5 h-5 text-purple-400" />}
                                </span>
                                <div>
                                    <div className="font-semibold text-gray-900 text-base">{club.name}</div>
                                    <div className="text-xs text-gray-500">Next meeting: {club.next}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full bg-mint-400 hover:bg-mint-500 text-gray-900 font-semibold px-4 py-2 rounded-full shadow flex items-center justify-center gap-2 transition">
                        <span className="text-lg font-bold">+</span> Join New Club
                    </Button>
                </div>
            </div>
            {/* Study Partner Suggestions */}
            <div className="bg-white rounded-2xl shadow p-6 mb-10">
                <h2 className="font-bold text-lg mb-4 text-gray-900">Study Partner Suggestions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {partners.map((partner, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-md p-6 transition hover:shadow-lg hover:scale-[1.03] cursor-pointer border border-purple-100"
                        >
                            <Avatar className="w-16 h-16 mb-3 shadow-lg ring-2 ring-purple-200">
                                {partner.avatar ? <AvatarImage src={partner.avatar} /> : <AvatarFallback>{partner.name[0]}</AvatarFallback>}
                            </Avatar>
                            <div className="font-semibold text-gray-900 mb-0.5 text-base">{partner.name}</div>
                            <div className="text-xs text-purple-600 mb-2 font-medium">{partner.field}</div>
                            <div className="flex flex-wrap gap-1 mb-2 justify-center">
                                {partner.courses.map((course, idx) => (
                                    <span key={idx} className="bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm border border-purple-200">{course}</span>
                                ))}
                            </div>
                            <div className="text-xs text-gray-500 mb-4">Availability: <span className="font-medium text-gray-700">{partner.availability}</span></div>
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-400 hover:from-purple-600 hover:to-pink-500 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow">Connect</Button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Quick Access & Important Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Quick Access */}
                <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col">
                    <h2 className="font-bold text-lg mb-4 text-gray-900">Quick Access</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1 h-full">
                        {quickAccess.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-mint-100 to-blue-50 rounded-xl p-5 cursor-pointer hover:shadow-lg hover:scale-[1.04] transition border border-mint-100 h-full w-full"
                            >
                                <div className="text-blue-600 mb-1">{item.icon}</div>
                                <div className="font-medium text-gray-900 text-sm text-center">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Important Dates */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="font-bold text-lg mb-4 text-gray-900">Important Dates</h2>
                    <div className="space-y-4">
                        {importantDates.map((date, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-mint-50 rounded-lg p-3 border border-blue-100 shadow-sm hover:shadow-md transition"
                            >
                                <span className={`rounded-full bg-white p-2 shadow ${date.color}`}>{date.icon}</span>
        <div>
                                    <div className="font-medium text-gray-900 text-sm">{date.label}</div>
                                    <div className="text-xs text-gray-500">{date.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="mt-12 border-t border-gray-200">
                <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
                    <div className="flex justify-center gap-8">
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
                            <svg data-name="Layer 1" id="Layer_1" className="w-6 h-6" fill="currentColor" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path className="cls-1" d="M250,193.27A56.73,56.73,0,1,0,306.73,250,56.8,56.8,0,0,0,250,193.27Z" /><path className="cls-1" d="M316.74,105.49H183.26a77.86,77.86,0,0,0-77.77,77.77V316.74a77.86,77.86,0,0,0,77.77,77.77H316.74a77.86,77.86,0,0,0,77.77-77.77V183.26A77.86,77.86,0,0,0,316.74,105.49ZM250,336.7A86.7,86.7,0,1,1,336.7,250,86.8,86.8,0,0,1,250,336.7Zm95.27-160.26A21.41,21.41,0,1,1,366.68,155,21.41,21.41,0,0,1,345.27,176.45Z" /><path className="cls-1" d="M484.85,124.74a144.17,144.17,0,0,0-2.32-25.29c-1.94-10.19-4.67-20.12-9.55-29.33A101.84,101.84,0,0,0,453.39,44a97.14,97.14,0,0,0-42.76-24.4c-14.83-4-30-4.84-45.21-4.82a.46.46,0,0,1-.09-.23H134.59c0,.08,0,.16,0,.23-8.65.16-17.32.09-25.92,1.16A123.46,123.46,0,0,0,81,22.14,97.48,97.48,0,0,0,44.25,46.26,97.15,97.15,0,0,0,19.68,89.17c-3.94,14.72-4.8,29.73-4.82,44.85L14.7,365.69v0c.28,10.45.37,21,2.13,31.36,1.87,11,4.54,21.71,9.64,31.69A101.36,101.36,0,0,0,54.77,463a91.91,91.91,0,0,0,28.31,15.35c15.12,4.88,30.72,6.75,46.55,6.84,9.88.06,19.74.31,29.62.27,71.74-.3,143.49.52,215.23-.44a169.32,169.32,0,0,0,28.23-3A95.61,95.61,0,0,0,450,459c15.78-14.08,26.43-31.3,31.24-52.09,3.15-13.59,3.93-27.38,4.07-41.21v-2.76C485.3,361.86,484.89,127.84,484.85,124.74Zm-60.38,192A107.87,107.87,0,0,1,316.74,424.48H183.26A107.87,107.87,0,0,1,75.52,316.74V183.26A107.87,107.87,0,0,1,183.26,75.52H316.74A107.87,107.87,0,0,1,424.48,183.26Z" /></svg>                        </a>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        <p>© 2025 CampusConnect. All rights reserved.</p>
                        <p className="mt-1">
                            <a href="#" className="hover:underline">Privacy Policy</a>
                            <span className="mx-2">·</span>
                            <a href="#" className="hover:underline">Terms of Service</a>
                            <span className="mx-2">·</span>
                            <a href="#" className="hover:underline">Contact Us</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;