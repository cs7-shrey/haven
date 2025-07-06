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
        <div className='max-h-20'>
            <Button 
                className='hover:bg-foreground/10 py-2 px-4 h-auto w-full rounded-none text-center flex flex-col gap-0 justify-center items-center relative bg-background text-foreground'
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                <span className='text-lg'>{lang}</span>
                <ChevronDown size={16}/>
            </Button>
            {showDropdown && <div className='absolute flex flex-col gap-1'>
                {Object.keys(Language).map((lang, index) => (
                    <button 
                        key={index}
                        className='bg-background text-foreground rounded-md p-2 border-1'
                        onClick={() => {
                            setLang(Language[lang as keyof typeof Language])
                            setShowDropdown(false);
                        }}
                    >
                        {lang} ({Language[lang as keyof typeof Language]})
                    </button>
                ))}
            </div>}
        </div>
    )
}

export default LanguageButton
