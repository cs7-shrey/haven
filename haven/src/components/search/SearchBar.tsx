// import { useNavigate } from 'react-router';
import SearchDropdown from '../SearchDropdown';
// import { useSearchStore } from '@/store/useSearchStore';
// import { formatDate } from '@/lib/utils';
// import { ArrowRight } from 'lucide-react';
import SearchButton from './ui/SearchButton';
import { Check } from './ui/CheckInOut';
import Voice from '@/components/Voice';
import LanguageButton from './ui/LanguageButton';
import { useSocketStore } from '@/store/useSocketStore';
import { useSearchStore } from '@/store/useSearchStore';
import { useHotelStore } from '@/store/useHotelStore';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';



const SearchBar = () => {
  const {lang, setLang} = useSocketStore()
  const { setInfoMessage } = useHotelStore();
  const { queryTerm,  checkIn, setCheckIn, checkOut, setCheckOut } = useSearchStore();

  const router = useRouter()
  
  const onSearchButtonClick = (e: React.MouseEvent) => {
      e.preventDefault()
      setInfoMessage('')
      if (!queryTerm.place || !queryTerm.type) return;
      router.push(`/hotels?q=${encodeURIComponent(queryTerm.place)}&type=${queryTerm.type}&checkIn=${formatDate(checkIn)}&checkOut=${formatDate(checkOut)}`);
  }

  return (
    <>
      <div className='flex flex-col md:flex-row bg-white rounded-md'>
        {/* voice controls */}
        <div className='flex self-center md:self-start border-l-2 rounded-md md:rounded-none md:border-0'>
          <div className='min-h-full border-r-2'>
            <Voice />
          </div>
          <div className='border-r-2 flex justify-center items-center'>
            <LanguageButton lang={lang} setLang={setLang}/>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row items-end border-t-4 md:border-none'>   {/* height ok */}
          {/* search input and dropdown */}
          <div className="flex flex-col w-full sm:w-auto px-2 justify-center my-auto lg:mt-auto py-3">
            <div className='text-secondary/55 text-xs'>
              Where do you want to stay?
            </div>
            <SearchDropdown />
          </div>
          {/* checkin-checkout-search-button */}
          <div className='flex sm:items-start md:items-end flex-col md:flex-row h-full border-t-2 border-l-0 sm:border-l-4 md:border-l-2 md:border-t-0'>
            <div className='flex gap-2 sm:flex-row h-full pl-1' id='checkInCheckOut'>
              <Check check={checkIn} setCheck={setCheckIn} label="Check-in" />
              <Check check={checkOut} setCheck={setCheckOut} label="Check-out" />
            </div>
            <div className='w-full h-full md:rounded-r-md'>
              <SearchButton onClick={onSearchButtonClick}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
