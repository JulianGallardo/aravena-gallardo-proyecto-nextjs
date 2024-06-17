import PromoComponent from "@/app/ui/burgers/promos/promoInfo";
import ServerCarousel from "@/app/ui/burgers/serverCarousel";
import { CarouselSkeleton } from "@/app/ui/burgers/carrouselRecomendedBurgers";
import { Suspense } from "react";

export default function promoPage() {
    return (
        <div className="w-full overflow-hidden flex flex-col gap-2 px-4">
            <PromoComponent />
            <Suspense fallback={<CarouselSkeleton/>}>
                <ServerCarousel />
            </Suspense>
        </div>
    );
}