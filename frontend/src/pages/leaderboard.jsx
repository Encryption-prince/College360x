import React, { useState } from 'react';

function App() {
const [activeTab, setActiveTab] = useState('Academics');
const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
const [currentLevel, setCurrentLevel] = useState(5);
const [userXP, setUserXP] = useState(1250);
const [maxXP, setMaxXP] = useState(2000);
const leaderboardData = {
Academics: [
{ id: 1, name: 'Alice Wonderland', xp: 25000, streak: 305, rank: 1, badges: ['math', 'science'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20short%20dark%20hair%20and%20friendly%20smile%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=alice123&orientation=squarish' },
{ id: 2, name: 'Bob The Builder', xp: 22000, streak: 180, rank: 2, badges: ['engineering', 'physics'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20man%20with%20brown%20hair%20and%20glasses%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=bob456&orientation=squarish' },
{ id: 3, name: 'Charlie Chaplin', xp: 19000, streak: 90, rank: 3, badges: ['literature', 'history'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20man%20with%20dark%20hair%20and%20friendly%20smile%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=charlie789&orientation=squarish' },
{ id: 4, name: 'Diana Prince', xp: 15000, streak: 60, rank: 4, badges: ['chemistry'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20long%20dark%20hair%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=diana101&orientation=squarish' },
],
Sports: [
{ id: 1, name: 'Michael Jordan', xp: 28000, streak: 250, rank: 1, badges: ['basketball', 'athletics'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20athletic%20man%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=michael202&orientation=squarish' },
{ id: 2, name: 'Serena Williams', xp: 26500, streak: 210, rank: 2, badges: ['tennis', 'fitness'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20athletic%20woman%20with%20confident%20expression%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=serena303&orientation=squarish' },
{ id: 3, name: 'Usain Bolt', xp: 24000, streak: 180, rank: 3, badges: ['running', 'track'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20athletic%20man%20with%20short%20hair%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=usain404&orientation=squarish' },
{ id: 4, name: 'Alex Morgan', xp: 21000, streak: 150, rank: 4, badges: ['soccer'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20athletic%20woman%20with%20ponytail%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=alex505&orientation=squarish' },
],
Clubs: [
{ id: 1, name: 'Daniel Lee', xp: 23000, streak: 200, rank: 1, badges: ['debate', 'leadership'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20man%20with%20glasses%20and%20neat%20appearance%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=daniel606&orientation=squarish' },
{ id: 2, name: 'Isabella Garcia', xp: 21500, streak: 175, rank: 2, badges: ['chess', 'strategy'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20thoughtful%20expression%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=isabella707&orientation=squarish' },
{ id: 3, name: 'Ethan Wright', xp: 19500, streak: 120, rank: 3, badges: ['robotics', 'coding'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20man%20with%20tech-savvy%20appearance%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=ethan808&orientation=squarish' },
{ id: 4, name: 'Ava Robinson', xp: 17000, streak: 90, rank: 4, badges: ['art'], avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20creative%20style%2C%20gradient%20purple%20background%2C%20high%20quality%2C%20photorealistic%2C%208k&width=100&height=100&seq=ava909&orientation=squarish' },
]
};
const userStats = {
totalXP: 1250,
currentRank: 57,
dayStreak: 21,
badgesEarned: 3,
level: 5,
badges: [
{ id: 1, name: 'Event Master', icon: 'trophy' },
{ id: 2, name: 'Study Guru', icon: 'book' },
{ id: 3, name: 'Social Butterfly', icon: 'users' }
],
topActivities: [
{ name: 'Event Participation', points: 120, icon: 'calendar-check' },
{ name: 'Material Uploads', points: 85, icon: 'file-upload' },
{ name: 'Club Activity', points: 70, icon: 'users' },
{ name: 'Study Group Sessions', points: 60, icon: 'user-friends' }
]
};
const studyMaterials = [
{
id: 1,
title: 'Introduction to Calculus I',
subject: 'Mathematics',
uploadedBy: 'Professor A. Johnson',
date: '2024-04-10',
type: 'PDF'
},
{
id: 2,
title: 'Biology Lab Manual 2024',
subject: 'Biology',
uploadedBy: 'Student Research Group',
date: '2024-04-09',
type: 'PDF'
},
{
id: 3,
title: 'Chemistry Midterm Review',
subject: 'Chemistry',
uploadedBy: 'Dr. S. Lee',
date: '2024-04-08',
type: 'PPT'
}
];
const getBadgeIcon = badgeName => {
const badgeIcons = {
'math': 'calculator',
'science': 'flask',
'engineering': 'hammer',
'physics': 'atom',
'literature': 'book',
'history': 'landmark',
'chemistry': 'vial',
'basketball': 'basketball-ball',
'athletics': 'running',
'tennis': 'table-tennis',
'fitness': 'dumbbell',
'running': 'running',
'track': 'stopwatch',
'soccer': 'futbol',
'debate': 'comments',
'leadership': 'crown',
'chess': 'chess',
'strategy': 'chess-knight',
'robotics': 'robot',
'coding': 'code',
'art': 'paint-brush'
};
return badgeIcons[badgeName] || 'award';
};
const getGradientByRank = rank => {
switch(rank) {
case 1:
return 'from-purple-700 to-blue-500';
case 2:
return 'from-purple-600 to-blue-400';
case 3:
return 'from-purple-500 to-blue-300';
default:
return 'from-purple-400 to-blue-200';
}
};
const getFileIcon = fileType => {
switch(fileType) {
case 'PDF':
return 'file-pdf';
case 'PPT':
return 'file-powerpoint';
case 'DOC':
return 'file-word';
default:
return 'file';
}
};
const getFileColor = fileType => {
switch(fileType) {
case 'PDF':
return 'text-red-500';
case 'PPT':
return 'text-orange-500';
case 'DOC':
return 'text-blue-500';
default:
return 'text-gray-500';
}
};
return (
<div className="min-h-screen bg-gray-50">

{/* Main Content */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/* Student of the Year Section */}
<div className="mb-12 bg-gradient-to-r from-purple-900 to-indigo-800 rounded-xl shadow-2xl overflow-hidden">
<div className="relative">
<div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
<i className="fas fa-trophy text-9xl text-white absolute top-1/2 right-12 transform -translate-y-1/2"></i>
</div>
<div className="p-8">
<div className="flex items-center mb-6">
<div className="flex-shrink-0">
<img
src="https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20successful%20college%20student%20with%20confident%20smile%2C%20wearing%20graduation%20cap%2C%20elegant%20pose%2C%20gradient%20background%2C%20high%20quality%2C%20photorealistic&width=150&height=150&seq=student2024&orientation=squarish"
alt="Student of the Year"
className="h-24 w-24 rounded-full border-4 border-amber-400 object-cover shadow-xl"
/>
</div>
<div className="ml-6">
<div className="text-amber-400 text-sm font-semibold mb-1">Student of the Year 2024</div>
<h2 className="text-3xl font-bold text-white mb-2">Emma Thompson</h2>
<div className="flex items-center space-x-4">
<span className="text-indigo-200">Computer Science</span>
<span className="text-indigo-200">•</span>
<span className="text-indigo-200">45,000 XP</span>
<span className="text-indigo-200">•</span>
<span className="text-indigo-200">365 Day Streak</span>
</div>
</div>
<div className="ml-auto flex items-center space-x-4">
<div className="text-center">
<div className="text-4xl font-bold text-amber-400">12</div>
<div className="text-indigo-200 text-sm">Badges</div>
</div>
<div className="text-center">
<div className="text-4xl font-bold text-amber-400">98%</div>
<div className="text-indigo-200 text-sm">Success Rate</div>
</div>
</div>
</div>
<div className="flex space-x-3">
{['Research Excellence', 'Leadership', 'Innovation', 'Academic Achievement'].map((badge) => (
<span key={badge} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">{badge}</span>
))}
</div>
</div>
</div>
</div>
{/* Page Header */}
<div className="mb-8">
<h1 className="text-3xl font-bold text-gray-900">Gamified Leaderboard</h1>
<p className="mt-2 text-gray-600">
See how you stack up against your peers in various campus activities and earn your spot at the top!
</p>
</div>
<div className="flex flex-col lg:flex-row gap-8">
{/* Leaderboard Section */}
<div className="lg:w-2/3">
{/* Period Toggle */}
<div className="flex justify-between items-center mb-6">
<div className="flex space-x-2 bg-gray-100 p-1 rounded-full">
{['Weekly', 'Monthly', 'Yearly'].map((period) => (
<button
key={period}
onClick={() => setSelectedPeriod(period)}
className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer whitespace-nowrap
${selectedPeriod === period
? 'bg-amber-400 text-amber-900 shadow-sm'
: 'text-gray-500 hover:text-gray-700'
}`}
>
{period}
</button>
))}
</div>
<div className="flex space-x-2">
{/* Category Tabs */}
<div className="hidden md:flex space-x-2">
{['Academics', 'Sports', 'Clubs'].map((tab) => (
<button
key={tab}
onClick={() => setActiveTab(tab)}
className={`px-4 py-2 text-sm font-medium rounded-button cursor-pointer whitespace-nowrap
${activeTab === tab
? 'bg-indigo-100 text-indigo-700'
: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
}`}
>
{tab === 'Academics' && <i className="fas fa-graduation-cap mr-2"></i>}
{tab === 'Sports' && <i className="fas fa-running mr-2"></i>}
{tab === 'Clubs' && <i className="fas fa-users mr-2"></i>}
{tab}
</button>
))}
</div>
{/* Mobile dropdown for categories */}
<div className="md:hidden">
<select
value={activeTab}
onChange={(e) => setActiveTab(e.target.value)}
className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-button"
>
<option value="Academics">Academics</option>
<option value="Sports">Sports</option>
<option value="Clubs">Clubs</option>
</select>
</div>
</div>
</div>
{/* Leaderboard Cards */}
<div className="space-y-4">
{leaderboardData[activeTab].map((student) => (
<div
key={student.id}
className={`bg-gradient-to-r ${getGradientByRank(student.rank)} rounded-lg shadow-md overflow-hidden cursor-pointer`}
>
<div className="p-4 md:p-6 flex items-center">
<div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white text-2xl font-bold text-indigo-600">
{student.rank}
</div>
<div className="ml-4 flex-shrink-0">
<img
src={student.avatar}
alt={student.name}
className="h-16 w-16 rounded-full border-2 border-white object-cover"
/>
</div>
<div className="ml-4 flex-1">
<h3 className="text-xl font-bold text-white">{student.name}</h3>
<div className="flex items-center mt-1">
<span className="text-indigo-100">{student.streak} Day Streak</span>
<div className="ml-4 flex space-x-2">
{student.badges.map((badge, index) => (
<div key={index} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center" title={badge}>
<i className={`fas fa-${getBadgeIcon(badge)} text-white`}></i>
</div>
))}
</div>
</div>
</div>
<div className="ml-4 text-right">
<div className="text-2xl font-bold text-white">{student.xp.toLocaleString()} XP</div>
<div className="w-full bg-white/30 rounded-full h-2 mt-2">
<div className="bg-white h-2 rounded-full" style={{ width: '100%' }}></div>
</div>
</div>
<div className="ml-4 flex-shrink-0">
<div className="w-10 h-10 flex items-center justify-center">
<i className="fas fa-trophy text-2xl text-yellow-300"></i>
</div>
</div>
</div>
</div>
))}
</div>
</div>
{/* Stats Section */}
<div className="lg:w-1/3 space-y-6">
<div className="bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-lg p-6 border border-indigo-100">
<h2 className="text-xl font-bold text-gray-800 mb-4">My Stats</h2>
<div className="grid grid-cols-2 gap-4 mb-6">
<div className="flex items-start">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
<i className="fas fa-star"></i>
</div>
<div>
<div className="text-2xl font-bold text-gray-800">{userStats.totalXP}</div>
<div className="text-sm text-gray-500">Total XP</div>
</div>
</div>
<div className="flex items-start">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
<i className="fas fa-chart-line"></i>
</div>
<div>
<div className="text-2xl font-bold text-gray-800">{userStats.currentRank}</div>
<div className="text-sm text-gray-500">Current Rank</div>
</div>
</div>
<div className="flex items-start">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
<i className="fas fa-fire"></i>
</div>
<div>
<div className="text-2xl font-bold text-gray-800">{userStats.dayStreak}</div>
<div className="text-sm text-gray-500">Day Streak</div>
</div>
</div>
<div className="flex items-start">
<div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
<i className="fas fa-medal"></i>
</div>
<div>
<div className="text-2xl font-bold text-gray-800">{userStats.badgesEarned}</div>
<div className="text-sm text-gray-500">Badges Earned</div>
</div>
</div>
</div>
<h3 className="font-medium text-gray-700 mb-2">Level {userStats.level}</h3>
<div className="w-full bg-gray-200 rounded-full h-3 mb-6">
<div
className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full"
style={{ width: `${(userXP / maxXP) * 100}%` }}
></div>
</div>
<div className="text-sm text-gray-500 text-right">{userXP} / {maxXP} XP to next level</div>
<h3 className="font-medium text-gray-700 mt-6 mb-3">My Badges</h3>
<div className="flex justify-center space-x-4 mb-6">
{userStats.badges.map((badge) => (
<div key={badge.id} className="flex flex-col items-center">
<div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-1">
<i className={`fas fa-${badge.icon} text-xl`}></i>
</div>
<span className="text-xs text-gray-500">{badge.name}</span>
</div>
))}
</div>
</div>
<div className="bg-gradient-to-br from-white to-amber-50 rounded-lg shadow-lg p-6 border border-amber-100">
<h2 className="text-xl font-bold text-gray-800 mb-4">Top Activities</h2>
<div className="space-y-4">
{userStats.topActivities.map((activity, index) => (
<div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white mr-3">
<i className={`fas fa-${activity.icon} text-lg`}></i>
</div>
<span className="text-gray-700 font-medium">{activity.name}</span>
</div>
<div className="flex items-center">
<span className="font-bold text-amber-600">{activity.points}</span>
<span className="ml-2 text-amber-400 text-sm">pts</span>
</div>
</div>
))}
</div>
</div>
</div>
</div>
</main>
</div>
);
};
export default App