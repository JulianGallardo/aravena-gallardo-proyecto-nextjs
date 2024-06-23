'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Category } from '@/prisma/generated/client';


export default function SearchByName({ placeholder }: { placeholder: string }) {
    function handleSearchByName(term: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    return (
        <div className="relative flex flex-1 flex-shrink-0 gap-5">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="w-full h-10 px-3 py-2 text-base text-black placeholder-gray-400 border-2 border-gray-500  rounded-lg focus:shadow-outline bg-gray-200 "
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearchByName(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
}