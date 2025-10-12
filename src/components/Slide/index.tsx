import React, { useState, useEffect } from 'react';

function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
      alt: 'Men\'s Fashion Collection'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
      alt: 'Stylish Men\'s Clothing'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
      alt: 'Premium Men\'s Fashion'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
      alt: 'Modern Men\'s Style'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
      alt: 'Elegant Men\'s Wear'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[1] md:h-[100vh] sm:h-[70vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-[1.5s] ease-in-out brightness-[0.7] ${
            index === currentSlide ? 'opacity-[0.4]' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`
          }}
        />
      ))}
      
      {/* Overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[rgba(248,249,250,-0.2)] to-[rgba(233,236,239,-0.6)] z-[1]" />
      
      {/* Slide indicators */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex gap-3 z-[3] md:bottom-5 sm:bottom-[15px] sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 ease-in-out md:w-[10px] md:h-[10px] sm:w-2 sm:h-2 ${
              index === currentSlide 
                ? 'bg-[#16796F] border-[#16796F] scale-110' 
                : 'border-[rgba(255,255,255,0.5)] bg-transparent hover:border-[#16796F] hover:bg-[rgba(177,106,65,0.3)]'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slide;
