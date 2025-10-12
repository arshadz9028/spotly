import React from 'react'
import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-6">
              <div className="flex text-2xl font-bold leading-none mb-2">
                <span className="text-[#16796F]">Prop</span>
                <span className="text-[#B7BDA9]">Mart</span>
              </div>
              <div className="text-[10px] font-semibold tracking-[2px] text-[#599D9C]">
                Find your place
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Discover your dream property with PropMart. We connect you with the finest 
              real estate opportunities, from luxury homes to modern apartments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#599D9C] rounded-full flex items-center justify-center hover:bg-[#16796F] transition-colors duration-300">
                <FiFacebook className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#599D9C] rounded-full flex items-center justify-center hover:bg-[#16796F] transition-colors duration-300">
                <FiTwitter className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#599D9C] rounded-full flex items-center justify-center hover:bg-[#16796F] transition-colors duration-300">
                <FiInstagram className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#599D9C] rounded-full flex items-center justify-center hover:bg-[#16796F] transition-colors duration-300">
                <FiLinkedin className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/houses" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/condos" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Condos
                </Link>
              </li>
              <li>
                <Link href="/studios" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Studios
                </Link>
              </li>
              <li>
                <Link href="/townhouses" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Townhouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/buy" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link href="/investment" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Investment Advisory
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-[#599D9C] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Property Street<br />
                    Real Estate District<br />
                    City, State 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-[#599D9C] flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-[#599D9C] flex-shrink-0" />
                <a href="mailto:info@propmart.com" className="text-gray-300 hover:text-[#599D9C] transition-colors duration-300">
                  info@propmart.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#1a1a1a] py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-300">Get the latest property listings and market insights delivered to your inbox.</p>
          </div>
          <div className="max-w-md mx-auto">
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-600 bg-[#2c2c2c] text-white placeholder-gray-400 focus:outline-none focus:border-[#599D9C] transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-[#599D9C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#16796F] transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1a1a1a] border-t border-gray-700">
        <div className="max-w-[1200px] mx-auto px-5 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 PropMart. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[#599D9C] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#599D9C] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[#599D9C] transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer