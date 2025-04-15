import React, { useEffect, useState, useRef, useMemo } from "react";
import  WeatherButterflyChart  from "../app/charts/weather_chart"
import PieChartMakeUp from "@/app/charts/species_makeup_chart";

const MountainSceneParallax = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [isNightMode, setIsNightMode] = useState(false);
    const parallaxRef = useRef(null);
    const ticking = useRef(false);
    const lastScrollY = useRef(0);
    const animationFrameId = useRef(null);

    useEffect(() => {
        // Set initial viewport height
        setViewportHeight(window.innerHeight);

        const updateScrollPosition = () => {
            setScrollPosition(lastScrollY.current);

            // Toggle night mode based on scroll position
            setIsNightMode(lastScrollY.current > viewportHeight * 0.5);

            ticking.current = false;
        };

        const handleScroll = () => {
            lastScrollY.current = window.scrollY;

            if (!ticking.current) {
                ticking.current = true;
                animationFrameId.current = requestAnimationFrame(updateScrollPosition);
            }
        };

        const handleResize = () => {
            cancelAnimationFrame(animationFrameId.current);
            setViewportHeight(window.innerHeight);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [viewportHeight]);

    // Define the layers with Firewatch-inspired settings
    const layers = [
        {
            id: 'sky',
            image: '/images/layers/blue_sky.png',
            speed: 0.05,
            zIndex: 1,
            position: 'center top',
            opacity: isNightMode ? 0.3 : 1,
            transition: 'opacity 0.5s ease-out, transform 0.1s ease-out'
        },
        {
            id: 'stars',
            image: '/images/layers/stars.png',
            speed: 0.02,
            zIndex: 1.5,
            position: 'center top',
            opacity: isNightMode ? 0.9 : 0,
            transition: 'opacity 0.5s ease-out, transform 0.1s ease-out'
        },
        {
            id: 'far-mountains',
            image: '/images/layers/MountainSingle.png',
            speed: 0.1,
            zIndex: 3,
            position: 'bottom center',
            size: '103% auto',
            filter: isNightMode ? 'brightness(0.4) saturate(0.8)' : 'none',
            transition: 'filter 0.5s ease-out, transform 0.1s ease-out'
        },
        {
            id: 'back-forest',
            image: '/images/layers/lower_trees2.png',
            speed: 0.25,
            zIndex: 4,
            position: 'bottom center',
            size: '100% auto',
            filter: isNightMode ? 'brightness(0.3) saturate(0.6)' : 'none',
            transition: 'filter 0.5s ease-out, transform 0.1s ease-out'
        },
        {
            id: 'mid-forest',
            image: '/images/layers/lower_trees.png',
            speed: 0.35,
            zIndex: 5,
            position: 'bottom center',
            size: '100% auto',
            filter: isNightMode ? 'brightness(0.25) saturate(0.5)' : 'none',
            transition: 'filter 0.5s ease-out, transform 0.1s ease-out'
        },
        {
            id: 'front-forest',
            image: '/images/layers/lower_trees3.png',
            speed: 0.5,
            zIndex: 6,
            position: 'bottom center',
            size: '100% auto',
            filter: isNightMode ? 'brightness(0.2) saturate(0.4)' : 'none',
            transition: 'filter 0.5s ease-out, transform 0.1s ease-out'
        },
    ];

    // Calculate perspective transform and scale for more dramatic effect
    const calculateTransform = useMemo(() => {
        return (speed, perspective = 1000) => {
            const translateY = Math.round(scrollPosition * speed * 10) / 10; // Round to 1 decimal place
            const scale = 1 + (Math.round(scrollPosition * 0.0005 * speed * 1000) / 1000); // Round to 3 decimal places
            return `translateY(${translateY}px) scale(${scale})`;
        };
    }, [scrollPosition]);

    return (
        <div className="relative" ref={parallaxRef}>
            {/* Parallax Container */}
            <div className="h-screen w-full overflow-hidden relative">
                {/* Background Color - Transitions from blue to dark blue/purple */}
                <div
                    className="fixed w-full h-full"
                    style={{
                        background: isNightMode
                            ? 'linear-gradient(to bottom, #0a1329 0%, #213150 100%)'
                            : 'linear-gradient(to bottom, #7db9e8 0%, #1e5799 100%)',
                        zIndex: 0,
                        transition: 'background 0.5s ease-out'
                    }}
                />

                {/* Sun/Moon */}
                <div
                    className="fixed w-24 h-24 rounded-full will-change-transform"
                    style={{
                        top: '10%',
                        right: '15%',
                        background: isNightMode
                            ? 'radial-gradient(circle, rgba(240,240,240,1) 0%, rgba(200,200,255,0.8) 50%, rgba(100,100,200,0) 100%)'
                            : 'radial-gradient(circle, rgba(255,235,59,1) 0%, rgba(255,152,0,0.8) 50%, rgba(255,152,0,0) 100%)',
                        boxShadow: isNightMode
                            ? '0 0 20px 10px rgba(200,200,255,0.3)'
                            : '0 0 40px 20px rgba(255,152,0,0.4)',
                        transform: `translate3d(0, ${Math.round(scrollPosition * 0.15)}px, 0)`,
                        opacity: isNightMode ? 0.8 : 1,
                        zIndex: 2,
                        transition: 'background 0.5s ease-out, box-shadow 0.5s ease-out, opacity 0.5s ease-out'
                    }}
                />

                {/* Parallax Layers */}
                {layers.map((layer) => (
                    <div
                        key={layer.id}
                        className="fixed w-full h-full bg-transparent bg-no-repeat will-change-transform"
                        style={{
                            backgroundImage: `url(${layer.image})`,
                            transform: calculateTransform(layer.speed),
                            zIndex: layer.zIndex,
                            backgroundPosition: layer.position || 'bottom center',
                            backgroundSize: layer.size || 'cover',
                            opacity: layer.opacity !== undefined ? layer.opacity : 1,
                            filter: layer.filter || 'none',
                            transition: (layer.transition || '').replace('transform 0.1s ease-out', '')
                        }}
                    />
                ))}

                {/* Left Cloud with horizontal movement */}
                <div
                    className="fixed w-1/2 h-full bg-transparent bg-no-repeat will-change-transform"
                    style={{
                        backgroundImage: `url(/images/layers/Left_Cloud.png)`,
                        transform: `translate3d(${Math.round(-scrollPosition * 0.05)}px, ${Math.round(scrollPosition * 0.1)}px, 0)`,
                        zIndex: 2,
                        backgroundPosition: 'top left',
                        backgroundSize: 'contain',
                        left: 0,
                        top: 80,
                        opacity: isNightMode ? 0.6 : 1,
                        filter: isNightMode ? 'brightness(0.7) saturate(0.5)' : 'none',
                        transition: 'opacity 0.5s ease-out, filter 0.5s ease-out'
                    }}
                />

                {/* Right Cloud with horizontal movement */}
                <div
                    className="fixed w-1/2 h-full bg-transparent bg-no-repeat will-change-transform"
                    style={{
                        backgroundImage: `url(/images/layers/Right_Cloud.png)`,
                        transform: `translate3d(${Math.round(scrollPosition * 0.05)}px, ${Math.round(scrollPosition * 0.1)}px, 0)`,
                        zIndex: 2,
                        backgroundPosition: 'top right',
                        backgroundSize: 'contain',
                        right: 0,
                        top: -30,
                        opacity: isNightMode ? 0.6 : 1,
                        filter: isNightMode ? 'brightness(0.7) saturate(0.5)' : 'none',
                        transition: 'opacity 0.5s ease-out, filter 0.5s ease-out'
                    }}
                />

                {/* Left Tree with more pronounced movement */}
                <div
                    className="fixed w-4/5 h-full bg-transparent bg-no-repeat will-change-transform"
                    style={{
                        backgroundImage: `url(/images/layers/Left_Tree.png)`,
                        transform: `translate3d(${Math.round(-scrollPosition * 0.1)}px, ${Math.round(scrollPosition * 0.65)}px, 0)`,
                        zIndex: 7,
                        backgroundPosition: 'bottom left',
                        backgroundSize: 'contain',
                        left: 0,
                        bottom: 0,
                        filter: isNightMode ? 'brightness(0.15) saturate(0.3)' : 'none',
                        transition: 'filter 0.5s ease-out'
                    }}
                />

                {/* Right Tree with more pronounced movement */}
                <div
                    className="fixed w-4/5 h-full bg-transparent bg-no-repeat will-change-transform"
                    style={{
                        backgroundImage: `url(/images/layers/Right_Tree.png)`,
                        transform: `translate3d(${Math.round(scrollPosition * 0.1)}px, ${Math.round(scrollPosition * 0.65)}px, 0)`,
                        zIndex: 7,
                        backgroundPosition: 'bottom right',
                        backgroundSize: 'contain',
                        right: 0,
                        bottom: 0,
                        filter: isNightMode ? 'brightness(0.15) saturate(0.3)' : 'none',
                        transition: 'filter 0.5s ease-out'
                    }}
                />

                {/* Color overlay - changes with scroll */}
                <div
                    className="fixed w-full h-full pointer-events-none"
                    style={{
                        background: isNightMode
                            ? 'radial-gradient(circle at center, rgba(30,20,60,0) 0%, rgba(10,10,30,0.6) 100%)'
                            : 'radial-gradient(circle at center, rgba(255,200,100,0) 0%, rgba(255,150,50,0.2) 100%)',
                        opacity: Math.min(scrollPosition / 1000, 0.7),
                        zIndex: 9
                    }}
                />

                {/* Atmospheric fog/mist effect */}
                <div
                    className="fixed w-full h-full pointer-events-none"
                    style={{
                        background: 'linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                        opacity: isNightMode ? 0.2 : 0.4,
                        zIndex: 8
                    }}
                />

                {/* Vignette effect - stronger at night */}
                <div
                    className="fixed w-full h-full pointer-events-none"
                    style={{
                        boxShadow: isNightMode
                            ? 'inset 0 0 150px 60px rgba(0,0,0,0.8)'
                            : 'inset 0 0 100px 50px rgba(0,0,0,0.3)',
                        zIndex: 10,
                        transition: 'box-shadow 0.5s ease-out'
                    }}
                />
            </div>

            {/* Content sections - you can add multiple sections to scroll through */}
            <div className="relative z-20 will-change-transform">
                {/* First viewport height is just for parallax effect */}
                <div className="h-screen"></div>

                {/* Additional content can be added here */}
                <div className="bg-black bg-opacity-70 min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl text-white">
                        <h2 className="text-4xl font-bold mb-6 text-center ">Temperature and Butterfly vs Time</h2>
                        <WeatherButterflyChart dataType='temperature'/>

                        <h2 className="text-4xl font-bold mb-6 text-center">Humidity and Butterfly vs Time</h2>
                        <WeatherButterflyChart dataType='humidity'/>

                        <h2 className="text-4xl font-bold mb-12 text-center ">Wind Speed and Butterfly vs Time</h2>
                        <WeatherButterflyChart dataType='wind_speed'/>
                        <h2 className="text-4xl font-bold text-center mb-[5rem]">Species Makeup</h2>
                        <PieChartMakeUp/>
                    </div>
                    
                    
                </div>

              
            </div>
        </div>
    );
};

export default MountainSceneParallax;