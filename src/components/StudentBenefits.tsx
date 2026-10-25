import React from 'react';
import { Truck, GraduationCap, RefreshCw, BadgePercent } from 'lucide-react';

export const StudentBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Hostel Room Delivery',
      desc: 'Deliveries handled by student ambassadors directly to your hostel block reception or room door.',
    },
    {
      icon: GraduationCap,
      title: 'Curriculum Aligned',
      desc: 'Every textbook edition and lab tool matches current semester university syllabus and lab exam criteria.',
    },
    {
      icon: BadgePercent,
      title: 'Student Exclusive Discounts',
      desc: 'Use coupon CAMPUS20 or STUDENT10 for instant price cuts on all textbooks and dorm appliances.',
    },
    {
      icon: RefreshCw,
      title: 'Hostel-Door Exchange',
      desc: 'Wrong drafter size or lab coat fit? Simple 48-hour return or replacement right at your campus gate.',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-[#142D4E] tracking-tight">
            Built Exclusively For Campus Life
          </h2>
          <p className="text-sm text-[#64748B] mt-1.5">
            Designed to solve the real everyday shopping friction university students face every semester.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-start hover:border-[#CBD5E1] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EAF2FF] flex items-center justify-center text-[#2563EB] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#142D4E]">{b.title}</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
