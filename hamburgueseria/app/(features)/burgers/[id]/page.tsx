import ServerCarousel from "@/app/ui/burgers/serverCarousel";
import { CarouselSkeleton } from "@/app/ui/burgers/carrouselRecomendedBurgers";
import { Suspense } from "react";
import BurgerInfoPage from "@/app/ui/burgers/burgerInfo";

export default function burgerPage() {
    return (
        <div className="w-full overflow-hidden flex flex-col gap-2 px-4">
            <BurgerInfoPage />
            <Suspense fallback={<CarouselSkeleton/>}>
                <ServerCarousel />
            </Suspense>
        </div>
    );
}