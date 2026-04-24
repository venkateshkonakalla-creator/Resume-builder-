import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { ResumeData } from '../types';

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="resume-a4 font-sans text-slate-800 p-0 relative">
      {/* Decorative top bar */}
      <div className="h-4 bg-indigo-600 w-full" />
      
      <div className="p-12">
        <header className="mb-12">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">{data.personalInfo.fullName}</h1>
              <p className="text-xl font-bold text-indigo-600 italic">{data.personalInfo.title}</p>
            </div>
            <div className="text-right space-y-1 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <p>{data.personalInfo.location}</p>
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
            </div>
          </div>
          <div className="mt-8 h-1 w-20 bg-slate-900" />
        </header>

        <div className="grid grid-cols-12 gap-12">
          {/* Main */}
          <div className="col-span-8 space-y-10">
            <section>
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-zinc-300">01</span> PROFILE
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">{data.personalInfo.summary}</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="text-zinc-300">02</span> EXPERIENCE
              </h2>
              <div className="space-y-8">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                       <h3 className="font-black text-slate-800 uppercase tracking-tight">{exp.position}</h3>
                       <span className="text-[10px] font-bold text-slate-400 tracking-widest">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-xs font-bold text-indigo-600 mb-3">{exp.company}</p>
                    <p className="text-xs text-slate-600 leading-relaxed pl-4 border-l border-slate-100 group-hover:border-indigo-200 transition-colors">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Side */}
          <div className="col-span-4 space-y-10">
            <section>
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-zinc-300">03</span> SKILLS
              </h2>
              <div className="space-y-4">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      <span>{skill}</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 w-[85%] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-3">
                <span className="text-zinc-300">04</span> EDUCATION
              </h2>
              <div className="space-y-6 text-xs">
                {data.education.map((edu, i) => (
                  <div key={i} className="space-y-1">
                    <h3 className="font-black text-slate-800 uppercase">{edu.degree}</h3>
                    <p className="text-slate-600 font-bold">{edu.school}</p>
                    <p className="text-[10px] text-slate-400">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>

            {data.languages.length > 0 && (
              <section>
                <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-3">
                  <span className="text-zinc-300">05</span> LANGUAGES
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((lang, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase px-2 py-1 border border-slate-200 rounded tracking-widest">{lang}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
