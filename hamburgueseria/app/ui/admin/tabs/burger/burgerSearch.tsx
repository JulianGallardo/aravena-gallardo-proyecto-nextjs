'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Category } from '@/prisma/generated/client';


export default function BurgerSearch({ placeholder }: { placeholder: string }) {
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

    function handleSearchByCategory(category: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="w-full h-10 px-3 py-2 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearchByName(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <select
                className="w-full h-10 px-3 py-2 text-base placeholder-gray-400 border rounded-lg focus:shadow-outline"
                onChange={(e) => {
                    handleSearchByCategory(e.target.value);
                }}
                defaultValue={searchParams.get('category')?.toString()}
            >
                <option value="">ALL</option>
                {
                    
                    Object.values(Category).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}