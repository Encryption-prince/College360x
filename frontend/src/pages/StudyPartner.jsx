import React, { useState, Fragment } from 'react';
import { HomeIcon, ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon, UserPlusIcon, UsersIcon, ArrowRightOnRectangleIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, CheckCircleIcon, ChatBubbleLeftRightIcon, EllipsisHorizontalIcon, ChevronUpDownIcon, CheckIcon, ChevronRightIcon, ClockIcon, MapPinIcon, PlusIcon, DevicePhoneMobileIcon, ArrowsRightLeftIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { Listbox, Transition, Menu, Dialog } from '@headlessui/react';
import { CalendarIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// const allCourses = ['CS101', 'MATH202', 'CS201', 'PHYS101'];
const allLocations = ['Library', 'Cafe', 'Lab', 'Study Hall', 'Outdoor'];
const allStyles = ['Visual learner', 'Problem-solving', 'Group discussions', 'Quiet environment'];
const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend'];
const allSlots = ['Morning (9AM - 12PM)', 'Afternoon (1PM - 4PM)', 'Evening (5PM - 8PM)'];
const allMajors = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Engineering', 'Biology', 'Business', 'Psychology'];
const allDepartments = ['All Departments', 'Computer Science', 'Mathematics', 'Physics', 'Engineering'];
const allFilterCourses = ['All Courses', 'CS101', 'MATH202', 'ENG305', 'PHYS101'];
const allFilterLocations = ['All Locations', 'Library', 'Cafe', 'Lab', 'Study Hall', 'Outdoor'];

const defaultPreferences = {
  major: 'Computer Science',
  courses: ['CS101', 'MATH202'],
  locations: ['Library', 'Cafe'],
  studyStyle: ['Visual learner', 'Problem-solving'],
  availability: {
    Monday: { enabled: true, slot: 'Afternoon (1PM - 4PM)' },
    Tuesday: { enabled: false, slot: 'Afternoon (1PM - 4PM)' },
    Wednesday: { enabled: true, slot: 'Evening (5PM - 8PM)' },
    Thursday: { enabled: true, slot: 'Morning (9AM - 12PM)' },
    Friday: { enabled: false, slot: 'Morning (9AM - 12PM)' },
    Weekend: { enabled: false, slot: 'Afternoon (1PM - 4PM)' },
  },
};

const partnerData = [
  {
    name: 'Sarah Miller',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    major: 'Data Science, Junior',
    courses: ['CS101', 'MATH202', 'DS310'],
    availability: ['Mon 2-5PM', 'Wed 3-6PM', 'Fri 1-4PM'],
    style: ['Visual learner', 'Group discussions'],
    locations: ['Library'],
    compatibility: 92,
  },
  {
    name: 'James Wong',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    major: 'Computer Engineering, Senior',
    courses: ['CS201', 'ENG305', 'PHYS101'],
    availability: ['Tue 1-4PM', 'Thu 2-5PM', 'Sat 10AM-1PM'],
    style: ['Problem-solving', 'Quiet environment'],
    locations: ['Lab'],
    compatibility: 85,
  },
  {
    name: 'Emily Chen',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    major: 'Mathematics, Sophomore',
    courses: ['MATH301', 'STAT202', 'CS150'],
    availability: ['Mon 9AM-12PM', 'Wed 1-4PM', 'Fri 3-6PM'],
    style: ['Note-taking', 'Flashcards'],
    locations: ['Cafe'],
    compatibility: 78,
  },
  // ...add more mock partners as needed
];

// Mock data for study groups and recommended groups
const mockGroups = [
  {
    id: 1,
    name: 'Data Science Explorers',
    course: 'DS310 - Advanced Data Analysis',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    progress: 75,
    nextMeeting: 'Tue, Jun 24, 3:00 PM',
    members: [
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/65.jpg',
    ],
    tags: ['Data Science', 'Python', 'Statistics'],
    memberCount: 4,
    memberLimit: 12,
    admin: {
      name: 'Sarah Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    lastActive: '3 days ago',
  },
  {
    id: 2,
    name: 'Algorithm Masters',
    course: 'CS201 - Algorithms & Data Structures',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    progress: 60,
    nextMeeting: 'Wed, Jun 25, 5:00 PM',
    members: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/45.jpg',
    ],
    tags: ['Algorithms', 'Data Structures', 'Problem Solving'],
    memberCount: 4,
    memberLimit: 10,
    admin: {
      name: 'James Wong',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    lastActive: '2 days ago',
  },
  {
    id: 3,
    name: 'Physics Problem Solvers',
    course: 'PHYS201 - Classical Mechanics',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    progress: 45,
    nextMeeting: 'Thu, Jun 26, 2:00 PM',
    members: [
      'https://randomuser.me/api/portraits/men/45.jpg',
      'https://randomuser.me/api/portraits/women/65.jpg',
      'https://randomuser.me/api/portraits/men/32.jpg',
    ],
    tags: ['Physics', 'Mechanics', 'Problem Solving'],
    memberCount: 6,
    memberLimit: 12,
    admin: {
      name: 'Michael Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    lastActive: '4 days ago',
  },
  {
    id: 4,
    name: 'Business Case Study Group',
    course: 'BUS301 - Strategic Management',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    progress: 85,
    nextMeeting: 'Tue, Jun 24, 5:00 PM',
    members: [
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/45.jpg',
    ],
    tags: ['Business', 'Case Studies', 'Strategic Management'],
    memberCount: 9,
    memberLimit: 10,
    admin: {
      name: 'Jessica Parker',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    lastActive: '1 day ago',
  },
];
const recommendedGroups = [
  {
    id: 1,
    name: 'AI Research Collective',
    course: 'CS450 - Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    members: 7,
    days: 'Wednesdays & Saturdays',
    badge: 'Based on your CS courses',
  },
  {
    id: 2,
    name: 'Quantum Computing Explorers',
    course: 'PHY540 - Quantum Computing',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80',
    members: 5,
    days: 'Tuesdays & Thursdays',
    badge: 'Matches your physics interests',
  },
  {
    id: 3,
    name: 'Web Development Workshop',
    course: 'CS330 - Web Technologies',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    members: 12,
    days: 'Mondays & Fridays',
    badge: 'Popular in your department',
  },
  {
    id: 4,
    name: 'Entrepreneurship Think Tank',
    course: 'BUS420 - Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    members: 8,
    days: 'Thursdays & Sundays',
    badge: 'Complements your courses',
  },
];

// Mock data for invitations
const mockInvitations = [
  {
    id: 1,
    name: 'Mathematics Study Circle',
    course: 'MATH303 - Linear Algebra',
    image: '', // placeholder or real image URL
    daysLeft: 6,
    inviter: { name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    members: 6,
    schedule: 'Tuesdays & Fridays, 2:00 PM - 4:00 PM',
    location: 'Mathematics Building Room 203',
  },
  {
    id: 2,
    name: 'Software Engineering Project Team',
    course: 'CS401 - Software Engineering',
    image: '', // placeholder or real image URL
    daysLeft: 2,
    inviter: { name: 'Daniel Park', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    members: 8,
    schedule: 'Mondays & Wednesdays, 6:00 PM - 8:00 PM',
    location: 'Computer Science Building Room 405',
  },
];

function MyStudyGroupsDashboard() {
  const location = useLocation();
  const showBreadcrumb = location.pathname === '/studypartner/groups';
  const [groupTab, setGroupTab] = useState('active');
  return (
    <div className="max-w-[1400px] mx-auto w-full py-6 px-2 md:px-8">
      {showBreadcrumb && (
        <nav className="flex items-center text-sm text-gray-500 mb-4 gap-1">
          <Link to="/" className="hover:underline text-gray-500">Home</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
          <Link to="/studypartner" className="hover:underline text-gray-500">Study Partner</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
          <span className="text-gray-700 font-medium">My Groups</span>
        </nav>
      )}
      {/* Banner */}
      <div className="rounded-xl overflow-hidden mb-8 relative h-48 md:h-56 flex items-center">
        <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80" alt="Study Groups" className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative z-10 p-8 md:p-12 text-white max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 font-poppins">My Study Groups</h2>
          <p className="mb-6 text-base font-inter">Manage your study groups, track progress, and collaborate with classmates. Join forces to achieve academic excellence through structured group learning.</p>
          <div className="flex gap-4">
            <button className="bg-green-400 hover:bg-green-500 text-white font-semibold px-5 py-2 rounded-md shadow flex items-center gap-2">
              + Create New Group
            </button>
            <button className="bg-white/80 hover:bg-white text-gray-900 font-semibold px-5 py-2 rounded-md shadow flex items-center gap-2">
              Find Groups
            </button>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <div className="inline-flex rounded-lg bg-gray-100 p-1 border border-gray-200">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${groupTab === 'active' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'}`}
            onClick={() => setGroupTab('active')}
            type="button"
          >
            <UsersIcon className="w-5 h-5" /> Active Groups
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${groupTab === 'invitations' ? 'bg-white text-gray-900 shadow' : 'text-gray-500'}`}
            onClick={() => setGroupTab('invitations')}
            type="button"
          >
            <UserPlusIcon className="w-5 h-5" /> Group Invitations
            <span className="ml-2 bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-xs font-bold">2</span>
          </button>
        </div>
      </div>
      {groupTab === 'active' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {mockGroups.map(group => (
            <div key={group.id} className="bg-white rounded-2xl shadow flex flex-col min-h-[420px]">
              <div className="relative h-56 w-full">
                <img src={group.image} alt={group.name} className="absolute inset-0 w-full h-full object-cover rounded-t-lg object-center" />
                <span className="absolute top-3 left-3 bg-mint-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Member</span>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                  <div className="font-semibold text-lg text-white">{group.name}</div>
                  <div className="text-xs text-gray-200">{group.course}</div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-2">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 font-medium">Course Progress</span>
                  <span className="text-xs text-gray-700 font-bold">{group.progress}%</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-black rounded-full" style={{ width: `${group.progress}%` }} />
                  </div>
                </div>
                {/* Next Meeting & Members */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div>
                    <div className="font-semibold text-[11px] text-gray-400 mb-0.5">Next Meeting</div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {group.nextMeeting}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-semibold text-[11px] text-gray-400 mb-0.5">Member</div>
                    <div className="flex items-center">
                      {group.members.map((m, idx) => (
                        <img
                          key={idx}
                          src={m}
                          alt=""
                          className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0 ring-2 ring-purple-200 shadow"
                        />
                      ))}
                      <span className="ml-2 text-xs text-gray-500 font-bold">+{group.memberCount - group.members.length}</span>
                    </div>
                  </div>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {group.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-purple-700 rounded px-2 py-0.5 text-xs font-semibold">{tag}</span>
                  ))}
                  <span className="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs font-semibold">+1</span>
                </div>
                {/* Actions */}
                <div className="flex gap-2 mt-2 items-center">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    Details
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm flex items-center gap-2 w-fit">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    Chat
                  </button>
                  <div className="flex-1" />
                  <Menu as="div" className="relative z-20">
                    <Menu.Button className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md px-3 py-2 flex items-center justify-center h-full">
                      <EllipsisHorizontalIcon className="w-5 h-5" />
                    </Menu.Button>
                    <Menu.Items className="absolute bottom-full right-0 mb-2 w-48 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`flex items-center w-full px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}>
                              <Cog6ToothIcon className="w-5 h-5 mr-2 text-gray-400" /> Group Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`flex items-center w-full px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}>
                              <UserPlusIcon className="w-5 h-5 mr-2 text-gray-400" /> Invite Member
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`flex items-center w-full px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''} text-gray-700`}>
                              <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" /> Schedule Meeting
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button className={`flex items-center w-full px-4 py-2 text-sm ${active ? 'bg-red-50' : ''} text-red-600 font-semibold`}>
                              <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-red-500" /> Leave Group
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockInvitations.map(invite => (
              <div key={invite.id} className="bg-white rounded-2xl shadow flex flex-col overflow-hidden border border-gray-100">
                <div className="relative h-32 w-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-end">
                  <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1"><ClockIcon className="w-4 h-4 mr-1" />{invite.daysLeft} days left</span>
                  <div className="absolute bottom-3 left-4">
                    <div className="font-semibold text-xl text-white drop-shadow">{invite.name}</div>
                    <div className="text-sm text-gray-200 drop-shadow">{invite.course}</div>
                  </div>
                  <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg font-semibold select-none">Image</span>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={invite.inviter.avatar} alt={invite.inviter.name} className="w-8 h-8 rounded-full border-2 border-white shadow" />
                    <div>
                      <div className="text-xs text-gray-500">Invited by</div>
                      <div className="font-semibold text-base text-gray-900">{invite.inviter.name}</div>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="flex flex-wrap gap-6 mb-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Members</div>
                      <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm">
                        <UsersIcon className="w-4 h-4" /> {invite.members} <span className="font-normal text-gray-700">members</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Schedule</div>
                      <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm">
                        <CalendarIcon className="w-4 h-4" /> <span className="font-normal text-gray-700">{invite.schedule}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="font-normal text-gray-700">{invite.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-md flex items-center gap-2 justify-center text-base"><span className="text-lg">&#10005;</span> Decline</button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2 justify-center text-base"><CheckIcon className="w-5 h-5" /> Accept</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <a href="#" className="text-purple-600 hover:underline text-base font-semibold flex items-center gap-1">View All Invitations <ChevronRightIcon className="w-5 h-5" /></a>
          </div>
        </div>
      )}
      {/* Recommended Groups */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900">Recommended Groups</h3>
          <a href="#" className="text-purple-600 hover:underline text-sm font-semibold flex items-center gap-1">
            View All <ChevronRightIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedGroups.map(group => (
            <div key={group.id} className="bg-white rounded-2xl shadow flex flex-col overflow-hidden">
              <div className="relative h-36 w-full">
                <img src={group.image} alt={group.name} className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                  <div className="font-semibold text-lg text-white">{group.name}</div>
                </div>
              </div>
              <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
                <div className="text-xs text-gray-500 mb-2">{group.course}</div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="flex items-center gap-1 text-purple-600 font-semibold text-sm">
                    <UsersIcon className="w-4 h-4" /> {group.members} <span className="font-normal text-gray-700">members</span>
                  </span>
                  <span className="flex items-center gap-1 text-purple-600 font-semibold text-sm">
                    <CalendarIcon className="w-4 h-4" /> <span className="font-normal text-gray-700">{group.days}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-purple-50 text-purple-700 rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1">
                    <CheckCircleIcon className="w-4 h-4" /> {group.badge}
                  </span>
                </div>
                <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md text-sm flex items-center gap-2 justify-center">
                  <UserPlusIcon className="w-5 h-5" /> Join Group
                </button>
              </div>
            </div>
          ))}
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

const StudyPartner = () => {
  const location = useLocation();
  const [showPrefs, setShowPrefs] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [newCourse, setNewCourse] = useState('');
  const [filters, setFilters] = useState({});
  const [compatibility, setCompatibility] = useState(60);
  const sortOptions = ['Highest Compatibility', 'Most Recent', 'Name (A-Z)'];
  const [sort, setSort] = useState(sortOptions[0]);
  const [filterDepartment, setFilterDepartment] = useState(allDepartments[0]);
  const [filterCourse, setFilterCourse] = useState(allFilterCourses[0]);
  const [filterLocation, setFilterLocation] = useState(allFilterLocations[0]);
  const [search, setSearch] = useState("");
  const [filterStyles, setFilterStyles] = useState([]);
  const [partnersToShow, setPartnersToShow] = useState(6); // for load more
  const [groupTab, setGroupTab] = useState('active');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Breadcrumbs
  let currentSection = '';
  if (location.pathname === '/studypartner/join') currentSection = 'Join Group';
  if (location.pathname === '/studypartner/groups') currentSection = 'My Groups';
  // No extra section for /studypartner

  // Only show breadcrumb if not on /studypartner/groups
  const showBreadcrumb = location.pathname !== '/studypartner/groups';

  if (location.pathname === "/studypartner/groups") {
    return <MyStudyGroupsDashboard />;
  }
  if (location.pathname === "/studypartner/join") {
    return <JoinGroupPage />;
  }

  // Handlers for checkboxes
  const handleCourseToggle = (course) => {
    setPreferences((prev) => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter((c) => c !== course)
        : [...prev.courses, course],
    }));
  };
  const handleAddCourse = () => {
    if (newCourse && !preferences.courses.includes(newCourse)) {
      setPreferences((prev) => ({ ...prev, courses: [...prev.courses, newCourse] }));
      setNewCourse('');
    }
  };
  const handleDeleteCourse = (course) => {
    setPreferences((prev) => ({ ...prev, courses: prev.courses.filter((c) => c !== course) }));
  };
  const handleLocationToggle = (loc) => {
    setPreferences((prev) => ({
      ...prev,
      locations: prev.locations.includes(loc)
        ? prev.locations.filter((l) => l !== loc)
        : [...prev.locations, loc],
    }));
  };
  const handleStyleToggle = (style) => {
    setPreferences((prev) => ({
      ...prev,
      studyStyle: prev.studyStyle.includes(style)
        ? prev.studyStyle.filter((s) => s !== style)
        : [...prev.studyStyle, style],
    }));
  };
  const handleAvailabilityToggle = (day) => {
    setPreferences((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          enabled: !prev.availability[day].enabled,
        },
      },
    }));
  };
  const handleAvailabilitySlot = (day, slot) => {
    setPreferences((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          slot,
        },
      },
    }));
  };

  // Filtering logic
  const filteredPartners = partnerData.filter((p) => {
    // Search (name, course, major)
    const searchMatch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.major.toLowerCase().includes(search.toLowerCase()) ||
      p.courses.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    // Department
    const departmentMatch =
      filterDepartment === "All Departments" ||
      p.major.toLowerCase().includes(filterDepartment.toLowerCase());
    // Course
    const courseMatch =
      filterCourse === "All Courses" ||
      p.courses.includes(filterCourse);
    // Location
    const locationMatch =
      filterLocation === "All Locations" ||
      p.locations.includes(filterLocation);
    // Compatibility
    const compatibilityMatch = p.compatibility >= compatibility;
    // Study Style
    const styleMatch =
      filterStyles.length === 0 ||
      filterStyles.every((style) => p.style.includes(style));
    return (
      searchMatch &&
      departmentMatch &&
      courseMatch &&
      locationMatch &&
      compatibilityMatch &&
      styleMatch
    );
  });

  const visiblePartners = filteredPartners.slice(0, partnersToShow);

  const handleStyleCheckbox = (style) => {
    setFilterStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };
  const handleResetFilters = () => {
    setSearch("");
    setFilterDepartment(allDepartments[0]);
    setFilterCourse(allFilterCourses[0]);
    setFilterLocation(allFilterLocations[0]);
    setCompatibility(60);
    setFilterStyles([]);
  };

  return (
    <div className="max-w-[1400px] mx-auto w-full py-6 px-2 md:px-8">
      {showBreadcrumb && (
        <nav className="flex items-center text-sm text-gray-500 mb-4 gap-1">
          <Link to="/" className="hover:underline text-gray-500">Home</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
          <Link to="/studypartner" className="hover:underline text-gray-500">Study Partner</Link>
          {currentSection && <><ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" /><span className="text-gray-700 font-medium">{currentSection}</span></>}
        </nav>
      )}
      {/* Banner */}
      <div className="rounded-xl overflow-hidden mb-8 relative h-48 md:h-56 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative z-10 p-8 md:p-12 text-white max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 font-poppins">Find Your Ideal Study Partner</h2>
          <p className="mb-6 text-base font-inter">Connect with fellow students who share your courses, study preferences, and availability. Boost your academic performance through collaborative learning.</p>
          <div className="flex gap-4">
            <button className="bg-white/80 hover:bg-white text-gray-900 font-semibold px-5 py-2 rounded-md shadow flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-purple-600" />
              Update My Preferences
            </button>
            <button className="bg-mint-500 hover:bg-mint-600 text-white font-semibold px-5 py-2 rounded-md shadow border border-gray-200 flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-white" />
              My Study Groups
            </button>
          </div>
        </div>
      </div>
      {/* Preferences Accordion */}
      <div className="mb-6">
        {/* Summary (collapsed) div */}
        <div
          className="bg-white rounded-2xl shadow p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
          onClick={() => setShowPrefs(v => !v)}
        >
          <div className="flex items-center gap-3">
            <Cog6ToothIcon className="w-6 h-6 text-purple-500" />
            <div>
              <div className="text-lg font-semibold text-purple-700">My Study Preferences</div>
              {/* <div className="text-sm text-gray-700 mt-1 flex flex-wrap gap-3">
                <span><b>Major:</b> {preferences.major}</span>
                <span><b>Courses:</b> {preferences.courses.slice(0, 2).join(', ')}{preferences.courses.length > 2 ? '...' : ''}</span>
                <span><b>Locations:</b> {preferences.locations.slice(0, 2).join(', ')}{preferences.locations.length > 2 ? '...' : ''}</span>
              </div> */}
            </div>
          </div>
          <button className="ml-4 text-gray-500 hover:text-gray-700" tabIndex={-1}>
            {showPrefs ? <ChevronUpIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
          </button>
        </div>
        {/* Expanded (dropdown) div */}
        {showPrefs && (
          <div className="bg-white rounded-2xl shadow p-6 mt-2">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div>
                  <h3 className="font-bold text-base mb-4">Personal Information</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Major</label>
                    <Listbox value={preferences.major} onChange={val => setPreferences(prev => ({ ...prev, major: val }))}>
                      {({ open }) => (
                        <div className="relative">
                          <Listbox.Button className="w-full rounded-lg border border-gray-200 p-2 pr-4 text-base flex justify-between items-center">
                            <span>{preferences.major}</span>
                            {open ? (
                              <ChevronUpIcon className="w-5 h-5 ml-2 transition-transform" />
                            ) : (
                              <ChevronDownIcon className="w-5 h-5 ml-2 transition-transform" />
                            )}
                          </Listbox.Button>
                          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                              {allMajors.map(m => (
                                <Listbox.Option key={m} value={m} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
                                  {({ selected }) => (
                                    <>
                                      <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{m}</span>
                                      {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3"><CheckIcon className="w-5 h-5 text-purple-600" /></span> : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      )}
                    </Listbox>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Current Courses</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {preferences.courses.map((c) => (
                        <span key={c} className="flex items-center gap-1 bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-base font-semibold border border-gray-200">
                          {c}
                          <button type="button" onClick={() => handleDeleteCourse(c)} className="ml-1 text-red-500 hover:text-red-700">&times;</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <input type="text" value={newCourse} onChange={e => setNewCourse(e.target.value)} placeholder="Add course" className="rounded border border-gray-200 px-2 py-1 text-base" />
                      <button type="button" onClick={handleAddCourse} className="text-base text-purple-600 hover:underline bg-gray-50 border border-gray-200 rounded px-3 py-1">+ Add Course</button>
                    </div>
                  </div>
                </div>
                {/* Study Preferences */}
                <div>
                  <h3 className="font-bold text-base mb-4">Study Preferences</h3>
                  <label className="block text-sm font-medium mb-1">Preferred Study Locations</label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {allLocations.map(loc => (
                      <label key={loc} className="flex items-center gap-2 text-base font-medium">
                        <input type="checkbox" checked={preferences.locations.includes(loc)} onChange={() => handleLocationToggle(loc)} className="accent-mint-500" /> {loc}
                      </label>
                    ))}
                  </div>
                  <label className="block text-sm font-medium mb-1">Study Style</label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {allStyles.map(style => (
                      <label key={style} className="flex items-center gap-2 text-base font-medium">
                        <input type="checkbox" checked={preferences.studyStyle.includes(style)} onChange={() => handleStyleToggle(style)} className="accent-purple-500" /> {style}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {/* Availability */}
              <div className="mt-8">
                <h3 className="font-bold text-base mb-4">Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {allDays.map(day => (
                    <div key={day} className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-base w-20">{day}</span>
                        <button
                          type="button"
                          aria-pressed={preferences.availability[day]?.enabled}
                          onClick={() => handleAvailabilityToggle(day)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${preferences.availability[day]?.enabled ? 'bg-purple-500' : 'bg-gray-300'}`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${preferences.availability[day]?.enabled ? 'translate-x-5.5' : 'translate-x-0.5'}`}
                          />
                        </button>
                      </div>
                      <div>
                        <Listbox value={preferences.availability[day]?.slot} onChange={val => handleAvailabilitySlot(day, val)} disabled={!preferences.availability[day]?.enabled}>
                          {({ open }) => (
                            <div className="relative">
                              <Listbox.Button className="w-full rounded-lg border border-gray-200 p-2 pr-4 text-xs flex justify-between items-center disabled:bg-gray-100" disabled={!preferences.availability[day]?.enabled}>
                                <span>{preferences.availability[day]?.slot}</span>
                                {open ? (
                                  <ChevronUpIcon className="w-4 h-4 ml-2 transition-transform" />
                                ) : (
                                  <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform" />
                                )}
                              </Listbox.Button>
                              <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                                  {allSlots.map(slot => (
                                    <Listbox.Option key={slot} value={slot} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
                                      {({ selected }) => (
                                        <>
                                          <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{slot}</span>
                                          {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3"><CheckIcon className="w-4 h-4 text-purple-600" /></span> : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          )}
                        </Listbox>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md">Save Preferences</button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow p-5 mb-2">
            <h3 className="font-bold text-base text-gray-900 mb-4">Filter Options</h3>
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 text-gray-500">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 py-2 h-10 pl-10 truncate"
                  placeholder="Search by name, course, major"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            {/* Department Filter */}
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 text-gray-500">Department</label>
              <Listbox value={filterDepartment} onChange={setFilterDepartment}>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="w-full rounded-lg border border-gray-200 p-2 pr-4 text-xs flex justify-between items-center">
                      <span>{filterDepartment}</span>
                      {open ? (
                        <ChevronUpIcon className="w-4 h-4 ml-2 transition-transform" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform" />
                      )}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                        {allDepartments.map(dep => (
                          <Listbox.Option key={dep} value={dep} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{dep}</span>
                                {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3"><CheckIcon className="w-4 h-4 text-purple-600" /></span> : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                )}
              </Listbox>
            </div>
            {/* Course Filter */}
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 text-gray-500">Course</label>
              <Listbox value={filterCourse} onChange={setFilterCourse}>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="w-full rounded-lg border border-gray-200 p-2 pr-4 text-xs flex justify-between items-center">
                      <span>{filterCourse}</span>
                      {open ? (
                        <ChevronUpIcon className="w-4 h-4 ml-2 transition-transform" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform" />
                      )}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                        {allFilterCourses.map(course => (
                          <Listbox.Option key={course} value={course} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{course}</span>
                                {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3"><CheckIcon className="w-4 h-4 text-purple-600" /></span> : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                )}
              </Listbox>
            </div>
            {/* Study Location Filter */}
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 text-gray-500">Study Location</label>
              <Listbox value={filterLocation} onChange={setFilterLocation}>
                {({ open }) => (
                  <div className="relative">
                    <Listbox.Button className="w-full rounded-lg border border-gray-200 p-2 pr-4 text-xs flex justify-between items-center">
                      <span>{filterLocation}</span>
                      {open ? (
                        <ChevronUpIcon className="w-4 h-4 ml-2 transition-transform" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform" />
                      )}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
                        {allFilterLocations.map(loc => (
                          <Listbox.Option key={loc} value={loc} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{loc}</span>
                                {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3"><CheckIcon className="w-4 h-4 text-purple-600" /></span> : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                )}
              </Listbox>
            </div>
            {/* Compatibility Filter */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-gray-500">Compatibility</label>
                <span className="text-xs font-semibold text-purple-600">{compatibility}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={compatibility}
                onChange={e => setCompatibility(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1 text-gray-500">Study Style</label>
              <div className="grid grid-cols-2 gap-1">
                {['Visual learner', 'Problem-solving', 'Note-taking', 'Group discussions', 'Quiet environment', 'Flashcards'].map(style => (
                  <label key={style} className="flex items-center gap-1 text-xs font-medium">
                    <input
                      type="checkbox"
                      className="accent-purple-500"
                      checked={filterStyles.includes(style)}
                      onChange={() => handleStyleCheckbox(style)}
                    />
                    {style}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-md text-xs"
                onClick={handleResetFilters}
                type="button"
              >
                Reset Filters
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-1.5 rounded-md text-xs">Apply Filters</button>
            </div>
          </div>
        </div>
        {/* Partner Grid */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
            <div className="font-semibold text-gray-900 text-base">Found {filteredPartners.length} Study Partners</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Sort by:</span>
              <Listbox value={sort} onChange={setSort}>
                {({ open }) => (
                  <div className="relative min-w-[160px]">
                    <Listbox.Button className={`w-full rounded-md px-4 py-2 text-xs flex justify-between items-center truncate bg-[#f5f6fa] border border-[#e0e3eb] shadow-[4px_4px_12px_#e0e3eb,_-4px_-4px_12px_#ffffff] transition focus:ring-2 focus:outline-none ${open ? 'ring-2' : ''}`}>
                      <span className="truncate">{sort}</span>
                      {open ? (
                        <ChevronUpIcon className="w-4 h-4 ml-2 transition-transform" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform" />
                      )}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-[#f5f6fa] border border-[#e0e3eb] rounded-md shadow-[4px_4px_12px_#e0e3eb,_-4px_-4px_12px_#ffffff] max-h-60 overflow-auto focus:outline-none">
                        {sortOptions.map(option => (
                          <Listbox.Option key={option} value={option} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 rounded-md mx-1 my-1 ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-900'}`}>
                            {({ selected }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{option}</span>
                                {selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3"><CheckIcon className="w-4 h-4 text-purple-600" /></span> : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                )}
              </Listbox>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visiblePartners.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-5 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-200" />
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center gap-2">
                      {p.name}
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-xs font-bold ml-2">
                        {p.compatibility}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{p.major}</div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="text-xs text-gray-500 mb-0.5">Courses</div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {p.courses.map(c => (
                      <span key={c} className="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs font-semibold border border-gray-200">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-1">
                  <div className="text-xs text-gray-500 mb-0.5">Availability</div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {p.availability.map(a => (
                      <span key={a} className="bg-green-50 text-green-700 rounded px-2 py-0.5 text-xs font-semibold border border-green-100">{a}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-1">
                  <div className="text-xs text-gray-500 mb-0.5">Study Style</div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {p.style.map(s => (
                      <span key={s} className="bg-purple-50 text-purple-700 rounded px-2 py-0.5 text-xs font-semibold border border-purple-100">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-2 items-center">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm flex items-center gap-2 w-fit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                    Details
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md text-sm flex items-center gap-2 w-fit">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    Chat
                  </button>
                  <div className="flex-1" />

                </div>
              </div>
            ))}
          </div>
          <button
            className="mx-auto mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md border border-gray-300"
            onClick={() => setPartnersToShow((prev) => prev + 6)}
            disabled={visiblePartners.length >= filteredPartners.length}
          >
            Load More Partners
          </button>
        </div>
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
      <GroupDetailsModal open={showModal} onClose={() => setShowModal(false)} group={selectedGroup} />
    </div>
  );
}

function JoinGroupPage() {
  // Modal state (must be at the top)
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Filter state
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest First");
  const [showFilters, setShowFilters] = useState(false);
  const [course, setCourse] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [format, setFormat] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Example subject list
  const allSubjects = [
    "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Business", "Engineering", "Economics", "Psychology"
  ];
  const allFormats = ["In-person", "Virtual", "Hybrid"];
  const sortOptions = ["Newest First", "Oldest First", "Most Members", "A-Z", "Z-A"];

  // For demo, all groups are shown
  const filteredGroups = mockGroups;
  const totalGroups = mockGroups.length;
  const shownGroups = filteredGroups.length;

  // Helper for format badge
  function getFormatBadge(group) {
    // For demo, alternate formats
    const idx = group.id % 3;
    if (idx === 0) return { label: "Virtual", color: "bg-blue-100 text-blue-700" };
    if (idx === 1) return { label: "Hybrid", color: "bg-pink-100 text-pink-700" };
    return { label: "In person", color: "bg-green-100 text-green-700" };
  }

  // Breadcrumb for JoinGroupPage
  const location = useLocation();
  const showBreadcrumb = location.pathname === '/studypartner/join';

  return (
    <div className="max-w-[1400px] mx-auto w-full py-6 px-2 md:px-8">
      {showBreadcrumb && (
        <nav className="flex items-center text-sm text-gray-500 mb-4 gap-1">
          <Link to="/" className="hover:underline text-gray-500">Home</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
          <Link to="/studypartner" className="hover:underline text-gray-500">Study Partner</Link>
          <ChevronRightIcon className="w-4 h-4 mx-1 text-gray-400" />
          <span className="text-gray-700 font-medium">Join Group</span>
        </nav>
      )}
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex-1 flex items-center gap-2">
          <div className="relative w-full max-w-md">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-200 font-inter"
              placeholder="Search by group name, course, or subject"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="rounded-lg border border-gray-200 py-2 px-4 text-base font-inter bg-white"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md border font-semibold transition ${showFilters ? 'bg-purple-50 border-purple-300 text-purple-700' : 'bg-white border-gray-200 text-gray-700'} ml-2`}
            onClick={() => setShowFilters(v => !v)}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" /> Filters
          </button>
        </div>
      </div>
      {/* Collapsible Advanced Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow p-6 mb-8 flex flex-col gap-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Course</label>
              <select className="rounded-lg border border-gray-200 py-2 px-4 text-base w-full" value={course} onChange={e => setCourse(e.target.value)}>
                <option value="">Select course</option>
                {mockGroups.map(g => <option key={g.course}>{g.course}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meeting Time</label>
              <select className="rounded-lg border border-gray-200 py-2 px-4 text-base w-full" value={meetingTime} onChange={e => setMeetingTime(e.target.value)}>
                <option value="">Select time</option>
                <option>Morning</option><option>Afternoon</option><option>Evening</option>
              </select>
            </div>
            <div />
            <div>
              <div className="font-semibold mb-2">Study Format</div>
              {allFormats.map(f => (
                <label key={f} className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked={format.includes(f)} onChange={() => setFormat(format.includes(f) ? format.filter(x => x !== f) : [...format, f])} /> {f}
                </label>
              ))}
            </div>
            <div>
              <div className="font-semibold mb-2">Subjects</div>
              {allSubjects.map(s => (
                <label key={s} className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked={subjects.includes(s)} onChange={() => setSubjects(subjects.includes(s) ? subjects.filter(x => x !== s) : [...subjects, s])} /> {s}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-md">Clear All</button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md">Apply Filters</button>
          </div>
        </div>
      )}
      {/* Banner */}
      <div className="w-full rounded-sm overflow-hidden mb-10 relative shadow-lg bg-gradient-to-br from-mint-200 to-blue-100 px-0">
        <div className="relative h-[220px] md:h-[240px]">
          <img src='https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80' alt='Library' className="absolute inset-0 w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-10 py-10 md:py-16">
            <h2 className="text-white text-2xl md:text-3xl font-normal mb-2">Find Your Perfect Study Group</h2>
            <p className="text-white text-base md:text-lg font-normal mb-1">Join a study group that matches your academic interests, schedule, and learning style.</p>
            <p className="text-white text-base md:text-lg font-normal mb-6">Collaborate with peers, share knowledge, and achieve your academic goals together.</p>
            <div className="flex gap-3 mt-1">
              <button className="bg-mint-500 hover:bg-mint-600 text-white font-normal px-4 py-2 rounded-md text-base border border-mint-700 flex items-center gap-2 transition">
                <PlusIcon className="w-5 h-5" /> Create New Group
              </button>
              <button className="bg-white/90 hover:bg-white text-gray-900 border border-mint-500 font-normal px-4 py-2 rounded-md text-base flex items-center gap-2 transition">
                <UsersIcon className="w-5 h-5 text-mint-500" /> My Groups
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Study Groups Grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900">Available Study Groups</h3>
          <span className="text-sm text-gray-500">Showing {shownGroups} of {totalGroups} groups</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGroups.map((group) => {
            const badge = getFormatBadge(group);
            return (
              <div key={group.id} className="flex flex-row bg-white border border-gray-200 rounded-2xl shadow overflow-hidden min-h-[220px] md:min-h-[290px]">
                {/* Left: Image with badge */}
                <div className="relative w-[35%] min-h-[180px] flex-shrink-0">
                  <img src={group.image} alt={group.name} className="absolute inset-0 w-full h-full object-cover object-center" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${badge.color}`}>
                    {badge.label === 'Virtual' && <DevicePhoneMobileIcon className="w-4 h-4" />}
                    {badge.label === 'In person' && <UsersIcon className="w-4 h-4" />}
                    {badge.label === 'Hybrid' && <ArrowsRightLeftIcon className="w-4 h-4" />}
                    {badge.label}
                  </span>
                </div>
                {/* Right: Content */}
                <div className="w-[65%] flex flex-col p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{group.name}</h3>
                    <span className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-xs font-semibold text-gray-700">{group.memberCount} / {group.memberLimit} members</span>
                  </div>
                  <div className="text-gray-500 text-sm mb-1">{group.course}</div>
                  <div className="flex items-center text-purple-500 text-sm mb-2 gap-2">
                    <CalendarDaysIcon className="w-4 h-4 mr-1" />
                    <span>{group.nextMeeting}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {group.tags.map((tag) => (
                      <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-auto mb-2">
                    <img src={group.admin.avatar} alt={group.admin.name} className="w-8 h-8 rounded-full border-2 border-white shadow" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Group Admin</span>
                      <span className="text-sm font-semibold text-gray-900">{group.admin.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto flex items-center gap-1"><ClockIcon className="w-4 h-4" />Active {group.lastActive}</span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      className="flex items-center gap-2 bg-white border border-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-md text-sm shadow-sm hover:bg-gray-50 transition"
                      onClick={() => { setSelectedGroup(group); setShowModal(true); }}
                    >
                      <EyeIcon className="w-5 h-5" />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md text-sm shadow-sm transition">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6 0a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
                      Request to Join
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="mx-auto mt-6 block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md border border-gray-300">Load More Groups</button>
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
      <GroupDetailsModal open={showModal} onClose={() => setShowModal(false)} group={selectedGroup} />
    </div>

  );
}

// Group Details Modal
function GroupDetailsModal({ open, onClose, group }) {
  if (!group) return null;
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-8 animate-fade-in">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{group.name}</h2>
          <div className="text-md text-gray-500 mb-4">{group.course}</div>
          <div className="mb-4">
            <div className="font-semibold text-gray-800 mb-1">Description</div>
            <div className="text-gray-700 mb-2">{group.description || 'Collaborative learning group focused on solving complex problems and deepening theoretical understanding. We work through textbook problems, discuss concepts, and prepare for exams together.'}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <div className="font-semibold text-gray-800 mb-1">Schedule</div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-purple-600"><CalendarDaysIcon className="w-5 h-5" /> Wednesdays, 2:00 PM - 4:00 PM</div>
                <div className="flex items-center gap-2 text-purple-600"><CalendarDaysIcon className="w-5 h-5" /> Fridays, 3:00 PM - 5:00 PM</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-800 mb-1">Location</div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-purple-600"><MapPinIcon className="w-5 h-5" /> Physics Building Lab 101</div>
                <div className="flex items-center gap-2 text-purple-600"><MapPinIcon className="w-5 h-5" /> Science Center Study Area</div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-gray-800 mb-1">Members ({group.memberCount}/{group.memberLimit})</div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <img src={group.admin.avatar} alt={group.admin.name} className="w-8 h-8 rounded-full" />
                <span className="font-semibold text-gray-900">{group.admin.name}</span>
                <span className="bg-mint-400 text-white text-xs font-semibold px-2 py-0.5 rounded">Admin</span>
              </div>
              {/* Example member */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ava Thompson" className="w-8 h-8 rounded-full" />
                <span className="text-gray-900">Ava Thompson</span>
              </div>
              <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm">+4 more</span>
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold text-gray-800 mb-1">Subjects</div>
            <div className="flex flex-wrap gap-2">
              {group.tags.map(tag => (
                <span key={tag} className="bg-purple-50 text-purple-700 border border-purple-200 rounded-lg px-3 py-1 text-xs font-semibold">{tag}</span>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md text-base shadow transition mt-2 ml-auto">
            <UserPlusIcon className="w-5 h-5" /> Request to Join
          </button>
        </div>
      </Dialog>
    </Transition>
  );
}

export default StudyPartner;