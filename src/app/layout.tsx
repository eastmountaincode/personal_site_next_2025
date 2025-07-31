"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Provider } from 'jotai';
import { MDXProvider } from '@mdx-js/react';
import CrunchSlider from '@/components/CrunchSlider';
import "./globals.css"

const navigation = [
  { name: "Web", href: "/web" },
  { name: "Installation", href: "/installation" },
  { name: "Bioinformatics", href: "/bioinformatics" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load the as-dithered-image web component globally
  useEffect(() => {
    // Check if the script is already loaded
    const existingScript = document.querySelector('script[src="/as-dithered-image.js"]');
    if (existingScript) {
      return; // Script already exists, don't add another
    }

    // Check if the custom element is already defined
    if (window.customElements && window.customElements.get('as-dithered-image')) {
      return; // Component already registered
    }

    const script = document.createElement('script');
    script.src = '/as-dithered-image.js';
    script.async = true;
    script.id = 'as-dithered-image-script'; // Add an ID for easier identification
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('as-dithered-image-script');
      if (scriptToRemove && document.head.contains(scriptToRemove)) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <Provider>
          <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`w-full md:w-64 text-black border-b border-black md:border-b-0 ${isClient ? 'md:h-screen md:sticky md:top-0 md:overflow-y-auto' : ''}`}>
              <div className="p-4 md:pb-4">
                {/* Header with Logo and Hamburger */}
                <div className={`flex justify-between items-center ${isMobileMenuOpen ? 'mb-6' : 'mb-0'} md:mb-6`}>
                  <Link
                    href="/"
                    className="text-3xl md:text-4xl font-bold mr-4 hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Andrew Boylan
                  </Link>

                  {/* Hamburger Button - only visible on mobile */}
                  <button
                    onClick={toggleMobileMenu}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none cursor-pointer"
                    aria-label="Toggle mobile menu"
                  >
                    <span className={`block h-0.5 bg-black transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 w-6' : 'w-6'
                      }`}></span>
                    <span className={`block h-0.5 bg-black transform transition-all duration-300 ease-in-out mt-1 ${isMobileMenuOpen ? 'w-0' : 'w-6'
                      }`}></span>
                    <span className={`block h-0.5 bg-black transform transition-all duration-300 ease-in-out mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 w-6' : 'w-6'
                      }`}></span>
                  </button>
                </div>

                {/* Navigation */}
                <nav className={`${isMobileMenuOpen ? 'block' : 'hidden'
                  } md:block`}>
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block py-2 ${isActive
                            ? 'font-bold'
                            : 'hover:underline'
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)} // Close menu when link is clicked
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Crunch Slider - bottom of sidebar */}
              {(pathname === '/installation' || pathname === '/web' || pathname === '/bioinformatics') && (
                <div className="md:p-4">
                  <CrunchSlider />
                </div>
              )}
            </aside>

            {/* Main content */}
            {/* flex-1 means it takes up all the space it can */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
