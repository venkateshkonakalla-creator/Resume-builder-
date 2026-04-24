import React from 'react';
import { Download, Layout, X, Maximize2 } from 'lucide-react';
import { ResumeData, TemplateId } from '../types';
import { ModernTemplate } from './templates/ModernTemplate';
import { SidebarTemplate } from './templates/SidebarTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { RewardedAd } from './Ads';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AnimatePresence } from 'motion/react';

interface Props {
  data: ResumeData;
  templateId: TemplateId;
  onTemplateChange: (id: TemplateId) => void;
}

export const ResumePreview: React.FC<Props> = ({ data, templateId, onTemplateChange }) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [showAd, setShowAd] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const componentRef = React.useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    // Access the hidden 1:1 scale container for capture
    const captureElement = document.getElementById('capture-container');
    if (!captureElement) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(captureElement, {
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      pdf.save(`Resume_${data.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      window.print();
    } finally {
      setIsGenerating(false);
      setShowAd(false);
    }
  };

  const handleDownloadClick = () => {
    setShowAd(true);
  };

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
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-1 no-print">
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

      <div className="flex flex-col gap-4 no-print">
        <button 
          onClick={handleDownloadClick}
          disabled={isGenerating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating PDF...
            </span>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF
            </>
          )}
        </button>
        
        <button 
          onClick={() => setIsFullScreen(true)}
          className="flex items-center justify-center gap-2 text-slate-500 hover:text-slate-800 font-medium text-sm transition-colors opacity-80 hover:opacity-100"
        >
           <Maximize2 className="h-4 w-4" />
           Full Screen Preview
        </button>
      </div>

      {/* Preview Container */}
      <div className="flex justify-center bg-slate-200/50 p-6 md:p-12 rounded-2xl overflow-x-auto border border-slate-200/50 backdrop-blur-sm shadow-inner group relative">
        <div className="origin-top scale-[0.55] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 transition-all shadow-2xl">
          <div ref={componentRef} className="bg-white">
            <TemplateComponent />
          </div>
        </div>
      </div>

      {/* Hidden 1:1 container for high-quality capture */}
      <div className="fixed -left-[9999px] top-0 no-print" aria-hidden="true">
        <div id="capture-container">
          <TemplateComponent />
        </div>
      </div>

      {/* Reward Ad Modal */}
      <AnimatePresence>
        {showAd && (
          <RewardedAd 
            onComplete={generatePDF} 
            onClose={() => setShowAd(false)} 
          />
        )}
      </AnimatePresence>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center p-4 md:p-12 overflow-y-auto no-print"
          >
            <button 
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all group"
            >
              <X className="h-6 w-6 group-hover:rotate-90 transition-transform" />
            </button>
            
            <div className="mt-8 mb-12 flex items-center gap-4">
              <button 
                onClick={handleDownloadClick}
                disabled={isGenerating}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? (
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                   <Download className="h-4 w-4" />
                )}
                {isGenerating ? 'Processing...' : 'Download PDF'}
              </button>
            </div>

            <div className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] origin-top scale-[0.5] sm:scale-[0.7] md:scale-90 lg:scale-100 xl:scale-110 mb-20">
               <TemplateComponent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
