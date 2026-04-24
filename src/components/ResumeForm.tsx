import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin,
  Trash2,
  Plus,
  Sparkles
} from 'lucide-react';
import { ResumeData, Experience, Education, Project } from '../types';
import { enhanceSummary } from '../lib/gemini';
import { BannerAd } from './Ads';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<Props> = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = React.useState<string | null>(null);
  const skillsRef = React.useRef<HTMLInputElement>(null);

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleEnhance = async () => {
    setIsEnhancing('summary');
    const enhanced = await enhanceSummary(data);
    updatePersonalInfo('summary', enhanced);
    setIsEnhancing(null);
  };

  const addExperience = () => {
    onChange({
      ...data,
      experiences: [...data.experiences, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperiences = [...data.experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    onChange({ ...data, experiences: newExperiences });
  };

  const removeExperience = (index: number) => {
    onChange({ ...data, experiences: data.experiences.filter((_, i) => i !== index) });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { school: '', degree: '', startDate: '', endDate: '', description: '', gpa: '' }]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    onChange({ ...data, education: newEdu });
  };

  const removeEducation = (index: number) => {
    onChange({ ...data, education: data.education.filter((_, i) => i !== index) });
  };

  // Scroll skills input into view when focused on mobile
  const handleSkillsFocus = () => {
    setTimeout(() => {
      skillsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  return (
    <div className="space-y-6 pb-40">
      {/* Personal Info */}
      <section className="form-section-card space-y-4">
        <div className="flex items-center gap-2 text-slate-900 mb-2">
          <User className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold">Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" value={data.personalInfo.fullName} onChange={(v) => updatePersonalInfo('fullName', v)} />
          <Input label="Job Title" value={data.personalInfo.title} onChange={(v) => updatePersonalInfo('title', v)} />
          <Input label="Email" value={data.personalInfo.email} onChange={(v) => updatePersonalInfo('email', v)} />
          <Input label="Phone" value={data.personalInfo.phone} onChange={(v) => updatePersonalInfo('phone', v)} />
          <Input label="Location" value={data.personalInfo.location} onChange={(v) => updatePersonalInfo('location', v)} />
          {/* LinkedIn replaces Website */}
          <div className="space-y-1">
            <label className="input-label-sm flex items-center gap-1">
              <Linkedin className="h-3 w-3 text-blue-600" />
              LinkedIn Profile
            </label>
            <input
              className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all bg-white"
              value={data.personalInfo.linkedin || ''}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              placeholder="linkedin.com/in/yourname"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="input-label-sm">Professional Summary</label>
            <button 
              onClick={handleEnhance}
              disabled={!!isEnhancing}
              className="text-[10px] flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wider disabled:opacity-50"
            >
              <Sparkles className="h-3 w-3" />
              {isEnhancing === 'summary' ? 'Enhancing...' : 'AI Enhance'}
            </button>
          </div>
          <textarea 
            className="w-full p-2.5 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-slate-700 text-sm min-h-[100px] transition-all"
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          />
        </div>
      </section>

      <BannerAd />

      {/* Experience */}
      <section className="form-section-card space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-slate-900">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold">Work Experience</h2>
          </div>
          <button onClick={addExperience} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50">
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {data.experiences.map((exp, index) => (
            <div key={index} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50/30 space-y-3">
              <button 
                onClick={() => removeExperience(index)}
                className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company" value={exp.company} onChange={(v) => updateExperience(index, 'company', v)} />
                <Input label="Role" value={exp.position} onChange={(v) => updateExperience(index, 'position', v)} />
                <Input label="From" value={exp.startDate} onChange={(v) => updateExperience(index, 'startDate', v)} />
                <Input label="To" value={exp.endDate} onChange={(v) => updateExperience(index, 'endDate', v)} />
              </div>
              <textarea 
                placeholder="Key accomplishments and responsibilities..."
                className="w-full p-2.5 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-slate-700 text-xs min-h-[80px]"
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
              />
            </div>
          ))}
          {data.experiences.length === 0 && (
            <button onClick={addExperience} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-blue-300 hover:text-blue-500 transition-all">
              + Add Experience
            </button>
          )}
        </div>
      </section>

      <BannerAd />

      {/* Education */}
      <section className="form-section-card space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-slate-900">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold">Education</h2>
          </div>
          <button onClick={addEducation} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50">
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="relative p-4 border border-slate-100 rounded-lg bg-slate-50/30 space-y-3">
              <button 
                onClick={() => removeEducation(index)}
                className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="School" value={edu.school} onChange={(v) => updateEducation(index, 'school', v)} />
                <Input label="Degree" value={edu.degree} onChange={(v) => updateEducation(index, 'degree', v)} />
                <Input label="From" value={edu.startDate} onChange={(v) => updateEducation(index, 'startDate', v)} />
                <Input label="To" value={edu.endDate} onChange={(v) => updateEducation(index, 'endDate', v)} />
                {/* GPA / Percentage field */}
                <Input 
                  label="GPA / Percentage (optional)" 
                  value={edu.gpa || ''} 
                  onChange={(v) => updateEducation(index, 'gpa', v)}
                  placeholder="e.g. 8.5 CGPA or 85%"
                />
              </div>
            </div>
          ))}
          {data.education.length === 0 && (
            <button onClick={addEducation} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-blue-300 hover:text-blue-500 transition-all">
              + Add Education
            </button>
          )}
        </div>
      </section>

      <BannerAd />

      {/* Skills */}
      <section className="form-section-card space-y-4">
        <div className="flex items-center gap-2 text-slate-900 mb-2">
          <Wrench className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold">Skills & Proficiencies</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="input-label-sm">Skills (Comma separated)</label>
            {/* Fixed: textarea instead of input so keyboard doesn't cover it on mobile */}
            <input
              ref={skillsRef}
              className="w-full p-2.5 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-slate-700 text-sm transition-all"
              value={data.skills.join(', ')}
              onChange={(e) => onChange({ ...data, skills: e.target.value.split(',').map(s => s.trim()) })}
              placeholder="e.g. Figma, Tailwind CSS, React"
              onFocus={handleSkillsFocus}
            />
          </div>
          <div className="flex flex-wrap gap-2 pb-6">
            {data.skills.map((s, i) => s && (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Input = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="space-y-1">
    <label className="input-label-sm">{label}</label>
    <input 
      className="w-full p-2 rounded-md border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-slate-800 text-sm transition-all bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);
