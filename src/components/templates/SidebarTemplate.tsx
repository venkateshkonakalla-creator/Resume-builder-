import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { ResumeData } from '../types';

export const SidebarTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="resume-a4 font-sans flex text-slate-800 p-0 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-900 text-slate-100 p-8 space-y-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold italic">
            {data.personalInfo.fullName.charAt(0)}
          </div>
          <h1 className="text-xl font-bold uppercase tracking-tight leading-tight">{data.personalInfo.fullName}</h1>
          <p className="text-xs text-indigo-400 mt-2 font-medium">{data.personalInfo.title}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-700 pb-1">Contact</h2>
          <div className="space-y-3 text-[11px]">
            <div className="flex items-center gap-3"><Mail className="h-3.5 w-3.5 text-indigo-400" /> <span className="break-all">{data.personalInfo.email}</span></div>
            <div className="flex items-center gap-3"><Phone className="h-3.5 w-3.5 text-indigo-400" /> {data.personalInfo.phone}</div>
            <div className="flex items-center gap-3"><MapPin className="h-3.5 w-3.5 text-indigo-400" /> {data.personalInfo.location}</div>
            {data.personalInfo.website && (
              <div className="flex items-center gap-3"><Globe className="h-3.5 w-3.5 text-indigo-400" /> {data.personalInfo.website}</div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-700 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-700 pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h3 className="font-bold text-[11px] leading-tight">{edu.degree}</h3>
                <p className="text-[10px] text-slate-400">{edu.school}</p>
                <p className="text-[9px] text-slate-500">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>

        {data.languages.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest border-b border-slate-700 pb-1">Languages</h2>
            <div className="space-y-1">
              {data.languages.map((lang, i) => (
                <p key={i} className="text-[11px] text-slate-300">{lang}</p>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-10 bg-white space-y-8">
        <section>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-indigo-600 rounded-full" /> Profile Summary
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed italic">{data.personalInfo.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-indigo-600 rounded-full" /> Work Experience
          </h2>
          <div className="space-y-8 border-l border-slate-100 pl-6 ml-1">
            {data.experiences.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-indigo-600" />
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-slate-800">{exp.position}</h3>
                  <span className="text-[10px] font-bold text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-full uppercase">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-xs font-bold text-slate-500 mb-3">{exp.company}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {data.projects.length > 0 && (
          <section>
             <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-indigo-600 rounded-full" /> Projects
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {data.projects.map((proj, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-lg">
                  <h3 className="font-bold text-xs text-slate-800">{proj.name}</h3>
                  <p className="text-[11px] text-slate-600 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
