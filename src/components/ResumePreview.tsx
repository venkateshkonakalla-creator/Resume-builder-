import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, ChevronLeft, ChevronRight, Layout } from 'lucide-react';
import { ResumeData, TemplateId } from '../types';
import { ModernTemplate } from './templates/ModernTemplate';
import { SidebarTemplate } from './templates/SidebarTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface Props {
  data: ResumeData;
  templateId: TemplateId;
  onTemplateChange: (id: TemplateId) => void;
}

export const ResumePreview: React.FC<Props> = ({ data, templateId, onTemplateChange }) => {
  const componentRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Resume_${data.personalInfo.fullName.replace(/\s+/g, '_')}`,
    onAfterPrint: () => console.log('Print success'),
    onPrintError: (errorLocation, error) => console.error('Print error:', errorLocation, error),
  });

  const templates: { id: TemplateId, name: string }[] = [
    { id: 'modern', name: 'Modern' },
    { id: 'sidebar', name: 'Professional' },
    { id: 'creative', name: 'Creative' }
  ];

  const TemplateComponent = () => {
    switch (templateId) {
      case 'sidebar': return <SidebarTemplate data={data} />;
      case 'creative': return <CreativeTemplate data={data} />;
      default: return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-1">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onTemplateChange(t.id)}
            className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
              templateId === t.id 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={() => handlePrint()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
        
        <button className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors opacity-80 hover:opacity-100">
           <Layout className="h-4 w-4" />
           Full Screen Preview
        </button>
      </div>

      {/* Preview Container */}
      <div className="flex justify-center bg-slate-200/50 p-6 md:p-12 rounded-2xl overflow-x-auto border border-slate-200/50 backdrop-blur-sm">
        <div className="origin-top scale-[0.55] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 transition-all shadow-2xl">
          <div ref={componentRef}>
            <TemplateComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
