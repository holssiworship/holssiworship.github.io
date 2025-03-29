import React from 'react';

const GallerySection = () => {
  const galleryItems = [
    { title: '워십 콘서트', date: '2024년 3월', text: 'Worship+Session' },
    { title: '앨범 녹음', date: '2024년 2월', text: 'Recording' },
    { title: '팀 연습', date: '매주 목요일', text: 'Rehearsal' },
    { title: '팀 모임', date: '2024년 1월', text: 'Community' },
    { title: '지역 아웃리치', date: '2023년 12월', text: 'Outreach' },
    { title: '찬양 워크샵', date: '분기별 진행', text: 'Workshop' }
  ];

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">갤러리</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <GalleryItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GalleryItem = ({ item }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-md bg-white">
      <div className="overflow-hidden">
        <img
          src={`https://placehold.co/600x400/6366F1/FFFFFF?text=${item.text}`}
          alt={item.title}
          className="w-full h-64 object-cover object-center transition duration-300 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.date}</p>
      </div>
    </div>
  );
};

export default GallerySection;