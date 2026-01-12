"use client";
import SearchDropdown from "../SearchDropdown";
import SearchButton from "./ui/SearchButton";
import { Check } from "./ui/CheckInOut";
import Voice from "@/components/voice-search/Voice";
import LanguageButton from "./ui/LanguageButton";
import { useSocketStore } from "@/store/useSocketStore";
import { useSearchStore } from "@/store/useSearchStore";
import { useHotelStore } from "@/store/useHotelStore";
import { useVoiceSearch } from "@/hooks/useVoiceSearch";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { useLLMFilters } from "@/hooks/useLlmFilters";

const SearchBar = () => {
	const { lang, setLang } = useSocketStore();
	const { setInfoMessage } = useHotelStore();
	const { queryTerm, checkIn, setCheckIn, checkOut, setCheckOut } =
		useSearchStore();

	const filtersProcessing = useLLMFilters();
	const { isStreaming, toggleStreaming, sourceNodeRef } = useVoiceSearch({
		onFiltersReceived: filtersProcessing,
	});

	const router = useRouter();

	const onSearchButtonClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setInfoMessage("");
		if (!queryTerm.place || !queryTerm.type) return;
		router.push(
			`/hotels?q=${encodeURIComponent(queryTerm.place)}&type=${
				queryTerm.type
			}&checkIn=${formatDate(checkIn)}&checkOut=${formatDate(checkOut)}`
		);
	};

	return (
		<div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-3 w-full">
			{/* Voice & Language Controls - Grouped */}
			<div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/60">
				<Voice
					isStreaming={isStreaming}
					toggleStreaming={toggleStreaming}
					sourceNodeRef={sourceNodeRef}
				/>
				<div className="h-6 w-px bg-slate-300" />
				<LanguageButton lang={lang} setLang={setLang} />
			</div>

			{/* Main Search Input - Prominent */}
			<div className="flex-1 md:min-w-80 flex flex-col justify-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-200/60">
				<label className="text-[0.65rem] sm:text-xs text-left font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
					Where do you want to stay?
				</label>
				<SearchDropdown />
			</div>

			{/* Date Selection - Grouped */}
			<div className="flex flex-1 items-center gap-3 sm:px-4 py-3 bg-slate-50 rounded-xl border border-slate-200/60" id="checkInCheckOut">
				<Check check={checkIn} setCheck={setCheckIn} label="Check-in" />
				<div className="h-10 w-px bg-slate-300" />
				<Check check={checkOut} setCheck={setCheckOut} label="Check-out" />
			</div>

			{/* Search Button - Call to Action */}
			<div className="lg:w-auto w-full lg:self-stretch flex items-center">
				<SearchButton onClick={onSearchButtonClick} />
			</div>
		</div>
	);
};

export default SearchBar;
