import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import GallerySection from './sections/GallerySection';
import MinistriesSection from './sections/MinistriesSection';
import ContactSection from './sections/ContactSection';
import { validateContactForm } from './utils/formValidation';
import { sendContactForm } from './utils/emailService';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', isError: false });
  const formRef = useRef(null);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
      
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(formRef.current);
    const data = {
      inquiry_title: formData.get('inquiry_title'),
      name: formData.get('name') || "이름 미입력",
      email: formData.get('email'),
      phone: formData.get('phone') || "연락처 없음",
      message: formData.get('message'),
      contact_source: 'holssiworship.github.io'
    };
    
    // Validate form
    const validation = validateContactForm(data);
    if (!validation.isValid) {
      setFormStatus({
        message: validation.errorMessage,
        isError: true
      });
      return;
    }
    
    // Submit form
    setIsFormSubmitting(true);
    setFormStatus({
      message: '문의를 전송 중입니다...',
      isError: false
    });
    
    try {
      // Call email service (mock for this example)
      const response = await sendContactForm(data, "mock-recaptcha-token");
      
      if (response.success) {
        setFormStatus({
          message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.',
          isError: false
        });
        
        // Reset form
        formRef.current.reset();
        
        // Hide status message after 5 seconds
        setTimeout(() => {
          setFormStatus({ message: '', isError: false });
        }, 5000);
      } else {
        setFormStatus({
          message: '이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
          isError: true
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        message: '시스템 오류가 발생했습니다. 나중에 다시 시도해주세요.',
        isError: true
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };
  
  // Navigation items
  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'about', label: '소개' },
    { id: 'gallery', label: '갤러리' },
    { id: 'ministries', label: '사역' },
    { id: 'contact', label: '문의' }
  ];
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header 
        activeSection={activeSection}
        navItems={navItems}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      <main>
        <HomeSection scrollToSection={scrollToSection} />
        <AboutSection />
        <GallerySection />
        <MinistriesSection scrollToSection={scrollToSection} />
        <ContactSection 
          formRef={formRef}
          handleSubmit={handleSubmit}
          isFormSubmitting={isFormSubmitting}
          formStatus={formStatus}
        />
      </main>
      
      <Footer 
        navItems={navItems}
        scrollToSection={scrollToSection}
      />
    </div>
  );
}

export default App;