import { formatDate } from "@/lib/utils"

interface CheckProps {
    check: Date;
    setCheck: (data: Date) => void;
    label: string
}

export const Check: React.FC<CheckProps> = ({check, setCheck, label}) => {
    return (
        <div className='flex flex-col w-full h-full justify-end'>
            <div className="text-muted-foreground text-xs">
                {label}
            </div>
            <input
                type="date"
                className="rounded-md text-accentForeground font-extrabold"
                value={formatDate(check)}
                onChange={(e) => setCheck(new Date(e.target.value))}
            />
        </div>
    )
}
