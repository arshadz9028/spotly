import React, { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiChevronRight } from 'react-icons/fi';
import HeroSlideshow from '../Slide';
import ProductsGrid from '../ProductsGrid';
import BestProperties from '../BestProperties';
import styles from './index.module.css';
function Home() {
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = (e:any) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroSlideshow />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] max-w-[800px] w-full px-5 text-center">
          <h1 className="text-[3.5rem] font-bold text-[#2c2c2c] mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] md:text-[2.5rem] sm:text-[2rem]">
              Discover Properties and Land
          </h1>
          <p className="text-xl text-[#666] mb-10 leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.1)] md:text-[1.1rem]">
            Find the perfect property for your next adventure
          </p>
          
          {/* <form onSubmit={handleSearch} className="max-w-[600px] mx-auto">
            <div className="flex bg-white rounded-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden md:flex-col md:rounded-[15px]">
              <input
                type="text"
                placeholder="Search for properties and land..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-5 px-6 border-none outline-none text-base bg-transparent md:py-[15px] md:px-5"
              />
              <button type="submit" className="bg-[#599D9C] text-white border-none py-5 px-[30px] text-base font-semibold cursor-pointer flex items-center gap-2 transition-colors duration-300 ease-in-out hover:bg-[#16796F] md:py-[15px] md:px-[25px] md:justify-center">
                <FiSearch />
                Search
              </button>
            </div>
          </form> */}
          <form onSubmit={handleSearch} className={styles.heroSearch}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search for properties and land..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.heroSearchInput}
              />
              <button type="submit" className={styles.heroSearchButton}>
                <FiSearch />
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <BestProperties />

      <ProductsGrid />
    </div>
  );
}

export default Home;