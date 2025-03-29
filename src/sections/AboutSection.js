import React from 'react';

const AboutSection = () => {
  const teamMembers = [
    { 
      name: '김예배', 
      role: '리더 & 보컬', 
      quote: '"하나님께 드리는 예배는 우리 일상의 중심입니다"', 
      letter: 'H' 
    },
    { 
      name: '이찬양', 
      role: '키보드 & 보컬', 
      quote: '"음악은 우리의 감정을 표현하는 하나님의 선물입니다"', 
      letter: 'O' 
    },
    { 
      name: '박기타', 
      role: '기타 & 작곡', 
      quote: '"하나님의 영광을 위한 음악을 만들고 연주합니다"', 
      letter: 'L' 
    },
    { 
      name: '최베이스', 
      role: '베이스', 
      quote: '"단단한 기초로 팀을 받쳐주는 역할을 합니다"', 
      letter: 'S',
      gridSpan: 'md:col-span-1' 
    },
    { 
      name: '정드럼', 
      role: '드럼', 
      quote: '"리듬과 열정으로 예배의 박동을 만들어갑니다"', 
      letter: 'S',
      gridSpan: 'md:col-span-1' 
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">소개</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">holssi 워십팀</h3>
            <p className="text-gray-800 mb-6">
              "Here and There"<br /><br />
              우리가 모여 예배하는 이곳에서도, <br />
              우리가 흩어져 나아갈 그곳에서도<br />
              우리를 통해 일하실 하나님을 기대합니다.
            </p>
          </div>
          <div>
            <img
              src="https://placehold.co/600x400/6366F1/FFFFFF?text=About+Image"
              alt="holssi 워십팀 이미지"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">팀원 소개</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.slice(0, 3).map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {teamMembers.slice(3).map((member, index) => (
              <TeamMemberCard key={index + 3} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-lg text-center transform transition duration-300 hover:scale-105 ${member.gridSpan || ''}`}>
      <img
        src={`https://placehold.co/180x180/6366F1/FFFFFF?text=${member.letter}`}
        alt={member.name}
        className="rounded-full mx-auto mb-4 border-4 border-indigo-500"
      />
      <p className="text-gray-800 font-bold text-lg mb-1">{member.name}</p>
      <p className="text-indigo-500 font-medium mb-3">{member.role}</p>
      <p className="text-gray-600 text-sm">{member.quote}</p>
    </div>
  );
};

export default AboutSection;