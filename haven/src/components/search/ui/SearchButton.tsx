import { Search } from "lucide-react";

interface Props {
    onClick: (e: React.MouseEvent) => void;
}
const SearchButton: React.FC<Props> = ({onClick}) => {
    return (
        <button
            className="flex h-full w-full justify-center items-center px-4 py-2 text-white bg-secondary"
            onClick={onClick}
            type="button"
        >
            <Search size={20} className="mr-1 mb-[0.1rem]"/> 
            Search 
        </button>
    )
}

export default SearchButton
