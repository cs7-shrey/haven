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
		<div className="flex flex-col sm:flex-row max-w-full bg-white">
			{/* voice and search input */}
			<div className="flex max-w-full">
				{/* voice controls */}
				<div className="flex">
					<div className="">
						<Voice
							isStreaming={isStreaming}
							toggleStreaming={toggleStreaming}
							sourceNodeRef={sourceNodeRef}
						/>
					</div>
					<div className="my-auto">
						<LanguageButton lang={lang} setLang={setLang} />
					</div>
				</div>
				{/* search input */}
				<div className="w-84 sm:w-auto sm:min-w-48 md:min-w-48 lg:min-w-52 my-auto px-2">
					<div className="text-xs text-muted-foreground">
						Where do you want to stay?
					</div>
					<SearchDropdown />
				</div>
			</div>
			{/* search, check-in-out and search button */}
			<div className="flex w-full sm:w-auto">
				{/* checkin-checkout-search-button */}
				<div className="flex flex-col sm:flex-row w-full sm:w-auto">
					<div className="flex my-auto px-2 gap-2 py-4 sm:py-0" id="checkInCheckOut">
						<Check check={checkIn} setCheck={setCheckIn} label="Check-in" />
						<Check check={checkOut} setCheck={setCheckOut} label="Check-out" />
					</div>
					<div className="w-full sm:w-auto">
						<SearchButton onClick={onSearchButtonClick} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
