import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "../components/ui/resizable-navbar";
import Noise from '../components/ui/Noise';
import { ContainerScroll } from "../components/ui/container-scroll-animation";

// Import dashboard images from assets
// import dashboardMock1 from "./assets/news.jpg";
// import dashboardMock2 from "./assets/calender.jpg";

// Ellipse colors
const ellipseColors = [
    '#ff2f2f', // red
    '#ef7b16', // orange
    '#8a43e1', // purple
    '#d511fd', // magenta
];

// Ellipse style
const ellipseStyle = (color, left, top) => ({
    width: 207,
    height: 207,
    display: 'block',
    filter: 'blur(100px)',
    WebkitFilter: 'blur(100px)',
    backgroundColor: color,
    aspectRatio: '1 / 1',
    position: 'absolute',
    borderRadius: '100%',
    left,
    top,
    pointerEvents: 'none',
});

// Parent style
const parentStyle = (left, right, extra = {}) => ({
    width: 378,
    height: 571,
    display: 'block',
    filter: 'blur(2px)',
    WebkitFilter: 'blur(2px)',
    overflow: 'visible',
    gap: 0,
    position: 'absolute',
    borderRadius: 0,
    left,
    right,
    top: 0,
    pointerEvents: 'none',
    zIndex: -1,
    ...extra,
});

// Subcontainer style
const subContainerStyle = (left, top, extra = {}) => ({
    width: 420,
    height: 571,
    display: 'block',
    overflow: 'visible',
    gap: 0,
    position: 'absolute',
    borderRadius: 0,
    left,
    top,
    pointerEvents: 'none',
    ...extra,
});

// HeroScrollDemo component for animated hero section
function HeroScrollDemo() {
    return (
        <div className="flex flex-col overflow-hidden -mt-10">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-black dark:text-white">
                            Unleash the power of <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Scroll Animations
                            </span>
                        </h1>
                    </>
                }
            >
                <img
                    src={"../pages/image.png"}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}

export default function NavbarDemo() {
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            link: "#home",
        },
        {
            name: "Features",
            link: "#features",
        },
        {
            name: "About",
            link: "#about",
        },
        {
            name: "Contact",
            link: "#contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Background Layer: fixed, behind all content */}

            {/* Main Content: scrollable as normal */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar>
                    {/* Desktop Navigation */}
                    <NavBody>
                        <NavbarLogo />
                        <NavItems items={navItems} />
                        <div className="flex items-center gap-4">
                            <NavbarButton variant="secondary" onClick={() => navigate('/student-login')}>Login</NavbarButton>
                            <NavbarButton variant="primary" onClick={() => navigate('/student-signup')}>Sign Up</NavbarButton>
                        </div>
                    </NavBody>

                    {/* Mobile Navigation */}
                    <MobileNav>
                        <MobileNavHeader>
                            <NavbarLogo />
                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </MobileNavHeader>

                        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                            {navItems.map((item, idx) => (
                                <a
                                    key={`mobile-link-${idx}`}
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="relative text-neutral-600 dark:text-neutral-300"
                                >
                                    <span className="block">{item.name}</span>
                                </a>
                            ))}
                            <div className="flex w-full flex-col gap-4">
                                <NavbarButton
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Login
                                </NavbarButton>
                                <NavbarButton
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Sign Up
                                </NavbarButton>
                            </div>
                        </MobileNavMenu>
                    </MobileNav>
                </Navbar>
                {/* Insert HeroScrollDemo above Home */}
                <Home />
                <HeroScrollDemo />
                <About />
                <Features />
                <Contact />
            </div>
        </>
    );
}

const DummyContent = () => {
    return (
        <div className="container mx-auto p-8 pt-24">
            <h1 className="mb-4 text-center text-3xl font-bold">
                Check the navbar at the top of the container
            </h1>
            <p className="mb-10 text-center text-sm text-zinc-500">
                For demo purpose we have kept the position as{" "}
                <span className="font-medium">Sticky</span>. Keep in mind that this
                component is <span className="font-medium">fixed</span> and will not
                move when scrolling.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {[
                    {
                        id: 1,
                        title: "The",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 2,
                        title: "First",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 3,
                        title: "Rule",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 4,
                        title: "Of",
                        width: "md:col-span-3",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 5,
                        title: "F",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 6,
                        title: "Club",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 7,
                        title: "Is",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 8,
                        title: "You",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 9,
                        title: "Do NOT TALK about",
                        width: "md:col-span-2",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                    {
                        id: 10,
                        title: "F Club",
                        width: "md:col-span-1",
                        height: "h-60",
                        bg: "bg-neutral-100 dark:bg-neutral-800",
                    },
                ].map((box) => (
                    <div
                        key={box.id}
                        className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`}
                    >
                        <h2 className="text-xl font-medium">{box.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <>

            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                    pointerEvents: 'none',
                    WebkitMask: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 37%)',
                    mask: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 37%)',
                    backgroundColor: '#f4f2f1',
                    flex: 'none',
                    gap: 0,
                    top: 0,
                }}
            >
                {/* 1. Left Parent Ellipse Layer */}
                <div style={parentStyle(0, undefined)}>
                    <div style={subContainerStyle(0, 0)}>
                        <div style={ellipseStyle(ellipseColors[0], 0, 0)} />
                        <div style={ellipseStyle(ellipseColors[1], 100, 120)} />
                        <div style={ellipseStyle(ellipseColors[2], 50, 300)} />
                        <div style={ellipseStyle(ellipseColors[3], 180, 200)} />
                    </div>
                    <div style={subContainerStyle(60, 300)}>
                        <div style={ellipseStyle(ellipseColors[1], 60, 60)} />
                        <div style={ellipseStyle(ellipseColors[2], 180, 180)} />
                        <div style={ellipseStyle(ellipseColors[3], 120, 320)} />
                        <div style={ellipseStyle(ellipseColors[0], 0, 400)} />
                    </div>
                </div>
                {/* 2. Right Parent Ellipse Layer */}
                <div style={parentStyle(undefined, 0, { transform: 'rotate(180deg)' })}>
                    <div style={subContainerStyle(0, 0, { transform: 'rotate(-25deg)' })}>
                        <div style={ellipseStyle(ellipseColors[2], 120, 0)} />
                        <div style={ellipseStyle(ellipseColors[3], 0, 120)} />
                        <div style={ellipseStyle(ellipseColors[0], 180, 200)} />
                        <div style={ellipseStyle(ellipseColors[1], 60, 320)} />
                    </div>
                    <div style={subContainerStyle(60, 300)}>
                        <div style={ellipseStyle(ellipseColors[3], 60, 60)} />
                        <div style={ellipseStyle(ellipseColors[0], 180, 180)} />
                        <div style={ellipseStyle(ellipseColors[1], 120, 320)} />
                        <div style={ellipseStyle(ellipseColors[2], 0, 400)} />
                    </div>
                </div>
                {/* 3. Top Gradient Layer */}
                <div
                    style={{
                        background: 'linear-gradient(180deg, #f2f0ee, #f2f0ee00)',
                        flex: 'none',
                        height: 415,
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        pointerEvents: 'none',
                    }}
                />
                {/* 4. Vertical Lines Layer */}
                <div className="w-full h-full flex flex-row items-center justify-between pointer-events-none" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'visible' }}>
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 h-full relative border-r border-white/10 backdrop-blur-[25px]"
                            style={{
                                background: 'linear-gradient(270deg, #f2f0ee33, #f2f0ee00)',
                                width: '1px',
                                minWidth: '1px',
                                maxWidth: '1fr',
                            }}
                        />
                    ))}
                </div>
                {/* 5. Bottom Gradient Layer */}
                <div
                    style={{
                        background: 'linear-gradient(180deg, #f2f0ee00, #f2f0ee)',
                        flex: 'none',
                        inset: 0,
                        position: 'absolute',
                        pointerEvents: 'none',
                    }}
                />
                {/* 6. Noise Layer (Canvas) */}
                <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
                </div>
            </div>
            <section id="home" className="h-[60vh] mt-10 flex flex-col justify-center items-center text-center px-4 relative z-10">
                {/* Tagline Badge */}
                <div className="inline-block mb-6 px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm font-semibold shadow-md animate-fade-in">
                    <span className="font-bold">100K+</span> College Connections Built with <span className="font-bold">CampusConnect</span>
                </div>
                {/* Main Heading */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white drop-shadow-lg">
                    College Life, <span className="text-primary">Simplified</span> and <span className="text-primary">Empowered</span>
                </h1>
                {/* Subheading */}
                <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                    Explore clubs, find study partners, attend events, and access campus life—all in one platform built for students.
                </p>
                {/* CTA Button */}
                <a href="#features" className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-primary-dark transition">
                    Get Started Free
                </a>
                {/* Optional Rating */}
                <div className="flex items-center justify-center gap-2 mt-8 text-gray-700 dark:text-gray-200 text-base">
                    <span className="text-yellow-400 text-xl">⭐️⭐️⭐️⭐️⭐️</span>
                    <span className="ml-2 font-medium">4.8 rating</span>
                    <span className="text-gray-500 dark:text-gray-400">based on 200+ colleges</span>
                </div>
            </section>
        </>
    );
};
const Features = () => {
    return (
        <section id="features" className="py-24 bg-gray-50 dark:bg-neutral-800 flex flex-col items-center text-center px-4 relative overflow-hidden">
            {/* Noise Layer */}
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
            </div>
            <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                {/* Left: Feature Content */}
                <div className="flex-1 flex flex-col items-start text-left">
                    {/* Badge */}
                    <span className="mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow-md">Campus Essentials</span>
                    {/* Heading */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Everything You Need, Organized in One Place</h2>
                    {/* Subtext */}
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl">Simplify your college life. From events to academics, stay connected and in control with a single platform built for students.</p>
                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">🔍</span>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Event Tracker</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-base">Stay on top of upcoming campus events, workshops, and festivals with an intuitive calendar view.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">📚</span>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Study Material Organizer</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-base">Access shared notes, lecture slides, and organize your own study resources in one space.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">💬</span>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Collaborative Clubs</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-base">Interact with fellow members through updates, polls, and shared files—all within your joined clubs.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">🔔</span>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Smart Alerts</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-base">Get instant alerts for club meetings, exam schedules, and important college updates.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right: Visual Preview with Locomotive Scroll */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <div className="relative w-full max-w-2xl h-[32rem] md:h-[38rem] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-neutral-800 overflow-hidden p-8 flex flex-col justify-end">
                        {/* Dashboard Illustration Placeholder */}
                        {/* <div className="absolute top-4 left-4 flex gap-2 z-10">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Upcoming Fest</span>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Study Group</span>
                            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">Ragging Report</span>
                        </div> */}
                        {/* Locomotive Scroll Images */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
                                alt="Student Dashboard 1"
                                className="absolute left-0 top-10 w-full rounded-xl shadow-xl border-4 border-white dark:border-neutral-900"
                                data-scroll
                                data-scroll-speed="2"
                                style={{ zIndex: 5 }}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                                alt="Student Dashboard 2"
                                className="absolute right-0 bottom-10 w-2/3 rounded-xl shadow-xl z-10 border-4 border-white dark:border-neutral-900"
                                data-scroll
                                data-scroll-speed="-2"
                                style={{ zIndex: 7 }}
                            />
                        </div>
                        {/* Avatar Cluster */}
                        {/* <div className="flex items-center mt-8 z-10">
                            <div className="flex -space-x-2">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900" />
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900" />
                                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900" />
                                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-neutral-800 rounded-full border-2 border-white dark:border-neutral-900 text-xs font-semibold text-gray-700 dark:text-gray-200">+5</span>
                            </div>
                            <span className="ml-3 text-gray-600 dark:text-gray-300 text-sm">Collaborating now</span>
                        </div> */}
                        {/* UI Mockup Illustration Placeholder */}
                        {/* <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-tl-3xl opacity-40 pointer-events-none" /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};
const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-white/80 dark:bg-neutral-900/80 flex flex-col items-center text-center px-4 relative overflow-hidden">
            {/* Noise Layer */}
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">Contact Us</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10 relative z-10">
                Have questions or feedback? Reach out and we'll get back to you soon!
            </p>
            <form className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-8 flex flex-col gap-6 items-center relative z-10">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-primary-dark transition w-full"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
};
const About = () => {
    return (
        <section id="about" className="py-24 bg-white/80 dark:bg-neutral-900/80 flex flex-col items-center text-center px-4 relative overflow-hidden">
            {/* Noise Layer */}
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
            </div>
            <div className="text-5xl mb-4 relative z-10">🎓</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white relative z-10">About MyCollegeMate</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-2 relative z-10">
                MyCollegeMate is designed to simplify your campus life. We bring together all your college events, clubs, and resources in one place, making it easy to stay informed and get involved.
            </p>
        </section>
    );
};