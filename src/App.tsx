/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { ResumeData, TemplateId } from './types';
import { FileText, Github, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 000-1111",
    location: "New York, NY",
    website: "alexrivera.design",
    title: "Senior Product Designer",
    summary: "Dedicated Product Designer with over 6 years of experience in creating user-centric digital experiences. Proven track record of leading design systems and improving user engagement for mobile and web platforms."
  },
  experiences: [
    {
      company: "TechFlow Solutions",
      position: "Senior Product Designer",
      startDate: "2021-03",
      endDate: "Present",
      description: "• Spearheaded the redesign of the core SaaS platform, resulting in a 25% increase in user retention.\n• Mentored a team of 4 junior designers and established a shared documentation library.\n• Collaborated with engineering teams to implement a new responsive design system using Tailwind CSS."
    },
    {
      company: "Creative Pulse Agency",
      position: "UI/UX Designer",
      startDate: "2018-06",
      endDate: "2021-02",
      description: "• Delivered high-fidelity prototypes and user flows for 15+ client projects across various industries.\n• Conducted extensive user research and usability testing that informed critical product pivots."
    }
  ],
  education: [
    {
      school: "Rhode Island School of Design",
      degree: "BFA in Graphic Design",
      startDate: "2014",
      endDate: "2018",
      description: "Focus on interactive media and typography."
    }
  ],
  projects: [
    {
      name: "FinanceApp Redesign",
      description: "Complete overhaul of a personal banking mobile application with a focus on accessibility."
    }
  ],
  skills: ["Product Design", "Figma", "React", "Design Systems", "User Research", "Prototyping"],
  languages: ["English (Native)", "Spanish (Bilingual)"]
};

export default function App() {
  const [data, setData] = React.useState<ResumeData>(INITIAL_DATA);
  const [templateId, setTemplateId] = React.useState<TemplateId>('sidebar');
  const [activeTab, setActiveTab] = React.useState<'edit' | 'preview'>('edit');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-3.5 flex justify-between items-center no-print shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-md shadow-blue-200">
            <span className="text-white font-bold text-lg leading-none tracking-tighter">R</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">ResumX</h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">Draft Saved</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-slate-50 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`px-5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'edit' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500'}`}
            >
              Editor
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-500'}`}
            >
              Preview
            </button>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all hover:bg-black uppercase tracking-widest shadow-lg active:scale-95">
             Upgrade
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-full mx-auto w-full flex overflow-hidden">
        {/* Editor Aside */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 p-6 md:p-8 overflow-y-auto shrink-0 no-print ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}
        >
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Project Dashboard</h2>
            <p className="text-slate-500 text-xs font-medium">Build your professional presence with ResumX.</p>
          </div>
          <ResumeForm data={data} onChange={setData} />
        </motion.aside>

        {/* Live Preview Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex-1 bg-slate-200/40 p-6 md:p-10 overflow-y-auto flex flex-col items-center ${activeTab === 'edit' ? 'hidden lg:flex' : 'flex'}`}
        >
          <div className="w-full max-w-4xl">
            <div className="mb-6 flex justify-between items-center no-print">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Visual Canvas</h3>
            </div>
            <ResumePreview 
              data={data} 
              templateId={templateId} 
              onTemplateChange={setTemplateId} 
            />
          </div>
        </motion.section>
      </main>

      {/* Mobile Toggle (Floating) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden no-print z-50">
        <div className="bg-slate-900 text-white rounded-full p-1.5 shadow-2xl flex gap-1 border border-white/10 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all ${activeTab === 'edit' ? 'bg-white text-black' : 'opacity-60'}`}
          >
            Edit
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all ${activeTab === 'preview' ? 'bg-white text-black' : 'opacity-60'}`}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
}
