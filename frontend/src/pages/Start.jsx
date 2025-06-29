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
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";

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
                    src={"/image.png"}
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

const StatsSection = () => {
    // MyCollegeMate project stats
    const stats = [
        {
            value: '50+',
            label: 'Active Clubs',
            icon: null,
        },
        {
            value: '200+',
            label: 'Events Hosted',
            icon: (
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-purple-700 via-pink-500 to-yellow-400 shadow-lg mb-4">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#fff" strokeWidth="2" /><path d="M16 3v4M8 3v4M3 9h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
            ),
        },
        {
            value: '1,000+',
            label: 'Study Partners Matched',
            icon: (
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-600 via-blue-500 to-purple-400 shadow-lg mb-4">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="#fff" strokeWidth="2" /><path d="M23 20v-2a4 4 0 00-3-3.87" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="17" cy="7" r="4" stroke="#fff" strokeWidth="2" /></svg>
                </span>
            ),
        },
        {
            value: '5,000+',
            label: 'Resources Shared',
            icon: (
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-500 via-orange-400 to-pink-500 shadow-lg mb-4">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#fff" strokeWidth="2" /><path d="M8 2v4M16 2v4M4 10h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
            ),
        },
    ];

    return (
        <section className="w-full bg-[#f7f6f4] py-16 flex flex-col items-center justify-center">
            {/* Line and dots as background */}

            {/* Stats Grid */}
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 text-center relative z-20">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        {/* Icon (except first, which has avatars above) */}
                        {i !== 0 && stat.icon}
                        <div className={`text-4xl md:text-5xl font-bold mb-2 ${i !== 0 ? '' : 'mt-8'}`}>{stat.value}</div>
                        <div className="text-lg text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

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
            name: "Review",
            link: "#review",
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
                <StatsSection />
                <Features />
                <About />
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
function AnimatedGradientTextDemo() {
    return (
        <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] mb-6">
            <span
                className={cn(
                    "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
                )}
                style={{
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                    WebkitClipPath: "padding-box",
                }}
            />
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
            <AnimatedGradientText className="text-sm font-medium">
                100K+ College Connection
            </AnimatedGradientText>
            <ChevronRight
                className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            />
        </div>
    );
}
function RainbowButtonDemo() {
    return <RainbowButton>Get Started <ChevronRight
                className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            /></RainbowButton>;
}
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
            <section id="home" className="h-[60vh] mt-10 flex flex-col justify-center items-center text-center px-4 relative z-10 font-[Roboto]">
                {/* Tagline Badge */}
                <AnimatedGradientTextDemo />
                {/* Main Heading */}
                <h1 className="font-[Roboto] text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white drop-shadow-lg">
                    College Life, <span className="text-primary">Simplified</span> and <span className="text-primary">Empowered</span>
                </h1>
                {/* Subheading */}
                <p className="font-[Roboto] text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                    Explore clubs, find study partners, attend events, and access campus life—all in one platform built for students.
                </p>
                {/* CTA Button */}
                <div className="mb-2"><RainbowButtonDemo /></div>
                {/* Optional Rating */}
                <div className="flex items-center justify-center gap-2 mt-8 text-gray-700 dark:text-gray-200 text-base font-[Roboto]">
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

                        {/* Locomotive Scroll Images */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
                                alt="Student Dashboard 1"
                                className="absolute left-0 top-10 w-2/3 rounded-xl shadow-xl border-4 border-white dark:border-neutral-900"
                                data-scroll
                                data-scroll-speed="2"
                                style={{ zIndex: 5 }}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
                                alt="Student Dashboard 2"
                                className="absolute right-0 bottom-10 w-2/3 rounded-xl shadow-xl border-4 border-white dark:border-neutral-900"
                                data-scroll
                                data-scroll-speed="-2"
                                style={{ zIndex: 4 }}
                            />
                        </div>
                        {/* Avatar Cluster */}

                    </div>
                </div>
            </div>
        </section>
    );
};
const Contact = () => {
    return (
        <>
            <section id="contact" className="py-24 bg-white/80 pt-0 dark:bg-neutral-900/80 flex flex-col items-center text-center px-4 relative overflow-hidden">
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
        </>
    );
};
const About = () => {
    return (
        <section id="about" className="py-24 bg-white/80 dark:bg-neutral-900/80 flex flex-col items-center text-center px-4 relative overflow-hidden">
            {/* Noise Layer */}
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                <Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 dark:text-white relative z-10">What Students & Faculty Say</h2>
            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-left relative z-10">
                {/* 10X Campus Engagement */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 flex flex-col items-start justify-between min-h-[160px] md:col-span-1">
                    <div className="text-3xl font-bold mb-2">10X</div>
                    <div className="text-gray-700 mb-4">Campus Engagement</div>
                    <div className="mt-auto text-2xl font-black tracking-widest text-orange-400">🎓</div>
                </div>
                {/* 2X Faster Event Registrations */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 flex flex-col items-start justify-between min-h-[160px] md:col-span-1">
                    <div className="text-3xl font-bold mb-2">2X</div>
                    <div className="text-gray-700 mb-4">Faster Event Registrations</div>
                    <div className="mt-auto text-2xl font-black tracking-widest text-purple-400">🎉</div>
                </div>
                {/* Testimonial 1 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col justify-between min-h-[160px] md:col-span-2">
                    <div className="text-gray-800 mb-4">“MyCollegeMate made it so easy to join clubs and attend events. I never miss out now!”</div>
                    <div className="flex items-center gap-3 mt-auto">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Aarav Sharma" className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="font-semibold text-sm">Aarav Sharma</div>
                            <div className="text-xs text-gray-500">Student</div>
                        </div>
                    </div>
                </div>
                {/* Testimonial 2 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col justify-between min-h-[160px] md:col-span-2">
                    <div className="text-gray-800 mb-4">“With MyCollegeMate, managing my club is a breeze. Communication and event planning are seamless.”</div>
                    <div className="flex items-center gap-3 mt-auto">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya Verma" className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="font-semibold text-sm">Priya Verma</div>
                            <div className="text-xs text-gray-500">Club President</div>
                        </div>
                    </div>
                </div>
                {/* Testimonial 3 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col justify-between min-h-[160px] md:col-span-2">
                    <div className="text-gray-800 mb-4">“Study Partner feature helped me find the perfect study buddy for finals!”</div>
                    <div className="flex items-center gap-3 mt-auto">
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Rohan Patel" className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="font-semibold text-sm">Rohan Patel</div>
                            <div className="text-xs text-gray-500">Student</div>
                        </div>
                    </div>
                </div>
                {/* 5X More Study Groups Formed */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col items-start justify-between min-h-[160px] md:col-span-1">
                    <div className="text-3xl font-bold mb-2">5X</div>
                    <div className="text-gray-700 mb-4">More Study Groups Formed</div>
                    <div className="mt-auto text-2xl font-black tracking-widest text-green-400">🤝</div>
                </div>
                {/* Testimonial 4 */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col justify-between min-h-[160px] md:col-span-2">
                    <div className="text-gray-800 mb-4">“Resource sharing is so simple now. Notes, slides, and more—all in one place.”</div>
                    <div className="flex items-center gap-3 mt-auto">
                        <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Meera Singh" className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="font-semibold text-sm">Meera Singh</div>
                            <div className="text-xs text-gray-500">Student</div>
                        </div>
                    </div>
                </div>
                {/* 3X Increase in Student Collaboration */}
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 flex flex-col items-start justify-between min-h-[160px] md:col-span-1">
                    <div className="text-3xl font-bold mb-2">3X</div>
                    <div className="text-gray-700 mb-4">Increase in Student Collaboration</div>
                    <div className="mt-auto text-2xl font-black tracking-widest text-pink-400">👥</div>
                </div>
            </div>
        </section>
    );
};