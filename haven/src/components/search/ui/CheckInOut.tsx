import { formatDate } from "@/lib/utils"

interface CheckProps {
    check: Date;
    setCheck: (data: Date) => void;
    label: string
}

export const Check: React.FC<CheckProps> = ({check, setCheck, label}) => {
    return (
        <div className='flex flex-col gap-1.5 min-w-[130px]'>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {label}
            </label>
            <input
                type="date"
                className="px-2 py-1 rounded-lg border-0 bg-white text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-sm border border-slate-200"
                value={formatDate(check)}
                onChange={(e) => setCheck(new Date(e.target.value))}
            />
        </div>
    )
}
