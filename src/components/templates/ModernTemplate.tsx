import React from 'react';
import { Mail, Phone, MapPin, Globe, Link as LinkIcon } from 'lucide-react';
import { ResumeData } from '../types';

export const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="resume-a4 font-sans text-slate-800">
      <header className="border-b-2 border-indigo-600 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-tight">{data.personalInfo.fullName}</h1>
        <p className="text-xl text-indigo-600 font-medium mb-4">{data.personalInfo.title}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {data.personalInfo.email}</div>
          <div className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {data.personalInfo.phone}</div>
          <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {data.personalInfo.location}</div>
          {data.personalInfo.website && (
            <div className="flex items-center gap-1.5"><Globe className="h-4 w-4" /> {data.personalInfo.website}</div>
          )}
        </div>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-slate-700">{data.personalInfo.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Experience</h2>
          <div className="space-y-6">
            {data.experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-xs font-medium text-slate-500">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-sm font-medium text-slate-700 mb-2">{exp.company}</p>
                <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-bold text-slate-900 text-sm">{edu.degree}</h3>
                  <p className="text-xs text-slate-700">{edu.school}</p>
                  <p className="text-[10px] text-slate-500">{edu.startDate} — {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
            
            {data.languages.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Languages</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {data.languages.map((lang, i) => (
                    <span key={i} className="text-xs text-slate-700">• {lang}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
