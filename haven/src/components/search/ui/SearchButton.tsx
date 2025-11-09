import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
    onClick: (e: React.MouseEvent) => void;
}
const SearchButton: React.FC<Props> = ({onClick}) => {
    return (
        <Button
            className={cn("flex rounded-none h-full w-full justify-center items-center px-4 py-2", 
                "text-white text-md bg-secondary"
            )}
            onClick={onClick}
            type="button"
        >
            <Search size={20} className="mr-1 mb-[0.1rem]"/> 
            Search 
        </Button>
    )
}

export default SearchButton
