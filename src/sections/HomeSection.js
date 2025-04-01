import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="py-24 md:py-32 bg-gray-100 relative"
      style={{
        backgroundImage: 'url("https://placehold.co/1200x600/6366F1/FFFFFF?text=Banner")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="text-indigo-500">holssi</span> 워십
        </h2>
        <p className="text-gray-200 text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          "Here and There" - 우리가 함께 모이는 이곳에서도, 우리가 흩어져 나아갈 그곳에서도
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          <button
            onClick={() => navigate('/about')}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg"
          >
            팀 소개
          </button>
          <button
            onClick={() => navigate('/ministries')}
            className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg"
          >
            사역 소개
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;