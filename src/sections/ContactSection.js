import React from 'react';

const ContactSection = ({ formRef, handleSubmit, isFormSubmitting, formStatus }) => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">문의하기</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="inquiry_title" className="block text-gray-700 text-sm font-bold mb-2">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="inquiry_title"
                name="inquiry_title"
                placeholder="문의 제목을 입력해주세요."
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력해주세요."
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일 주소를 입력해주세요."
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="연락처를 입력해주세요."
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                문의 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="문의 내용을 입력해주세요."
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32 resize-y"
                required
              ></textarea>
            </div>
            
            <input type="hidden" name="contact_source" value="holssiworship.github.io" />
            
            <div className="flex justify-center my-4">
              <div className="bg-gray-200 p-4 rounded text-center">
                reCAPTCHA 검증 (실제 구현시 reCAPTCHA 컴포넌트로 대체)
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 w-full"
              disabled={isFormSubmitting}
            >
              {isFormSubmitting ? (
                <span className="animate-pulse">전송 중...</span>
              ) : (
                '문의하기'
              )}
            </button>
            
            {formStatus.message && (
              <p className={`mt-4 text-center ${formStatus.isError ? 'text-red-500' : 'text-green-600'}`}>
                {formStatus.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;