"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Language } from '@/types';
import { Button } from '@/components/ui/button';

interface Props {
    lang: Language;
    setLang: (lang: Language) => void;
}
const LanguageButton: React.FC<Props> = ({lang, setLang}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className='relative'>
            <Button 
                className='group px-2 py-1 h-auto rounded-lg hover:opacity-80 hover:bg-transition-opacity flex flex-col items-center gap-1 bg-transparent text-slate-700 font-medium border-0 shadow-none'
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-slate-200 group-hover:border-slate-300 transition-colors shadow-sm">
                    <span className='text-sm font-semibold'>{lang}</span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 flex items-center gap-0.5">
                    Language
                    <ChevronDown size={10} />
                </span>
            </Button>
            {showDropdown && (
                <div className='absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col gap-1 bg-white rounded-xl shadow-xl border border-slate-200 p-2 min-w-[200px] z-50'>
                    {Object.keys(Language).map((lang, index) => (
                        <button 
                            key={index}
                            className='text-left px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium'
                            onClick={() => {
                                setLang(Language[lang as keyof typeof Language])
                                setShowDropdown(false);
                            }}
                        >
                            {lang} ({Language[lang as keyof typeof Language]})
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageButton
