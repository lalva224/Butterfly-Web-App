'use client'
import React, { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    
} from "@/components/ui/carousel";
// import type { EmblaCarouselType } from "embla-carousel-react";


// Your team data
const researchers = [
    {
        id: 1,
        name: "Ronaldo Carrazco",
        role: "Hardware Team",
        avatarColor: "bg-blue-600",
        image: "images/individual-pictures/Ronaldo.jpg",
        linkedin: "https://www.linkedin.com/in/ronaldocarrazco/"
    },
    {
        id: 2,
        name: "Pooja Lad",
        role: "Lead",
        avatarColor: "bg-emerald-600",
        image: "images/individual-pictures/Pooja.jpg",
        linkedin: "https://www.linkedin.com/in/pooja-lad"
    },
    {
        id: 3,
        name: "Leandro Alvarez",
        role: "ML and Web Dev Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Leandro.png",
        linkedin: "https://www.linkedin.com/in/leandro-alvarez-cs/"
    },
    {
        id: 4,
        name: "Mark-Anthony Delva",
        role: "ML and Web Dev Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Mark.png",
        linkedin: "https://www.linkedin.com/in/mark-anthony-delva-914194294/"
    },
    {
        id: 5,
        name: "Lucas Arabi",
        role: "ML Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Lucas.jpg",
        linkedin: "https://www.linkedin.com/in/lucas-arabi-55605524b/"

    },
    {
        id: 6,
        name: "Jordan Hancock",
        role: "Hardware Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Jordan.jpg",
        linkedin: "https://www.linkedin.com/in/jordan-hancock-0aa44018a/"
    },
    {
        id: 7,
        name: "Gabriel Suarez",
        role: "Hardware and Web Dev Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Gabriel.jpeg",
        linkedin: "https://www.linkedin.com/in/gabrielsuarezz/"

    },
    {
        id: 8,
        name: "Arantza Mendoza",
        role: "ML and Web Dev Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Arantza.jpg",
        linkedin: "https://www.linkedin.com/in/Arantza-Mendoza/"

    },
    {
        id: 9,
        name: "Tyler Hebron",
        role: "ML and Web Dev Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Tyler.jpg",
        linkedin: "https://www.linkedin.com/in/tyler-hebron-9689122a9/"
    },

    {
        id: 10,
        name: "Eileen Paula",
        role: "ML Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Eileen.jpg",
        linkedin: "https://www.linkedin.com/in/eileen-paula"

    },
    {
        id: 11,
        name: "Alejandro Morales",
        role: "ML and Web Dev Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Alejandro.jpeg",
        linkedin: "https://www.linkedin.com/in/alejandromorales3/"
    },
    {
        id: 12,
        name: "Nageline Rodriguez",
        role: "Hardware and Web Dev Team",
        avatarColor: "bg-red-600",
        image: "images/individual-pictures/Nageline.jpg",
        linkedin: "https://www.linkedin.com/in/nagevr/"
    },
    

];

// FlipCard component
const FlipCard = ({ person, isNightMode }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Function to prevent propagation for links
    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="relative w-full h-full perspective-1000 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full duration-500 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                }`}
            >
                {/* Front of card */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden"
                    style={{
                        background: isNightMode
                            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
                            : 'linear-gradient(135deg, rgba(203, 213, 225, 0.9) 0%, rgba(148, 163, 184, 0.95) 100%)',
                        boxShadow: isNightMode
                            ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                            : '0 4px 20px rgba(0, 0, 0, 0.2)',
                        borderColor: isNightMode ? 'rgba(100, 116, 139, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                        borderWidth: '1px',
                        transition: 'background 0.5s ease-out, box-shadow 0.5s ease-out'
                    }}
                >
                    <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
                        {/* Profile Image in avatar bubble */}
                        <div className={`w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg ${person.avatarColor}`}>
                            <img
                                src={person.image}
                                alt={person.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to initials if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.parentNode.innerHTML = `<span class="text-2xl font-bold text-white flex items-center justify-center h-full">${person.name.charAt(0)}</span>`;
                                }}
                            />
                        </div>
                        <h3
                            className="text-xl font-bold"
                            style={{
                                color: isNightMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)'
                            }}
                        >
                            {person.name}
                        </h3>
                        <p
                            className="text-center"
                            style={{
                                color: isNightMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)'
                            }}
                        >
                            {person.role}
                        </p>
                        <p
                            className="text-sm text-center"
                            style={{
                                color: isNightMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.5)'
                            }}
                        >
                            {isNightMode ? '✧ Click to connect ✧' : '• Click to connect •'}
                        </p>
                    </div>
                </div>

                {/* Back of card */}
                <div
                    className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg overflow-hidden"
                    style={{
                        background: isNightMode
                            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)'
                            : 'linear-gradient(135deg, rgba(148, 163, 184, 0.95) 0%, rgba(203, 213, 225, 0.9) 100%)',
                        boxShadow: isNightMode
                            ? '0 4px 20px rgba(0, 0, 0, 0.5)'
                            : '0 4px 20px rgba(0, 0, 0, 0.2)',
                        borderColor: isNightMode ? 'rgba(100, 116, 139, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                        borderWidth: '1px',
                        transition: 'background 0.5s ease-out, box-shadow 0.5s ease-out'
                    }}
                >
                    <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
                        <h3
                            className="text-xl font-bold"
                            style={{
                                color: isNightMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)'
                            }}
                        >
                            {person.name}
                        </h3>
                        <p
                            className="text-center font-semibold"
                            style={{
                                color: isNightMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)'
                            }}
                        >
                            {person.role}
                        </p>

                        {/* Profile Image */}
                        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg mb-2 ${person.avatarColor}`}>
                            <img
                                src={person.image}
                                alt={person.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to initials if image fails to load
                                    e.target.style.display = 'none';
                                    e.target.parentNode.innerHTML = `<span class="text-xl font-bold text-white flex items-center justify-center h-full">${person.name.charAt(0)}</span>`;
                                }}
                            />
                        </div>

                        {/* LinkedIn button */}
                        {person.linkedin && (
                            <a
                                href={person.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center px-4 py-2 rounded-full transition-colors ${
                                    isNightMode
                                        ? 'bg-blue-800 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }`}
                                onClick={handleLinkClick}
                            >
                                {/* LinkedIn icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                Connect
                            </a>
                        )}

                        <p
                            className="text-sm text-center mt-1"
                            style={{
                                color: isNightMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.5)'
                            }}
                        >
                            {isNightMode ? '✧ Click to flip back ✧' : '• Click to flip back •'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main carousel component
export function TeamCarousel({ isNightMode = false }) {

    const [api, setApi] = useState(null);

    // Add the flip card styles on the client side only
    useEffect(() => {
        // Check if document exists (client-side only)
        if (typeof document !== 'undefined') {
            // Create style element for flip card CSS
            const style = document.createElement('style');
            style.textContent = `
              .perspective-1000 {
                perspective: 1000px;
              }
              
              .backface-hidden {
                backface-visibility: hidden;
              }
              
              .transform-style-preserve-3d {
                transform-style: preserve-3d;
              }
              
              .rotate-y-180 {
                transform: rotateY(180deg);
              }
            `;
            document.head.appendChild(style);

            // Cleanup function to remove style when component unmounts
            return () => {
                document.head.removeChild(style);
            };
        }
    }, []); // Empty dependency array ensures this runs once on mount

    useEffect(() => {
        if (!api) {
            return;
        }

        const onSelect = () => {
        };

        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    return (
        <div
            className="w-full max-w-4xl mx-auto py-6 px-4 relative"
            style={{
                background: isNightMode
                    ? 'rgba(15, 23, 42, 0.7)'
                    : 'rgba(255, 255, 255, 0.6)',
                borderRadius: '1rem',
                backdropFilter: 'blur(8px)',
                boxShadow: isNightMode
                    ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                    : '0 8px 32px rgba(0, 0, 0, 0.2)',
                border: isNightMode
                    ? '1px solid rgba(100, 116, 139, 0.2)'
                    : '1px solid rgba(255, 255, 255, 0.5)',
                padding: '2rem'
            }}
        >
            <h2
                className="text-3xl font-bold text-center mb-8"
                style={{
                    color: isNightMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(15, 23, 42, 0.9)',
                    textShadow: isNightMode
                        ? '0 2px 4px rgba(0, 0, 0, 0.5)'
                        : '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
            >
            </h2>

            <Carousel
                className="w-full"
                // onApiChange={setApi}
                opts={{
                    align: "center",
                }}
            >
                <CarouselContent>
                    {researchers.map((person) => (
                        <CarouselItem key={person.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-2">
                                <div
                                    className="h-80 border-0 overflow-hidden"
                                    style={{
                                        background: 'transparent'
                                    }}
                                >
                                    <div className="p-0 h-full">
                                        <FlipCard person={person} isNightMode={isNightMode} />
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="flex items-center justify-center mt-8 gap-4">
                    <CarouselPrevious
                        className={isNightMode
                            ? "bg-slate-700 text-white hover:bg-slate-600 relative static transform-none"
                            : "bg-white hover:bg-slate-100 relative static transform-none"
                        }
                    />
                    <CarouselNext
                        className={isNightMode
                            ? "bg-slate-700 text-white hover:bg-slate-600 relative static transform-none"
                            : "bg-white hover:bg-slate-100 relative static transform-none"
                        }
                    />
                </div>
            </Carousel>
        </div>
    );
}

export default TeamCarousel;