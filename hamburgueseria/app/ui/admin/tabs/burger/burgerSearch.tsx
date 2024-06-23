'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Category } from '@/prisma/generated/client';
import SearchByName from '../../search';
import BurgerSearchCategory from '../../searchByBurgerCategory';

export default function BurgerSearch({ placeholder }: { placeholder: string }) {
    
    return (
        <div className="relative flex flex-1 flex-shrink-0 gap-5">
            <SearchByName placeholder={placeholder} />
            <BurgerSearchCategory placeholder={placeholder} />
        </div>
    );
}