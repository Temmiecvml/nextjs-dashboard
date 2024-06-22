'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // this hook is a wrapper over URLSearchParams
  const pathname = usePathname(); // this hook get the main path 
  const { replace } = useRouter();

  // handleSearch updates the url as you type
  // calls are made to the database as the url changes
  // This could lead to multiple calls in a short space of time
  // install use-debounce from pnpm and limit the rate at which the function is called
  const handleSearch = useDebouncedCallback((term: string) => { 
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams); // initialize the URLSearchParams with the current search params

    if (term) {
      params.set('query', term); // set the query parameter
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300) // limit rate to 300 milliseconds
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
