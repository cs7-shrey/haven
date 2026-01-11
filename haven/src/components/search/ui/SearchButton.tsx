import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
    onClick: (e: React.MouseEvent) => void;
}
const SearchButton: React.FC<Props> = ({onClick}) => {
    return (
        <Button
            className={cn(
                "flex my-auto w-full justify-center items-center py-8",
                "rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base",
                "shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30",
                "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                "border border-blue-500/20"
            )}
            onClick={onClick}
            type="button"
        >
            <Search size={20} className="mr-2"/> 
            Search 
        </Button>
    )
}

export default SearchButton
