import React from 'react';
import Link from "next/link";
import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const menuLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Collection', href: '/collection' },
    { name: 'Category', href: '/category' },
  ];

  const pageLinks = [
    { name: 'Home', href: '/' },
    { name: 'License', href: '/license' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Style Guide', href: '/style-guide' },
    { name: 'Support', href: '/support' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
              StyleHub
            </h2>
            <p className="text-lg text-gray-400 font-semibold">
              Streetwear for the Bold, Built for the Movement.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Inspired by the raw energy of the streets, we create statement pieces that blend style, attitude, and individuality.
            </p>
          </div>

          {/* Menu Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide">Menu</h3>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Page Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide">Pages</h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-wide">Social</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-base"
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © Copyright <span className="font-semibold">StyleHub</span> | Design by{' '}
              <span className="font-semibold">Your Company</span> | Powered by{' '}
              <span className="font-semibold">Next.js</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;