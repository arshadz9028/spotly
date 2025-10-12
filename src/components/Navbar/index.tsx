'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import {
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiLogIn,
    FiMenu,
    FiX
} from 'react-icons/fi';
import { PiBuildingLight } from "react-icons/pi";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        // Search functionality will be implemented later
        console.log('Searching for:', searchQuery);
    };

    return (
        <nav className="bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.1)] fixed top-0 left-0 right-0 z-[1000] w-full backdrop-blur-[10px] transition-all duration-300 ease-in-out">
            <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-[70px] md:px-5 sm:px-[15px]">
                {/* Logo */}
                <Link href="/" className="flex flex-col items-center cursor-pointer">
                    <div className="flex text-2xl font-bold leading-none md:text-xl">
                        <span className="text-[#16796F]">Prop</span>
                        <span className="text-[#B7BDA9]">Mart</span>
                    </div>
                    <div className="text-[10px] font-semibold tracking-[2px] text-[#599D9C] mt-0.5 md:text-[9px]">Find your place</div>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-[500px] mx-10 md:mx-5 sm:mx-[10px]">
                    <form onSubmit={handleSearch} className="flex relative">
                        <input
                            type="text"
                            placeholder="Search for your place..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-3 pl-4 pr-[50px] border-2 border-[#e5e5e5] rounded-[25px] text-sm outline-none transition-colors duration-300 ease-in-out focus:border-[#599D9C] sm:py-[10px] sm:pl-[14px] sm:pr-[45px] sm:text-[13px]"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#599D9C] text-white border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#16796F] sm:w-8 sm:h-8">
                            <FiSearch />
                        </button>
                    </form>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-5">
                    <Link href="" className="flex flex-col items-center gap-1 bg-none border-none text-[#666] cursor-pointer p-2 rounded-lg transition-all duration-300 ease-in-out text-xs no-underline hover:text-[#599D9C] hover:bg-[#f8f8f8]">
                        <PiBuildingLight  className="text-xl" />
                        <span>Properties</span>
                    </Link>
                    <Link href="" className="flex flex-col items-center gap-1 bg-none border-none text-[#666] cursor-pointer p-2 rounded-lg transition-all duration-300 ease-in-out text-xs no-underline hover:text-[#599D9C] hover:bg-[#f8f8f8]">
                        <FiLogIn className="text-xl" />
                        <span>Login</span>
                    </Link>
                    <Link href="" className="flex flex-col items-center gap-1 bg-none border-none text-[#666] cursor-pointer p-2 rounded-lg transition-all duration-300 ease-in-out text-xs no-underline hover:text-[#599D9C] hover:bg-[#f8f8f8]">
                        <FiUser className="text-xl" />
                        <span>Profile</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden bg-none border-none text-2xl text-[#666] cursor-pointer" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-[#e5e5e5] p-5">
                    <div className="flex flex-col gap-[15px]">
                        <Link href="/cart" className="flex items-center gap-3 bg-none border-none text-[#666] cursor-pointer p-3 rounded-lg transition-all duration-300 ease-in-out text-base no-underline hover:text-[#599D9C] hover:bg-[#f8f8f8]">
                            <FiShoppingCart className="text-xl" />
                            <span>Cart</span>
                        </Link>
                        <Link href="/login" className="flex items-center gap-3 bg-none border-none text-[#666] cursor-pointer p-3 rounded-lg transition-all duration-300 ease-in-out text-base no-underline hover:text-[#599D9C] hover:bg-[#f8f8f8]">
                            <FiLogIn className="text-xl" />
                            <span>Login</span>
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 bg-none border-none text-[#666] cursor-pointer p-3 rounded-lg transition-all duration-300 ease-in-out text-base no-underline hover:text-[#599D9C] hover:bg-[#f8f8f8]">
                            <FiUser className="text-xl" />
                            <span>Profile</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;